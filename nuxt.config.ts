export default defineNuxtConfig({
    experimental: {
        configSchema: true,
    },
    devtools: { enabled: true },
    modules: [
        "@nuxtjs/google-fonts",
        "nuxt-svgo",
        "@vueuse/nuxt",
        "@pinia/nuxt",
        "@nuxtjs/i18n",
        "@nuxt/image",
    ],
    googleFonts: {
        families: {
            Lato: true,
        },
    },
    // Runtime config is overridden by .env variables
    runtimeConfig: {
        // NOTE: This should never be moved to public or app config as it is private
        apiPrivateKey: "KWNP6u2mRKeM1x38OdeeYceHd1SkHiTB",

        // Config that will be exposed to the client
        public: {
            apiPublicKey: "KWNP6u2mRKeM1x38OdeeYceHd1SkHiTB",
            apiBaseUrl: "https://headless.tebex.io",
        },
    },
    imports: {
        dirs: ["services"],
    },
    nitro: {
        // You may wish to use different cache settings for development and production
        // storage: {
        //     cache: cacheProduction,
        // },
        // devStorage: {
        //     cache: cacheDevelopment,
        // },
        esbuild: {
            options: {
                target: "esnext",
            },
        },
    },
    app: {
        head: {
            script: [{ src: "https://js.tebex.io/v/1.0.0.js", async: true }],
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/styles/theme.scss" as *;',
                },
            },
        },
    },
});
