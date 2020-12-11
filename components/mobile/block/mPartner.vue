<template>
  <div class="mPartner">
    <div class="block__header">
        <h2>Các nhà xe tham gia chương trình</h2>
    </div>
    <div>
        <client-only>
            <carousel v-bind="carouselOption">
                <slide><img src="~/assets/imgs/pn/pn1.png" /></slide>
                <slide><img src="~/assets/imgs/pn/pn2.png" /></slide>
                <slide><img src="~/assets/imgs/pn/pn3.png" /></slide>
                <slide><img src="~/assets/imgs/pn/pn4.png" /></slide>
            </carousel>
        </client-only>
        </div>
  </div>
</template>

<script>
import icons from '../../icon'

export default {
  data () {
    return {
      icons,
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
.mPartner {
    padding: 16px;
}
.mPartner .block__header {
    margin-bottom: 28px;
}
.mPartner .block__header h2{
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #383F47;
}

.mPartner img {
    height: 31px;
    width: auto;
}
</style>

<style>
.mPartner .VueCarousel-slide {
    margin-right: 37px;
}
</style>