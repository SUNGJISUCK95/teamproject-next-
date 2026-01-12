/** @type {import('next').NextConfig} */
const nextConfig = {
  output : "standalone",
  /* config options here */
  reactCompiler: true,
    output: "standalone"
    // async rewrites() {
    //   return[
    //       {
    //           source: '/:path*',
    //           destination: 'http://3.35.3.78:9000/:path*',
    //       },
    //   ];
    // },
};

export default nextConfig;
