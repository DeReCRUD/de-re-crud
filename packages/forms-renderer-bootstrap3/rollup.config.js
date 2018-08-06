import path from "path";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import generatePackageJson from "rollup-plugin-generate-package-json";

const pkg = require("./package.json");
const env = process.env.npm_lifecycle_event;
const isProd = env.endsWith("prod");

let styleBundlePath = path.resolve(process.cwd(), pkg.style);
if (isProd) {
  styleBundlePath = styleBundlePath.replace(".css", ".min.css");
}

const newPkg = {
  ...pkg,
  style: path.basename(pkg.style),
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
  external: (id) => /(\@de-re-crud\/forms\/|bootstrap\/|preact)/.test(id),
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      extract: styleBundlePath,
      minimize: isProd
    }),
    commonjs(),
    resolve(),
    sourceMaps(),
    generatePackageJson({
      baseContents: newPkg
    })
  ]
};
