<template>
  <div>
    <banner />
    <div class="promotion__wrap">
        <promotion />
    </div>
    <div class="bannerStep">
      <div class="container mx-auto">
        <div class="bannerStep__wrap">
          <div class="bannerStep__item">
            <div class="bannerStep__item__content">
              <img src="~/assets/imgs/banner/banner2__icon.png" alt="">
              <div>
                <h3>TÌM KIẾM</h3>
                <p>Chọn chuyến đi phù hợp</p>
              </div>
            </div>
          </div>
          <div class="bannerStep__item">
            <div class="bannerStep__item__content">
              <img src="~/assets/imgs/banner/banner2__icon1.png" alt="">
              <div>
                <h3>ĐẶT VÉ</h3>
                <p>Chọn chỗ & thanh toán</p>
              </div>
            </div>
          </div>
          <div class="bannerStep__item">
            <div class="bannerStep__item__content">
              <img src="~/assets/imgs/banner/banner2__icon2.png" alt="">
              <div>
                <h3>ĐI AN VỀ VUI</h3>
                <p>Trải nghiệm hành trình</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="routeHot__wrap">
      <route-hot />
    </div>
    <div class="shortIntro">
      <div class="container mx-auto">
        <div class="flex flex-wrap overflow-hidden" style="margin-left: -15px; margin-right: -15px;">
          <div class="w-1/3" style="padding-left: 15px; padding-right: 15px;">
            <div class="shortIntro__item">
              <div v-html="icons.bus1" class="shortIntro__item__icon"></div>
              <h3>HÃNG XE UY TÍN</h3>
              <p>Chỉ cung cấp vé của các hãng xe uy tín trên thị trường</p>
            </div>
          </div>
          <div class="w-1/3" style="padding-left: 15px; padding-right: 15px;">
            <div class="shortIntro__item">
              <div v-html="icons.ticket" class="shortIntro__item__icon"></div>
              <h3>GIÁ VÉ BÌNH ỔN</h3>
              <p>Giá vé xe được cam kết không tăng giá so với ngày thường cùng các chương trình khuyến mãi hấp dẫn</p>
            </div>
          </div>
          <div class="w-1/3" style="padding-left: 15px; padding-right: 15px;">
            <div class="shortIntro__item">
              <div v-html="icons.sale" class="shortIntro__item__icon"></div>
              <h3>ĐẢM BẢO CHẤT LƯỢNG</h3>
              <p>Vé xe được mua qua Vetet.vn được nhà xe đảm bảo về chất lượng dịch vụ</p>
            </div>
          </div>  
        </div>
      </div>
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
import icons from '../../components/icon'

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
      icons
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
.bannerStep {
  margin: 80px 0px;
}
.bannerStep__wrap {
  padding-top: 130px;
  background-image: url('~@/assets/imgs/banner/banner2.png');
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}

.bannerStep__item {
  height: 182px;
  border-left: 4px solid #FF4868;
}

.bannerStep__item img {
  margin-right: 8px;
}

.bannerStep__item h3 {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #383F47;
}

.bannerStep__item p {
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 29px;
  color: #757d91;
}
.bannerStep__item__content {

}
.bannerStep__item__content {
  margin-left: -54px;
  display: flex;
  align-items: center;
}

.promotion__wrap {
  margin-top: -58px;
}
.routeHot__wrap {
  margin-bottom: 80px;
}
.partner__wrap {
  margin-bottom: 80px;
}

.shortIntro {
  padding: 80px 0px;
  background-image: url('~@/assets/imgs/banner/background1.png');
  background-color: #FFDAE1;
  margin-bottom: 80px;
}

.shortIntro__item {

} 

.shortIntro__item h3 {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #646D84;
  margin-bottom: 4px;
}

.shortIntro__item p {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 29px;
  color: #646D84;
}

.shortIntro__item__icon {
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  border-radius: 50%;
  margin-bottom: 24px;
  border: 1px dashed #FF4868;
  box-sizing: border-box;
  /* shadow/background */

  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
}
</style>