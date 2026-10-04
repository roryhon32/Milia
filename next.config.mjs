/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['sql.js'],
  outputFileTracingIncludes: { '/api/**/*': ['./migrations/*.sql', './node_modules/sql.js/dist/sql-wasm.wasm', './config/*.json'] },
  async headers() { return [{ source: '/:path*', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'X-Frame-Options', value: 'DENY' }, { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }] }]; },
  turbopack: { root: process.cwd() },
  async rewrites() {
    return [
      { source: "/portfolio/lumiere", destination: "/portfolio/lumiere/index.html" },
      { source: "/portfolio/lumiere/projetos", destination: "/portfolio/lumiere/projetos/index.html" },
      { source: "/portfolio/lumiere/projetos/:slug", destination: "/portfolio/lumiere/projetos/:slug/index.html" },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
