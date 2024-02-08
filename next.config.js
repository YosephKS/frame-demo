// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    // Only add the node-loader configuration on the server-side build
    if (isServer) {
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',
      });
    }
    return config;
  },
};
