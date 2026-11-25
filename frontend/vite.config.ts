import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({plugins:[react(),tailwindcss(),VitePWA({registerType:'prompt',includeAssets:['icon.svg'],manifest:{name:'MessLedger',short_name:'MessLedger',description:'Mess accounting for shared homes',theme_color:'#4338ca',background_color:'#f7f8fc',display:'standalone',start_url:'/',scope:'/',icons:[{src:'/icon.svg',sizes:'any',type:'image/svg+xml',purpose:'any maskable'}]},workbox:{navigateFallback:'/',runtimeCaching:[]}})],server:{proxy:{'/api':'http://localhost:4000'}}});
