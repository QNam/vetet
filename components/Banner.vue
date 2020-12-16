<template>
  <div class="banner">
    <img src="~/assets/imgs/banner/banner1.png" alt="">
    <div class="banner__content">
        <div class="container mx-auto">
            <h1>Bình ổn giá vé về quê ăn tết AN VUI !</h1>
            <div class="banner__searchTrip">
                <form-search-trip />
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import FormSearchTrip from '../components/FormSearchTrip'

export default {
    "form-search-trip": FormSearchTrip
}
</script>

<style scoped>
.banner {
    position: relative;
}
.banner__content {
    position: absolute;
    width: 100%;
    top: 20%;
}
.banner__content h1 {
    margin-bottom: 42px;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 58px;
    letter-spacing: 0.03em;
    color: #FFFFFF;
    text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
}
</style>