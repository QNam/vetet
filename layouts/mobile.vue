<template>
  <div>
    <navbar />
    <Nuxt />
    <Footer />
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

<style>

</style>