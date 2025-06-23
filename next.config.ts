/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "acdn-us.mitiendanube.com",
        port: "",
        pathname: "/stores/**", // puedes usar comodines para ajustar la ruta
      },
      {
        protocol: "https",
        hostname: "complot.com.ar",
        port: "",
        pathname: "/media/**",
      },
      // Agrega más dominios externos que uses aquí
    ],
  },
};

module.exports = nextConfig;
