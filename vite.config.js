import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// แก้ตรงนี้ก่อน build
const formName = 'FAMB0002V2';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-meta-json',
      closeBundle() {
        const srcPath = path.resolve(__dirname, `src/checksheet/${formName}/meta.json`);
        const destPath = path.resolve(__dirname, `../server-checksheet/checksheet_form/${formName}/meta.json`);

        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`\n\x1b[32m✓ meta.json copied to ${formName}\x1b[0m`);
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
  },
})
