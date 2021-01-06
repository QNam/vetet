<template>
  <div class="mrouteHot">
    <div class="block__header">
        <h2>Các tuyến nổi bật</h2>
        <!-- <a href="">Xem tất cả</a> -->
    </div>

    <div class="mrouteHot__wrap">
      <route-item v-for="(route, index) in listRoute" :route="route" :key="index" />
    </div>
  </div>
</template>

<script>
import icons from '../../icon'
import mRouteHotItem from './mRouteHotItem'

export default {
  components: {
    'route-item': mRouteHotItem
  },

  data () {
      return {
        icons,
        listRoute: []
      }
  },

  async fetch() {
      let res = await this.$http.get(encodeURI('https://apiv2.sanve.com.vn/api/route/list?api_token=vetet.5.jDlMLiTVVPlGivId4M9Xi1WUlsrkz7W3&count=12&name=Hà Nội') )
      let listRouteAsJson = await res.json()
      let listRoute = listRouteAsJson.data.data

      this.listRoute = listRoute
  },
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

.mrouteHot .block__header {
  /* padding-bottom: 14px; */
  /* border-bottom: 1px solid #ECEDF1; */
}
</style>