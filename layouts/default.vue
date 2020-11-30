<template>
  <div>
    <navbar />
    <Nuxt />
    <Footer />
  </div>  
</template>

<script>
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default {
  components: {
    "navbar": Navbar,
    Footer,
  },
}
</script>

<style>

</style>