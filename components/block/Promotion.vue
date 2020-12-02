<template>
<div class="blockPromotion">
  <div class="container mx-auto">
      <client-only>
        <carousel v-bind="carouselOption">
          <slide><img src="~/assets/imgs/promotion/prom1.png" /></slide>
          <slide><img src="~/assets/imgs/promotion/prom2.png" /></slide>
          <slide><img src="~/assets/imgs/promotion/prom3.png" /></slide>
        </carousel>
      </client-only>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      carouselOption: {
        loop: true,
        perPage: 3,
        paginationEnabled: false,
      }
    }
  }
}
</script>

<style scoped>
.blockPromotion {
  background-color: transparent;
}

.blockPromotion .VueCarousel-inner .VueCarousel-slide {
  margin-right: 20px;
  /* background: linear-gradient(19.9deg, #FF4868 42.52%, rgba(255, 255, 255, 0) 88.98%); */
  /* opacity: 0.7; */
  filter: drop-shadow(0px 2px 12px rgba(0, 0, 0, 0.08));
  border-radius: 12px;
  overflow: hidden;
}

.blockPromotion .VueCarousel-inner .VueCarousel-slide img {
  width: 100%;
}
</style>