/* eslint-disable global-require */
import path from 'path';
import fs from 'fs-extra';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import replace from 'rollup-plugin-replace';

// eslint-disable-next-line import/no-dynamic-require
const tsConfig = require(path.resolve(process.cwd(), 'tsconfig.json'));
const { outDir } = tsConfig.compilerOptions;

fs.ensureDirSync(outDir);

function generateDefaultConfig(
  globalName,
  pkg,
  input,
  external,
  globals,
  minify,
) {
  let mainFile = pkg.main;
  if (minify) {
    mainFile = mainFile.replace('.js', '.min.js');
  }

  const cacheRoot = path.join(outDir, '..', '.rpt2_cache');

  const output = [
    {
      name: globalName,
      file: path.join(outDir, mainFile),
      format: 'umd',
      sourcemap: true,
      globals,
    },
  ];

  if (!minify) {
    output.push({
      file: path.join(outDir, pkg.module),
      format: 'es',
      sourcemap: true,
    });
  }

  const config = {
    input,
    output,
    external,
    plugins: [
      replace({
        'process.env.ENABLE_LOGGING': false,
      }),
      typescript({
        typescript: require('typescript'),
        cacheRoot,
      }),
      commonjs(),
      resolve(),
      sourceMaps(),
    ],
  };

  config.plugins.push(filesize());

  if (minify) {
    config.plugins.push(terser());
  }

  return config;
}

function generateMainConfig(globalName, pkg, input, external, globals, minify) {
  const config = generateDefaultConfig(
    globalName,
    pkg,
    input,
    external,
    globals,
    minify,
  );

  const newPkg = {
    ...pkg,
  };

  delete newPkg.scripts;

  if (!minify) {
    const readmeFile = 'README.md';
    if (fs.pathExistsSync(readmeFile)) {
      fs.copySync(readmeFile, path.join(outDir, readmeFile));
    }

    config.plugins.push(
      generatePackageJson({
        baseContents: newPkg,
        outputFolder: outDir,
      }),
    );
  }

  return config;
}

export function generateConfig(globalName, input, external, globals = {}) {
  const pkg = require('./package.json');

  return [
    generateMainConfig(globalName, pkg, input, external, globals),
    generateMainConfig(globalName, pkg, input, external, globals, true),
  ];
}
