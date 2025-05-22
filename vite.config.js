import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   server:{
    proxy:{
        "/api":"https://full-stack-blog-webapp-backend.onrender.com"
      // "/api":"http://localhost:8000",//now wherever axios.get() start from /api it is replaced by http://localhost:8000/api means in backend this url is passed so no need to whitelist as proxy is done because port:3000 is for backend so no CORS error.
    }
  },
  plugins: [react()],
})
