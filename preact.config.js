const { resolve } = require('path')
const webpack = require('webpack');
const preactCliTypeScript = require("preact-cli-plugin-typescript");

module.exports = function(config) {
  // NOTE: Hack to add Webpack 4 support to plugin
  config.module.loaders = config.module.rules;
  preactCliTypeScript(config);
  delete config.module.loaders;

  const jsonLoaderIndex = config.module.rules.findIndex(
    (x) => x.loader === "json-loader"
  );
  
  config.module.rules.splice(jsonLoaderIndex, 1);

  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env.ENABLE_LOGGING": process.env.ENABLE_LOGGING || false
    })
  );

  config.resolve.alias["preact-cli-entrypoint"] = resolve(
    __dirname,
    "packages",
    "schema-builder",
    "index"
  );
}
