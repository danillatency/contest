import { defineConfig } from "vite"

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: "./index.html",
                applier: "./3dapplier.html",
                gallery: "./gallery.html",
                artwork: "./artwork.html",
                faq: "./faq.html",
                four: "./404.html"
            }
        }
    },
    base: process.env.NODE_ENV === "production" ? "/contest/" : ""
})
