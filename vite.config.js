import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import fs from 'fs'

// แก้ตรงนี้ก่อน build หรือรับจาก env
// const formName = process.env.FORM_NAME || 'Test';
const formName = process.env.FORM_NAME || 'FAWI0008_V3';

// ปิด PWA ตอน dev mode เพื่อป้องกัน caching issues
const isDev = process.env.NODE_ENV !== 'production';

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_FORM_NAME': JSON.stringify(formName),
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [
    react(),
    tailwindcss(),
    // เปิด PWA เฉพาะตอน production build เท่านั้น
    ...(!isDev ? [VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'E-Checksheet',
        short_name: 'Checksheet',
        description: 'Electronic Checksheet Application',
        theme_color: '#ffffff',
        display: 'standalone',
        scope: './',
        start_url: './',
        icons: [
          {
            src: 'logo-app.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // Include index.html in precaching to prevent Workbox crash on navigation
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,json}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // Use NetworkFirst strategy for the main page (navigation)
            // This ensures we hit the server's auth check when online
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              networkTimeoutSeconds: 3,
            }
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-data-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60 // 24 hours
              }
            }
          }
        ]
      }
    })] : []),
    {
      name: 'copy-meta-json',
      closeBundle() {
        const srcPath = path.resolve(__dirname, `src/checksheet/${formName}/meta.json`);
        // Ensure parent directory exists
        const destDir = path.resolve(__dirname, `../server-checksheet/checksheet_form/${formName}`);
        const destPath = path.join(destDir, 'meta.json');

        if (fs.existsSync(srcPath)) {
          // fs.mkdirSync(destDir, { recursive: true }); // Vite build likely creates this, but good safety
          try {
            fs.copyFileSync(srcPath, destPath);
            console.log(`\n\x1b[32m✓ meta.json copied to ${formName}\x1b[0m`);
          } catch (e) {
            console.error(`Failed to copy meta.json: ${e.message}`);
          }
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Base path for production deployment (managed by Node.js server)
  // ถ้าคุณทำฟอร์มใหม่ชื่อ FAMB003V1:
  // แก้ใน 
  // vite.config.js
  //  เป็น base: '/form/FAMB003V1/'
  // สั่ง npm run build
  // เอาโฟลเดอร์ที่ได้ไปวางใน Server ที่ checksheet_form/FAMB003V1
  // ต้องให้ ชื่อใน config กับ ชื่อโฟลเดอร์บน Server ตรงกันครับ
  base: `/form/${formName}`,
  build: {
    outDir: `../server-checksheet/checksheet_form/${formName}`,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600, // เพิ่ม limit เพื่อลด warning
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'vendor-mui';
            }
            return 'vendor'; // lib อื่นๆ รวมกัน
          }
        },
      },
    },
  },
})
