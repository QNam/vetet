<template>
  <div class="routeItem flex justify-between items-center flex-wrap overflow-hidden">
      <div class="w-2/3 overflow-hidden flex flex-wrap justify-between items-center pr-2">
        <h4 class="w-1/3">Hà Nội</h4>
        <h5 class="w-1/3" v-html="icons.arrowr"></h5>
        <h4 class="w-1/3">Nghệ An</h4>
      </div>
      <div class="w-1/3 overflow-hidden flex justify-between items-center">
        <p class="routeItem__price mr-2">180.000đ</p>
        <button  class="routeItem__selectdate">Chọn ngày</button>
      </div>
  </div>
</template>

<script>
import icons from '../icon'

export default {
    data () {
        return {
            icons: icons
        }
    }
}
</script>

<style scoped>
.routeItem__price {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    text-align: right;
    color: #49D193;
}

.routeItem__selectdate {
    background: #FFFFFF;
    border: 2px solid #FFDAE1;
    box-sizing: border-box;
    border-radius: 4px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: #FF4868;
    padding: 9px 16px;
    white-space: nowrap;
}
</style>