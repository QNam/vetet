export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Vé xe Tết được mở bán để phục vụ bà con đón tết AN VUI!',
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'Định kỳ hàng năm Hệ thống bán vé xe tết sẽ được mở để phục vụ đồng bào xa quê, khách du lịch có thể lựa chọn được vé xe bình ổn giá. Đúng chỗ ngồi an toàn và tiện lợi để bà con về quê đón tết. Công ty AN VUI phối hợp cùng với hơn 100 hãng xe trong cả nước mở bán phục vụ bà con' },
        { name: 'keyword', content: 'Vé tết,Vé xe tết,Vé xe khách,Đặt vé tết,Đặt vé xe tết'},
        { name: 'og:image', content: 'https://vetet.vn/_nuxt/img/banner.7477906.jpg' },
        { name: 'og:title', content: 'Vé xe Tết được mở bán để phục vụ bà con đón tết AN VUI!' },
        { name: 'og:description', content: 'Định kỳ hàng năm Hệ thống bán vé xe tết sẽ được mở để phục vụ đồng bào xa quê, khách du lịch có thể lựa chọn được vé xe bình ổn giá. Đúng chỗ ngồi an toàn và tiện lợi để bà con về quê đón tết. Công ty AN VUI phối hợp cùng với hơn 100 hãng xe trong cả nước mở bán phục vụ bà con' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" }
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
    { src: '@/plugins/v-calendar.js', mode: 'client' },
    { src: '@/plugins/vue-fb-customer-chat', ssr: false },
    '@/plugins/anvui.js',
    // '@/plugins/firebase.js',
    '@/plugins/filters.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  purgeCSS: {
    whitelistPatterns: [/^ct/]
},
  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxt/http',
    // '@nuxtjs/firebase',
    [
      '@nuxtjs/device',
      { defaultUserAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Mobile Safari/537.36' }
    ]
  ],

  // firebase: {
  //   config: {
  //     apiKey: "AIzaSyBWI3rqm3ZqMQHBxFJxG_ma7Vm8h3CFeP4",
  //     authDomain: "anvui-firestore.firebaseapp.com",
  //     databaseURL: "https://anvui-firestore.firebaseio.com",
  //     projectId: "anvui-firestore",
  //     storageBucket: "anvui-firestore.appspot.com",
  //     messagingSenderId: "978123247240",
  //     appId: "1:978123247240:web:957b7e55b784e9d1d6593d"
  //   },
  //   services: {
  //     auth: true,
  //     firestore: true,
  //   }
  // },

  // http: {
  //   proxyHeaders: false
  // },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
}
