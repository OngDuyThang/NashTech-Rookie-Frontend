/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'asana-clone-bucket.s3.ap-southeast-1.amazonaws.com',
            port: '',
            pathname: '/**',
          },
        ],
        unoptimized: true
      },
}

const redirects = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ];
    },
};

module.exports = withPlugins([[redirects]], nextConfig)
