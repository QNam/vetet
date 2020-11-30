<template>
  <section class="navbar">
      <div class="container mx-auto">
        <div class="navbar__wrap">
          <div class="navbar_left">
            <ul>
              <li class="navbar__logo"><a href="/" class="inline-block"><img src="~/assets/imgs/logo.svg" alt=""></a></li>
              <li><NuxtLink to="/">Trang chủ</NuxtLink></li>
              <li><NuxtLink to="/tin-tuc">Tin tức</NuxtLink></li>
            </ul>
          </div>
          <div class="navbar_right">
            <ul>
              <li><a href="">Đăng nhập</a></li>
              <li class="mr-0"><a href="" class="navbar__register">Đăng ký tài khoản</a></li>
            </ul>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
export default {
  head: {
    title: 'Tin tức',
  }
}
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid #FFDAE1;
}
.navbar__wrap {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.navbar_right ul {
  display: flex;
  align-items: center;
}

.navbar_right ul li {
  margin-right: 40px;
}

.navbar_right ul li a {
  font-weight: 500;
  font-size: 18px;
}

.navbar__register {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  color: #FF4868;
  border: 2px solid #FFDAE1;
  border-radius: 4px;
}

.navbar_left ul {
  display: flex;
}

.navbar_left ul li {
  height: 80px;
  line-height: 80px;
  margin-right: 40px;
  transition: .3s ease-in-out;
}

.navbar_left ul li.navbar__logo {
  margin-right: 76px;
}

.navbar_left ul li:not(.navbar__logo):hover {
  border-bottom: 4px solid #FF4868;
}

.navbar_left ul li a {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #383F47;
}

</style>