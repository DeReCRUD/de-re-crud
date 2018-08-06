import path from 'path';
import del from 'del';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import css from 'rollup-plugin-css-only';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const pkg = require('./package.json');

del.sync(path.dirname(pkg.main));

const newPkg = {
  ...pkg,
  style: path.basename(pkg.style),
  main: path.basename(pkg.main),
  module: path.basename(pkg.module),
  typings: path.basename(pkg.typings)
};

delete newPkg.scripts;

export default {
  input: './public-api.ts',
  output: [
    {
      name: pkg.name,
      file: pkg.main,
      format: 'umd',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  external: id => /(\@de-re-crud\/forms|bootstrap|preact)/.test(id),
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    css({ output: pkg.main.replace('js', 'css') }),
    commonjs(),
    resolve(),
    sourceMaps(),
    generatePackageJson({
      baseContents: newPkg
    })
  ]
};
