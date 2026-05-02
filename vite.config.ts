import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    base: "/",

    plugins: [
      react(),
      isDev && componentTagger()
    ].filter(Boolean),

    publicDir: "public",

    build: {
      outDir: "dist",
      copyPublicDir: true,

      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html")
        },
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            ui: ["lucide-react"]
          },
          entryFileNames: "assets/[name].[hash].js",
          chunkFileNames: "assets/[name].[hash].js",
          assetFileNames: "assets/[name].[hash].[ext]"
        }
      },

      minify: isDev ? false : "terser",
      sourcemap: isDev,
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core"
      ]
    },

    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false
      },
      headers: !isDev
        ? {
            "Cache-Control": "public, max-age=31536000, immutable"
          }
        : {}
    }
  };
});
