// https://nuxt.com/docs/guide/directory-structure/app-config
// See index.d.ts for the full list of available options
export default defineAppConfig({
    titlePrefix: "FiveM Elite Store",
    storeName: "FiveM Elite Store",
    // Require the user to login before they add items?
    auth: true,
    // Use external auth methods, e.g. CFX, Steam (Set to false for minecraft stores)
    authExternal: true,
    // The unique ID of the store
    storeId: 12345,
    // A link to your main site (optional)
    mainSiteUrl: "https://fivem-elite.com",
    // A discord invite url (optional)
    discordUrl: "https://discord.gg/fivem-elite",
    // A IP of your server which to display (optional)
    serverIp: "connect fivem-elite.com",
    // Reveal the sidebar when an item is added to the cart?
    showCartOnAdd: true,
    // Show confetti after checkout?
    confetti: true,
    // Game type name to display on the store
    gameTypeName: "FiveM",
    // Tebex.js settings see https://docs.tebex.io/developers/tebex.js/integration#config
    tebexJsConfig: {
        theme: "dark",
        colors: [
            {
                name: "primary",
                color: "#6366f1",
            },
            {
                name: "secondary",
                color: "#10b981",
            },
        ],
    },
});
