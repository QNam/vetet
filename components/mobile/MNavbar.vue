<template>
    <div class="navbar">
      <client-only>
        <SlideMenu :closeOnNavigation="true" noOverlay>
            <NuxtLink to="/" class="block">Trang chủ</NuxtLink>
            <!-- <NuxtLink to="/tin-tuc" class="block">Tin tức</NuxtLink> -->
        </SlideMenu>
        <!-- <span v-html="icons.text_justify" @click="openSideBar = !openSideBar" class="cursor-pointer"></span> -->
        <NuxtLink to="/" class="block"><img src="~/assets/imgs/logo.svg" alt=""></NuxtLink>
        <span v-html="icons.user_r"></span>
        </client-only>
    </div>
</template>

<script>
import icons from '../icon'
// import { Slide } from 'vue-burger-menu' 

export default {
  components: {
      // Slide
  },
  data () {
    return {
      icons,
      // openSideBar: false
    }
  }
}
</script>

<style>


</style>
<style scoped>
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 16px;
}
</style>