import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  build: {
    outDir: 'assets/experience',
    emptyOutDir: true,
    target: 'es2022',
    lib: {
      entry: fileURLToPath(new URL('./main.ts', import.meta.url)),
      formats: ['es'],
      fileName: () => 'experience.js',
      cssFileName: 'style'
    }
  }
});
