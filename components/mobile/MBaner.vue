<template>
  <div class="mbanner">
    <h2>Bình ổn giá vé về quê ăn tết AN VUI !</h2>
    <form-search-trip />
  </div>
</template>

<script>
import MFormSearchTrip from './MFormSearchTrip'

export default {
    components: {
        'form-search-trip': MFormSearchTrip
    }
}
</script>

<style scoped>
.mbanner {
    padding: 24px 16px 40px 16px;
    background-image: url('~@/assets/imgs/banner/mobile_banner1.png')
}

.mbanner h2 {
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.03em;
    color: #FFFFFF;
    text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    margin-bottom: 16px;
}

.mFormSeatTrip__wrap {
    margin-bottom: 24px;
}
</style>