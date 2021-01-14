<template>
  <div>
    <div id="fb-root"></div>  
    <navbar />
    <Nuxt />
    <Footer v-if="$route.name != 'dat-ve-slug'" />
  </div>  
</template>

<script>
import Navbar from '../components/mobile/MNavbar'
import Footer from '../components/mobile/MFooter'

export default {
  components: {
    "navbar": Navbar,
    Footer,
  },
}
</script>

<style scoped>
#fb-root {
  display: none;
}
</style>
