<template>
<section class="blockPartner">
    <div class="container mx-auto">
        <div class="block__header">
            <h2>Chính sách mua vé cho khách hàng</h2>
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
</section>
</template>

<script>
export default {
    data () {
        return {
        carouselOption: {
            loop: true,
            perPage: 4,
            paginationEnabled: false,
        }
        }
    }
}
</script>

<style>
.blockPartner {
  background-color: transparent;
}

.blockPartner .VueCarousel-inner .VueCarousel-slide {
  margin-right: 20px;
  /* background: linear-gradient(19.9deg, #FF4868 42.52%, rgba(255, 255, 255, 0) 88.98%); */
  /* opacity: 0.7; */
  filter: drop-shadow(0px 2px 12px rgba(0, 0, 0, 0.08));
  border-radius: 12px;
  overflow: hidden;
}

.blockPartner .VueCarousel-inner .VueCarousel-slide img {
    height: 62px;
    width: auto;
}
</style>

<style scoped>
.blockPartner .block__header {
    margin-bottom: 40px;
}
</style>