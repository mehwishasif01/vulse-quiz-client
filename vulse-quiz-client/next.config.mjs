/** @type {import('next').NextConfig} */

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
