import path from 'path';
import fs from 'fs-extra';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import replace from 'rollup-plugin-replace';

const tsConfig = require(path.resolve(process.cwd(), 'tsconfig.json'));
const { outDir } = tsConfig.compilerOptions;

fs.ensureDirSync(outDir);

function generateDefaultConfig(pkg, external, minify) {
  let mainFile = pkg.main;
  if (minify) {
    mainFile = mainFile.replace('.js', '.min.js');
  }

  let styleFile = null;

  if (pkg.style) {
    styleFile = path.join(outDir, pkg.style);

    if (minify) {
      styleFile = styleFile.replace('.css', '.min.css');
    }
  }

  const outDirParts = outDir.split('/');
  outDirParts[outDirParts.length - 2] = '.rpt2_cache';
  const cacheRoot = outDirParts.join('/');

  const output = [
    {
      name: pkg.name,
      file: path.join(outDir, mainFile),
      format: 'umd',
      sourcemap: true,
      globals: { preact: 'preact' },
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
    input: 'index.ts',
    output: output,
    external,
    plugins: [
      replace({
        'process.env.ENABLE_LOGGING': false,
      }),
      postcss({
        extract: styleFile,
        minimize: minify,
      }),
      typescript({
        typescript: require('typescript'),
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
        },
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

function generateMainConfig(pkg, external, minify) {
  const config = generateDefaultConfig(pkg, external, minify);

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

export function generateConfig(external) {
  const pkg = require('./package.json');

  return [
    generateMainConfig(pkg, external),
    generateMainConfig(pkg, external, true),
  ];
}
