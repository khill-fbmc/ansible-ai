const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@monaco-editor/react", "@ansible/ansible-language-server"],
};

module.exports = withBundleAnalyzer(nextConfig);
