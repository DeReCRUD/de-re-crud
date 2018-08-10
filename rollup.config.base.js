import path from "path";
import fs from "fs-extra";
import glob from "glob";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import generatePackageJson from "rollup-plugin-generate-package-json";
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";
import replace from "rollup-plugin-replace";

const outDir = "./dist";

fs.ensureDirSync(outDir);

function getDefaults(input, output, external) {
  return {
    input,
    output: [
      {
        file: output,
        format: "es",
        sourcemap: true
      }
    ],
    external,
    plugins: [
      replace({
        "process.env.ENABLE_LOGGING": false
      }),
      typescript({
        useTsconfigDeclarationDir: true,
        typescript: require("typescript")
      }),
      commonjs(),
      resolve(),
      sourceMaps()
    ]
  };
}

function getMainBundle(pkg, external, isProd) {
  let styleBundlePath = null;

  if (pkg.style) {
    styleBundlePath = path.resolve(process.cwd(), pkg.style);

    if (isProd) {
      styleBundlePath = styleBundlePath.replace(".css", ".min.css");
    }
  }

  const readmeFile = "README.md"; 
  if (isProd && fs.pathExistsSync(readmeFile)) {
    fs.copySync(readmeFile, path.join(outDir, readmeFile));
  }

  const config = getDefaults("index.ts", pkg.module, external);

  config.output.push({
    name: pkg.name,
    file: pkg.main,
    format: "umd",
    globals: { preact: "preact" },
    sourcemap: true
  });

  if (styleBundlePath) {
    config.plugins.splice(
      1,
      0,
      postcss({
        extract: styleBundlePath,
        minimize: isProd
      })
    );
  }

  const newPkg = {
    ...pkg,
    main: path.basename(pkg.main),
    module: path.basename(pkg.module),
    types: path.basename(pkg.types)
  };

  if (newPkg.style) {
    newPkg.style = path.basename(pkg.style);
  }

  delete newPkg.scripts;

  config.plugins.push(generatePackageJson({ baseContents: newPkg }));

  return config;
}

function getAdditionalBundles(_, external) {
  const files = glob.sync(path.join(process.cwd(), "*/**/public-api.ts"));

  return files.map((file) => {
    const dir = path.relative(process.cwd(), path.dirname(file));
    const input = path.join(dir, "index.ts");
    const output = path.join(outDir, input.replace(".ts", ".js"));

    return getDefaults(input, output, external);
  });
}

export function generateConfig(external) {
  const pkg = require("./package.json");

  const env = process.env.npm_lifecycle_event;
  const isProd = env.endsWith("prod");

  const configs = [
    getMainBundle(pkg, external, isProd),
    ...getAdditionalBundles(pkg, external, isProd)
  ];

  return configs.map((config) => {
    if (isProd) {
      config.output.forEach((x) => {
        x.file = x.file.replace(".js", ".min.js");
      });

      config.plugins.push(filesize());
      config.plugins.push(terser());
    }

    return config;
  });
}
