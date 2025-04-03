import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist" // Ensure the build output is in "dist"
  },
  server: {
    port: 3000
  }
});
