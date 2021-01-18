<template>
    <div class="navbar">
      <!-- <client-only>
        <SlideMenu :closeOnNavigation="true" noOverlay>
            <NuxtLink to="/" class="block">Trang chủ</NuxtLink>
            <NuxtLink to="/tin-tuc" class="block">Tin tức</NuxtLink>
        </SlideMenu> -->
        <el-drawer class="navbar__sidebar" size="50%" direction="ltr" :visible.sync="openSideBar" :with-header="false">
          <div class="navbar__sidebar__item">
            <span v-html="icons.home"></span>
            <NuxtLink to="/" class="block">Trang chủ</NuxtLink>
            <NuxtLink to="/huong-dan-dat-ve">Hướng dẫn đặt vé</NuxtLink>
          </div>
          
        </el-drawer>
        <span v-html="icons.text_justify" @click="openSideBar = !openSideBar" class="cursor-pointer"></span>
        <NuxtLink to="/" class="block"><img src="~/assets/imgs/logo.svg" alt=""></NuxtLink>
        <span v-html="icons.user_r" class="invisible"></span>
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
      openSideBar: false
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

.navbar__sidebar {
  max-width: 500px;
}
.navbar__sidebar a {
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #383f47;
}

.navbar__sidebar__item {
  display: flex;
  align-items: center;
  padding: 16px;
}

.navbar__sidebar__item span {
  display: block;
  margin-right: 12px;
}
</style>