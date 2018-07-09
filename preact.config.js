import { resolve } from 'path';
import preactCliTypeScript from 'preact-cli-plugin-typescript';

export default function(config) {
  preactCliTypeScript(config);

  config.resolve.alias['preact-cli-entrypoint'] = resolve(
    __dirname,
    'packages',
    'schema-builder',
    'index'
  );
}
