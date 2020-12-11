<template>
  <div>
    <banner />
    <div class="promotion__wrap">
        <promotion />
    </div>
    <div class="routeHot__wrap">
      <route-hot />
    </div>
    <div class="partner__wrap">
      <partner />
    </div>
    <policy />
  </div>
</template>

<script>
import Banner from '../../components/Banner'
import RouteHot from '../../components/block/RouteHot'
import Policy from '../../components/block/Policy'
import Promotion from '../../components/block/Promotion'
import Partner from '../../components/block/Partner'

export default {
  components: {
    "banner": Banner,
    "route-hot": RouteHot,
    "policy": Policy,
    "promotion" : Promotion,
    "partner": Partner
  },
  data () {
    return {
      
    }
  }
}
</script>

<style>
.policy .el-tabs__header {
  border: none!important;
  margin-bottom: 24px;
}

.policy .el-tabs--card>.el-tabs__header .el-tabs__item  {
  background: #FFFFFF;
  border: 2px solid #FFDAE1;
  box-sizing: border-box;
  border-radius: 4px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #FF4868;
  margin-right: 8px;
}

.policy .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  background-color: #FF4868;
  color: #fff;
  border: 2px solid #FF4868;
}
</style>
<style scoped>
.promotion__wrap {
  margin-top: -58px;
}
.routeHot__wrap {
  margin-bottom: 80px;
}
.partner__wrap {
  margin-bottom: 80px;
}
</style>