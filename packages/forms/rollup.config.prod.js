import config from "./rollup.config";
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";

config.output.forEach((x) => {
  x.file = x.file.replace(".js", ".min.js");
});

config.plugins.push(filesize());
config.plugins.push(terser());

export default config;
