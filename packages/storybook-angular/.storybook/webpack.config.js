module.exports = ({ config }) => {
  const htmlLoader = config.module.rules.find(
    (x) => String(x.test) === String(/\.html$/),
  );

  htmlLoader.loader = require.resolve('html-loader');

  return config;
};
