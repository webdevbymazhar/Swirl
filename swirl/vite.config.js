import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all IPs
    port: 5173, // Default port, can be changed
    open: true, // Opens the browser automatically
    // https: true, // Uncomment if you need HTTPS
  },
})
