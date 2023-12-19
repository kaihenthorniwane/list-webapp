/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/", // Assuming the page URL is '/page', not '/page.js'
        destination: "/folders", // Where you want to redirect
        permanent: true, // Set to `false` for a temporary redirect
      },
    ];
  },
};

module.exports = nextConfig;
