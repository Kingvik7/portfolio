/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
}

module.exports = {
    nextConfig,
    experimental: {
        urlImports: [
            "https://framer.com/m/",
            "https://framerusercontent.com/",
            "https://ga.jspm.io/",
            "https://jspm.dev/",
        ],
    },
}
