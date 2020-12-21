<template>
<div class="container mx-auto">
  <div class="ticketInfo" v-if="ticketInfo">
      <div class="ticketInfo__status">
          <p>Đặt chỗ thành công!</p>
      </div>
      <div class="ticketInfo__content">
          <h3>Mã vé: {{ ticketInfo['data'][0]['ticketCode'] }}</h3>
          <div class="ticketInfo__content__item">
              <h3>THÔNG TIN CHUYẾN ĐI</h3>
              <!-- <p>17:00 - 12/11/2020</p> -->
              <div class="flex flex-wrap overflex-hidden mb-2" style="margin-right: -15px; margin-left: -15px;">
                  <div class="w-1/2" style="padding-right: 15px; padding-left: 15px; ">
                    <div class="flex items-center fex-wrap mb-2">
                        <span class="w-1/5">Điểm đi</span>
                        <b class="w-4/5">{{ ticketInfo['data'][0]['pointUp']['name'] }}</b>
                    </div>
                    <div class="flex items-center fex-wrap mb-2">
                        <span class="w-1/5">Địa chỉ</span>
                        <b class="w-4/5">{{ ticketInfo['data'][0]['pointUp']['address'] }}</b>
                    </div>
                  </div>
                  <div class="w-1/2" style="padding-right: 15px; padding-left: 15px; ">
                    <div class="flex items-center fex-wrap mb-2">
                        <span class="w-1/5">Điểm đến</span>
                        <b class="w-4/5">{{ ticketInfo['data'][0]['pointDown']['name'] }}</b>
                    </div>
                    <div class="flex items-center fex-wrap mb-2">
                        <span class="w-1/5">Địa chỉ</span>
                        <b class="w-4/5">{{ ticketInfo['data'][0]['pointDown']['address'] }}</b>
                    </div>
                  </div>
              </div>
          </div>

          <div class="ticketInfo__content__item">
              <h3>THÔNG TIN KHÁCH HÀNG</h3>
              <div class="flex items-center fex-wrap mb-2">
                  <span class="w-1/5">Họ tên</span>
                  <b class="w-4/5">{{ ticketInfo['data'][0]['fullName'] }}</b>
              </div>
              <div class="flex items-center fex-wrap mb-2">
                  <span class="w-1/5">Số điện thoại</span>
                  <b class="w-4/5">{{ ticketInfo['data'][0]['phoneNumber'] }}</b>
              </div>
              <div class="flex items-center fex-wrap mb-2">
                  <span class="w-1/5">Email</span>
                  <b class="w-4/5">{{ ticketInfo['data'][0]['email'] }}</b>
              </div>
          </div>

          <div class="ticketInfo__content__item">
              <h3>THÔNG TIN THANH TOÁN</h3>
              <div class="flex items-center fex-wrap">
                  <span class="w-1/5">Số tiền</span>
                  <b class="w-4/5">{{ ticketInfo['totalMoney'] | number }} đ</b>
              </div>
              <div class="flex items-center fex-wrap">
                  <span class="w-1/5">Hình thức thanh toán</span>
                  <b class="w-4/5">VNPAY</b>
              </div>
          </div>
      </div>
  </div>
</div> 
</template>

<script>
export default {
    head: {
        title: "Thanh toán thành công"
    },

    async asyncData({ query, store, $http, $helper, error }) {
        let params = {
            'phoneNumber': query.phoneNumber,
            'ticketCode': query.ticketCode
        }

        let ticketInfo = null
        try {
            let res = await $http.post('https://ticket-new-dot-dobody-anvui.appspot.com/ticket/check', params)
            let ticketInfo = await res.json()
        } catch (e) {
            error({ statusCode: 500, message: 'Có lỗi xảy ra vui lòng thử lại sau !' })
        }

        if( ticketInfo && ticketInfo.results.data.length  > 0 ) {
            let totalMoney = 0
            ticketInfo.results.data.forEach(ticket => {
                totalMoney += ticket.agencyPrice
            });

            let result = {
                data: ticketInfo.results.data,
                totalMoney
            }
            return { ticketInfo: result }
        } else {
            return { ticketInfo: false }
        }
    }
}
</script>

<style>
.ticketInfo {
    padding: 65px 0px 160px 0px;
}

.ticketInfo__status {
    height: 48px;
    padding: 8px;
    background: #C8F1DF;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
    border-radius: 4px 4px 0px 0px;
    margin-bottom: 16px;
}

.ticketInfo__status p {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: #49D193;
    text-align: center
}

.ticketInfo__content {
    background: #FFFFFF;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    padding-top: 16px;
}
.ticketInfo__content>h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: #383F47;
    border-left: 4px solid #FF4868;
    padding: 0px 12px;
    margin-bottom: 16px;
    margin-top: 16px;
}

.ticketInfo__content__item {
    margin-bottom: 16px;
    padding: 16px;
}
.ticketInfo__content__item>p {
    margin-bottom: 8px;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: #383F47;
}
.ticketInfo__content__item>h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #FF4868;
    margin-bottom: 16px;
}
.ticketInfo__content__item span {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 32px;
    color: #9399A9;
}

.ticketInfo__content__item b {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 32px;
    color: #383F47;
}
</style>