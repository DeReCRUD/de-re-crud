import { resolve } from 'path';
import webpack from 'webpack';
import preactCliTypeScript from 'preact-cli-plugin-typescript';

export default function(config) {
  // NOTE: Hack to add Webpack 4 support to plugin
  config.module.loaders = config.module.rules;
  preactCliTypeScript(config);
  delete config.module.loaders;

  const rootModulesDir = resolve(process.cwd(), '..', '..', 'node_modules');
  config.resolveLoader.modules.unshift(rootModulesDir);

  const jsonLoaderIndex  = config.module.rules.findIndex(x => x.loader === 'json-loader');
  config.module.rules.splice(jsonLoaderIndex, 1);

  config.plugins.push(new webpack.DefinePlugin({
    'process.env.ENABLE_LOGGING': process.env.ENABLE_LOGGING || false
  }));

  config.resolve.alias['preact-cli-entrypoint'] = resolve(process.cwd(), 'index');
}
