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

<style scoped>
.blockPartner .block__header {
    margin-bottom: 40px;
}
</style>