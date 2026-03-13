// next.config.js
import type { NextConfig } from "next";

const nextConfig = {
  output: 'export', // Esto genera el build estático en la carpeta /out
  images: {
    unoptimized: true, // Requerido para output estático si usas <Image> de Next.js
  },
};

export default nextConfig;
