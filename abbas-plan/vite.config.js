import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // <-- This line imports the React plugin

export default defineConfig({
  plugins: [react()], // <-- This line tells Vite to use the React plugin
  build: {
    outDir: 'dist',
  }
})
