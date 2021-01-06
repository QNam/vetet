<template>
<div class="blockPromotion">
      <client-only>
        <el-carousel :interval="4000" height="200px">
            <el-carousel-item>
                <img src="~/assets/imgs/promotion/prom1.png" />
            </el-carousel-item>
            <el-carousel-item>
                <img src="~/assets/imgs/promotion/prom2.png" />
            </el-carousel-item>
            <el-carousel-item>
                <img src="~/assets/imgs/promotion/prom3.png" />
            </el-carousel-item>
        </el-carousel>
        <!-- <carousel v-bind="carouselOption">
          <slide></slide>
          <slide><img src="~/assets/imgs/promotion/prom2.png" /></slide>
          <slide><img src="~/assets/imgs/promotion/prom3.png" /></slide>
        </carousel> -->
      </client-only>
</div>
</template>

<script>
export default {
  data () {
    return {
      carouselOption: {
        loop: true,
        perPage: 1,
        paginationEnabled: false,
      }
    }
  }
}
</script>

<style scoped>
.blockPromotion {
  background-color: transparent;
  margin-top: 24px;
  margin-bottom: 24px;
}

.blockPromotion .VueCarousel-inner .VueCarousel-slide {
  margin-right: 32px;
  /* background: linear-gradient(19.9deg, #FF4868 42.52%, rgba(255, 255, 255, 0) 88.98%); */
  /* opacity: 0.7; */
  filter: drop-shadow(0px 2px 12px rgba(0, 0, 0, 0.08));
  border-radius: 12px;
  overflow: hidden;
}

.blockPromotion img {
  margin: 0 auto;
}
</style>