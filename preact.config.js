import webpack from 'webpack';
import { resolve } from 'path';
import preactCliTypeScript from 'preact-cli-plugin-typescript';

export default function(config) {
  preactCliTypeScript(config);

  config.plugins.push(new webpack.DefinePlugin({
    'process.env.ENABLE_LOGGING': process.env.ENABLE_LOGGING || false
  }));

  config.resolve.alias['preact-cli-entrypoint'] = resolve(
    __dirname,
    'packages',
    'schema-builder',
    'index'
  );
}
