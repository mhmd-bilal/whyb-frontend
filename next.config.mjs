/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // appDir: true,
  },
  webpack(config, { isServer }) {
    // Ignore test files during the build
    if (!isServer) {
      config.module.rules.push({
        test: /\.(test|spec)\.(js|jsx|ts|tsx)$/,
        use: ['ignore-loader'],
      });
    }

    // Disable Jest workers
    config.resolve.alias['jest-worker'] = false;

    return config;
  },
};

export default nextConfig;
