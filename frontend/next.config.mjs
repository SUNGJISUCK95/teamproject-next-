/** @type {import('next').NextConfig} */
const nextConfig = {
  output : "standalone",
  /* config options here */
  reactCompiler: true,
    // async rewrites() {
    //   return[
    //       {
    //           source: '/:path*',
    //           destination: 'http://localhost:9000/:path*',
    //       },
    //   ];
    // },
};

export default nextConfig;
