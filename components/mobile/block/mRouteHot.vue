<template>
  <div class="mrouteHot">
    <div class="block__header">
        <h2>Các tuyến nổi bật</h2>
        <a href="">Xem tất cả</a>
    </div>

    <div class="mrouteHot__wrap">
      <div class="mrouteHot__item" v-for="item in 6" :key="item">
        <div class="mrouteHot__item__name">
          <h4 class="w-2/5">Hà Nội</h4>
          <h5 class="w-1/5" v-html="icons.arrowr"></h5>
          <h4 class="w-2/5">Nghệ An</h4>
        </div>
        <h3>180.000đ</h3>
        <button v-html="icons.calendar1"></button>
      </div>
    </div>
  </div>
</template>

<script>
import icons from '../../icon'

export default {
  data () {
    return {
      icons
    }
  }
}
</script>

<style scoped>
.mrouteHot {
    padding: 16px;
}
.mrouteHot .block__header h2{
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #383F47;
}

.mrouteHot__item {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  margin-top: 16px;
  justify-content: space-between;
  align-items: center;
}

.mrouteHot__item__name {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-right: 8px;
  width: 60%;
}

.mrouteHot__item>h3 {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  text-align: right;
  color: #49D193;
  margin-right: 16px;
}

.mrouteHot__item button {
  width: 32px;
  height: 32px;
  background: #FFFFFF;
  border: 2px solid #FFDAE1;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mrouteHot .block__header {
  /* padding-bottom: 14px; */
  /* border-bottom: 1px solid #ECEDF1; */
}
</style>