<template>
  <div class="routeItem flex justify-between items-center flex-wrap overflow-hidden">
      <div class="w-2/3 overflow-hidden flex flex-wrap justify-between items-center pr-2">
        <h4>{{ route.route_name }}</h4>
      </div>
      <div class="w-1/3 overflow-hidden cursor-pointer flex justify-between items-center">
        <p class="routeItem__price mr-2" v-if="route.display_price != null">{{ route.display_price | number }}đ</p>
        <p class="routeItem__price mr-2 invisible" v-else>{{ route.display_price }} đ</p>
        <button
          @click="$refs.date.focus()"
          class="routeItem__selectdate z-10"  
          v-html="icons.calendar1"></button>
        <el-date-picker
          class="absolute pointer-events-none"
          ref="date"
          type="date"
          @change="searchTripByRoute"
          v-model="date"
          format="dd-MM-yyyy"
          value-format="yyyyMMdd"
          placeholder="Chọn ngày">
      </el-date-picker>
      </div>
  </div>
</template>

<script>
import icons from '../icon'

export default {
    props: ["route"],
    data () {
        return {
            icons: icons,
            date: null
        }
    },
    methods: {
      searchTripByRoute() {
        let query = {
          date: this.date,
          // route_id: this.route.route_id
        }
        this.$store.commit('trip/SET_FILTER_TRIP', {pointUp: this.route.start_point_name})
        this.$store.commit('trip/SET_FILTER_TRIP', {date: this.date})
        this.$store.commit('trip/SET_FILTER_TRIP', {pointDown: this.route.end_point_name})

        this.$router.push({path: "/tim-ve", query})
      }
    }
}
</script>

<style>
.routeItem .el-input__inner {
  opacity: 0;
}

.routeItem .el-input__prefix {
  display: none;
}
</style>
<style scoped>
.routeItem h4 {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #383F47;
}
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
    width: 40px;
    height: 40px;
    color: #FF4868;
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 9px 11px; */
    white-space: nowrap;
}
</style>