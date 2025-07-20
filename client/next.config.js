/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'res.cloudinary.com',
            'images.unsplash.com',
            'encrypted-tbn0.gstatic.com',
'images.travelandleisureasia.com'
        ]
    }
}

module.exports = nextConfig
