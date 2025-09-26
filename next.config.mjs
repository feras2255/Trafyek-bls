/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vssbbduscdjqisjnrwhb.supabase.co", // ← غيّرها لمشروعك
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
