import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const embedTargets: Record<string, string> = {
  "/embed/air-jordan": "https://air-jordan-orpin.vercel.app",
  "/embed/bmw": "https://bmw-nu-flame.vercel.app",
  "/embed/ml-sharp": "https://ml-sharp-chi.vercel.app",
  "/embed/components": "https://components-alpha-nine.vercel.app",
  "/embed/path-tracer": "https://path-tracer-psi.vercel.app",
};

const embedProxy = Object.fromEntries(
  Object.entries(embedTargets).map(([prefix, target]) => [
    prefix,
    {
      target,
      changeOrigin: true,
      secure: true,
      rewrite: (p: string) =>
        p.replace(new RegExp(`^${prefix}`), "") || "/",
    },
  ]),
);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@data": path.resolve(__dirname, "src/data"),
      "@styles": path.resolve(__dirname, "src/globasStyles"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@state": path.resolve(__dirname, "src/state"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  server: {
    proxy: embedProxy,
  },
  preview: {
    proxy: embedProxy,
  },
});
