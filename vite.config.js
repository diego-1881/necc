import { resolve } from "path";
import { defineConfig } from "vite";
import purgecss from "vite-plugin-purgecss";

export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    outDir: "../../wp/wp-content/themes/necc/",
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").pop();
          if (/css/.test(extType)) {
            extType = "css";
          } else if (/js/.test(extType)) {
            extType = "js";
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: "assets/js/[name].js",
        entryFileNames: "assets/js/[name].js",
      },
      plugins: [
        {
          name: "exclude-assets",
          generateBundle(options, bundle) {
            for (const fileName in bundle) {
              if (/\.(mp4|png|jpe?g|webp|gif|svg|woff2|html)$/.test(fileName)) {
                delete bundle[fileName];
              }
            }
          },
        },
      ],
    },
  },
  plugins: [
    purgecss({
      content: [
        "./src/**/*.html",
        "./src/**/*.js",
        "./src/**/*.scss",
      ],
    }),
  ],
  server: {
    port: 8090,
    hot: true,
  },
});
