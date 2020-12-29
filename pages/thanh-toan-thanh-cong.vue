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
              <p>{{ ticketInfo.startTime }} - {{ ticketInfo.startDate }}</p>
              <div class="flex flex-wrap overflex-hidden mb-2" style="margin-right: -15px; margin-left: -15px;">
                  <div class="w-1/2" style="padding-right: 15px; padding-left: 15px; ">
                    <div class="flex items-center fex-wrap mb-2">
                        <span class="w-1/4 whitespace-nowrap">Điểm đi</span>
                        <b class="w-3/4">{{ ticketInfo['data'][0]['pointUp']['name'] }}</b>
                    </div>
                    <div class="flex items-center fex-wrap mb-2">
                        <span class="w-1/4 whitespace-nowrap">Địa chỉ</span>
                        <b class="w-3/4">{{ ticketInfo['data'][0]['pointUp']['address'] }}</b>
                    </div>
                  </div>
                  <div class="w-1/2" style="padding-right: 15px; padding-left: 15px; ">
                    <div class="flex items-center fex-wrap mb-2">
                        <span class="w-1/4 whitespace-nowrap">Điểm đến</span>
                        <b class="w-3/4">{{ ticketInfo['data'][0]['pointDown']['name'] }}</b>
                    </div>
                    <div class="flex items-center fex-wrap mb-2">
                        <span class="w-1/4 whitespace-nowrap">Địa chỉ</span>
                        <b class="w-3/4">{{ ticketInfo['data'][0]['pointDown']['address'] }}</b>
                    </div>
                  </div>
              </div>
          </div>

          <div class="ticketInfo__content__item">
              <h3>THÔNG TIN KHÁCH HÀNG</h3>
              <div class="flex items-center fex-wrap mb-2">
                  <span class="w-1/4 whitespace-nowrap">Họ tên</span>
                  <b class="w-3/4">{{ ticketInfo['data'][0]['fullName'] }}</b>
              </div>
              <div class="flex items-center fex-wrap mb-2">
                  <span class="w-1/4 whitespace-nowrap">Số điện thoại</span>
                  <b class="w-3/4">{{ ticketInfo['data'][0]['phoneNumber'] }}</b>
              </div>
              <div class="flex items-center fex-wrap mb-2">
                  <span class="w-1/4 whitespace-nowrap">Email</span>
                  <b class="w-3/4">{{ ticketInfo['data'][0]['email'] }}</b>
              </div>
          </div>

          <div class="ticketInfo__content__item">
              <h3>THÔNG TIN THANH TOÁN</h3>
              <div class="flex items-center fex-wrap">
                  <span class="w-1/4 whitespace-nowrap">Số tiền</span>
                  <b class="w-3/4">{{ ticketInfo['totalMoney'] | number }} đ</b>
              </div>
              <div class="flex items-center fex-wrap">
                  <span class="w-1/4">Hình thức thanh toán</span>
                  <b class="w-3/4">VNPAY</b>
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
            ticketInfo = await res.json()
        } catch (e) {
            error({ statusCode: 500, message: 'Có lỗi xảy ra vui lòng thử lại sau !' })
        }
        
        if( ticketInfo && ticketInfo.results.data.length  > 0 ) {
            let totalMoney = 0
            ticketInfo.results.data.forEach(ticket => {
                totalMoney += ticket.agencyPrice
            });

            let startDate = "";
            let startTime = "";

            if(ticketInfo.results.data[0]['getInTimePlan']) {
                let startDT = new Date(ticketInfo.results.data[0]['getInTimePlan'] - 7 * 3600 * 1000)
                let date = startDT.getDate() < 10 ? "0" + startDT.getDate() : "" + startDT.getDate()
                let month = (startDT.getMonth() + 1) < 10 ? "0" + (startDT.getMonth() + 1) : "" + (startDT.getMonth() + 1)
                let year = startDT.getFullYear()
                let hour = startDT.getHours() < 10 ? "0" + startDT.getHours() : "" + startDT.getHours()
                let minute = startDT.getMinutes() < 10 ? "0" + startDT.getMinutes() : "" + startDT.getMinutes()
                
                startDate = date + "/" + month + "/" + year
                startTime = hour + ":" + minute
            }
            
            let result = {
                data: ticketInfo.results.data,
                totalMoney,
                startDate,
                startTime
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