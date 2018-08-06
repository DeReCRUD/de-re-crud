import path from "path";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import generatePackageJson from "rollup-plugin-generate-package-json";

const pkg = require("./package.json");

const newPkg = {
  ...pkg,
  main: path.basename(pkg.main),
  module: path.basename(pkg.module),
  typings: path.basename(pkg.typings)
};

delete newPkg.scripts;

export default {
  input: "./public-api.ts",
  output: [
    {
      name: pkg.name,
      file: pkg.main,
      format: "umd",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true
    }
  ],
  external: [],
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve(),
    sourceMaps(),
    generatePackageJson({
      baseContents: newPkg
    })
  ]
};
