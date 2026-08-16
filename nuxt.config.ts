import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "GarageOs — Moins de paperasse",
      meta: [{ name: "theme-color", content: "#09090b" }],
      script: [
        {
          innerHTML: `(function(){try{var t=localStorage.getItem("garage-theme");var dark=t==="dark"||t==="light"?t==="dark":true;var r=document.documentElement;r.classList.toggle("dark",dark);r.style.colorScheme=dark?"dark":"light"}catch(e){}})();`,
        },
      ],
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  routeRules: {
    "/": { redirect: "/login" },
  },

  runtimeConfig: {
    public: {
      backendBase: import.meta.env.BACKEND_API_BASE ?? "",
      apiBase: (import.meta.env.BACKEND_API_BASE ?? "") + "/api",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
  },

  modules: ["@nuxt/eslint"],
  alias: {
    utils: "./app/utils",
    types: "./app/types",
  },
});
