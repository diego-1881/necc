import { resolve } from "path";

export default {
  root: resolve(__dirname, "src"),
  build: {
    outDir: "../../wp/wp-content/themes/necc/",
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").pop();
          if (/png|jpe?g|webp|gif|svg/.test(extType)) {
            extType = "img";
          } else if (/css/.test(extType)) {
            extType = "css";
          } else if (/js/.test(extType)) {
            extType = "js";
          } else if (/mp4/.test(extType)) {
            extType = "video";
          } else if (/woff2/.test(extType)) {
            extType = "fonts";
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: "assets/js/[name].js",
        entryFileNames: "assets/js/[name].js",
      },
    },
  },
  server: {
    port: 8090,
    hot: true,
  },
};
