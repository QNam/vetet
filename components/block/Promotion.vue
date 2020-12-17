<template>
<div class="blockPromotion relative">
    <div class="container mx-auto">
        <div class="flex flex-wrap overflow-hidden" style="margin-left: -15px; margin-right: -15px;">
          <div class="w-1/3" style="padding-left: 15px; padding-right: 15px;">
            <div class="blockPromotion__img">
              <img src="~/assets/imgs/promotion/prom1.png" />
            </div>  
          </div>
          <div class="w-1/3" style="padding-left: 15px; padding-right: 15px;">
            <div class="blockPromotion__img">
              <img src="~/assets/imgs/promotion/prom2.png" />
            </div>
          </div>
          <div class="w-1/3" style="padding-left: 15px; padding-right: 15px;">
            <div class="blockPromotion__img">
              <img src="~/assets/imgs/promotion/prom3.png" />
            </div>
          </div>
        </div>
    </div>
  <!-- <div class="container mx-auto">
      <client-only>
        <carousel v-bind="carouselOption">
          <slide><img src="~/assets/imgs/promotion/prom1.png" /></slide>
          <slide><img src="~/assets/imgs/promotion/prom2.png" /></slide>
          <slide><img src="~/assets/imgs/promotion/prom3.png" /></slide>
        </carousel>
      </client-only>
  </div> -->
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

.blockPromotion .blockPromotion__img {
  filter: drop-shadow(0px 2px 12px rgba(0, 0, 0, 0.08));
  border-radius: 12px;
  overflow: hidden;
}

.blockPromotion .blockPromotion__img img {
  width: 100%;
}
</style>