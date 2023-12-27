/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'scontent.cdninstagram.com',
                port: '',
                pathname: '/**',
            },
        ],
    },

}

module.exports = nextConfig
