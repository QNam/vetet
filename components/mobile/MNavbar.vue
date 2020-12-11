<template>
    <div class="navbar">
        <SlideMenu :closeOnNavigation="true" noOverlay>
            <NuxtLink to="/" class="block">Trang chủ</NuxtLink>
            <NuxtLink to="/" class="block">Tin tức</NuxtLink>
        </SlideMenu>
        <!-- <span v-html="icons.text_justify" @click="openSideBar = !openSideBar" class="cursor-pointer"></span> -->
        <NuxtLink to="/" class="block"><img src="~/assets/imgs/logo.svg" alt=""></NuxtLink>
        <span v-html="icons.user_r"></span>
        <client-only>
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
.navbar .bm-burger-button {
    cursor: pointer;
    height: 32px;
    left: 16px;
    position: absolute;
    top: 21px;
    width: 32px;
}

.navbar .line-style {
    height: 10%;
    left: 0;
    position: absolute;
    right: 0;
}

.navbar .line-style:nth-child(2) {
  top: 30%!important;
}

.navbar .line-style:nth-child(3) {
  top: 70%!important;
}

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