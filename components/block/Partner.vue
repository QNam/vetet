<template>
<section class="blockPartner">
    <div class="container mx-auto">
        <div class="block__header">
            <h2>Các nhà xe tham gia chương trình</h2>
        </div>
        <div>
            <client-only>
                <carousel v-bind="carouselOption">
                    <slide><img src="~/assets/imgs/pn/halan.png" /></slide>
                    <slide><img src="~/assets/imgs/pn/haiphongtravel.png" /></slide>
                    <slide><img src="~/assets/imgs/pn/khainam.png" /></slide>
                    <slide><img src="~/assets/imgs/pn/coanh.jpg" /></slide>
                    <slide><img src="~/assets/imgs/pn/namtien.png" /></slide>
                    <slide><img src="~/assets/imgs/pn/tgtp.jpg" /></slide>
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

<style scoped>
.blockPartner .block__header {
    margin-bottom: 40px;
}
</style>