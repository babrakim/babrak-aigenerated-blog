const path = require('path');
const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^mysql2$/ }));
    }
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  
  images: {
    unoptimized: true, // Disable image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        port: '',
        pathname: '/private/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
};
