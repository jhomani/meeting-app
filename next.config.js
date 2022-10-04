// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /.(png|jpg|gif|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });
    return config;
  },
};
