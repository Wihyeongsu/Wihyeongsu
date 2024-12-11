import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import svgr from "vite-plugin-svgr"; // SVG를 React 컴포넌트로 불러오기 위한 플러그인

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(), // SVG 플러그인 추가
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  // 빌드 설정 추가
  build: {
    // 에셋 처리를 위한 설정
    assetsDir: "assets",
    rollupOptions: {
      output: {
        // 에셋 파일의 출력 경로와 이름 설정
        assetFileNames: (assetInfo) => {
          // SVG 파일의 경우 별도 처리
          if (assetInfo.name?.endsWith(".svg")) {
            return "assets/icons/[name][extname]";
          }
          // 다른 에셋들의 경우 기본 처리
          return "assets/[name]-[hash][extname]";
        },
        // 청크 파일 이름 설정
        chunkFileNames: "js/[name]-[hash].js",
        // 메인 엔트리 파일 이름 설정
        entryFileNames: "js/[name]-[hash].js",
      },
    },
  },

  // Tauri 개발 설정
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      ignored: ["**/src-tauri/**"],
      usePolling: true,
    },
  },

  // 정적 파일 제공을 위한 설정
  publicDir: "public",
}));
