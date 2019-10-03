const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.plugins = [
    new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '..', 'tsconfig.json'),
    }),
  ];
  return config;
};
