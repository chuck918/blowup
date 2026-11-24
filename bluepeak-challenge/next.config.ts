import type { NextConfig } from "next";

// Allow next/image to load event covers from your Supabase Storage bucket.
const supabaseHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").hostname;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
  experimental: {
    // Event cover uploads go through a server action (5 MB max + form overhead).
    serverActions: { bodySizeLimit: "6mb" },
  },
  async redirects() {
    // The old Paystack payment link returned buyers here.
    return [
      { source: "/thank-you", destination: "/dashboard", permanent: false },
      // The programme is a masterclass: /apply became /register.
      { source: "/apply", destination: "/register", permanent: true },
      { source: "/admin/applications", destination: "/admin/registrations", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
