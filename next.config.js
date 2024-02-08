module.exports = {
  webpack(config, context) {
    config.module.rules.push({
      test: /\.ttf$/,
      use: 'raw-loader',
    });
    return config;
  },
};
