import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/loginformsBackend/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                blog: resolve(__dirname, 'blog/blog.html')
            }
        }
    }
});
