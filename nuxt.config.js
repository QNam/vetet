export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'vetet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      // { rel: "stylesheet", href: "/css/bootstrap.css" }
    ]
  },

  loading: {
    color: '#FF4868',
    height: '3px'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~assets/css/tailwind.css', 
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui.js',
    { src: '@/plugins/vue-carousel.js', mode: 'client' },
    { src: '@/plugins/vue-burger-menu', ssr: false },
    '@/plugins/anvui.js',
    '@/plugins/filters.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxt/http',
    [
      '@nuxtjs/device',
      { defaultUserAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Mobile Safari/537.36' }
    ]
  ],

  // http: {
  //   proxyHeaders: false
  // },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
}
