import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const GA_MEASUREMENT_ID = 'G-XWNSXDGLBC';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const analyticsEnabled = env.VITE_ENABLE_ANALYTICS === 'true';

  return {
    plugins: [
      react(),
      {
        name: 'inject-google-analytics',
        transformIndexHtml(html) {
          if (!analyticsEnabled) return html;

          const snippet = `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });
    </script>
`;

          return html.replace('<head>', `<head>${snippet}`);
        },
      },
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
  };
});
