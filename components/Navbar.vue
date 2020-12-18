<template>
  <section class="navbar">
      <div class="container mx-auto">
        <div class="navbar__wrap">
          <div class="navbar_left">
            <ul>
              <li class="navbar__logo"><a href="/"><img src="~/assets/imgs/logo.svg" alt=""></a></li>
              <li><NuxtLink to="/">Trang chủ</NuxtLink></li>
              <li><NuxtLink to="/tin-tuc">Tin tức</NuxtLink></li>
            </ul>
          </div>
          <div class="navbar_right">
            <ul>
              <li class="navbar__register cursor-pointer" @click="onModalSearchTicket = !onModalSearchTicket">Tra cứu thông tin vé</li>
            </ul>
          </div>
        </div>
      </div>

      <el-dialog
        class="searchTicket"
        title="Tra cứu thông tin vé"
        :visible.sync="onModalSearchTicket"
        @closed="onClosedViewTicket"
        width="40%">
        <div class="searchTicket__form">
          <p>Nhập mã vé để tra cứu thông tin</p>
          <div class="flex flex-wrap">
            <el-input :value="ticketViewed.phone" @input="$store.commit('trip/SET_TICKET_VIEWED', {phone: $event})" class="w-2/5 pr-2" placeholder="Số điện thoại"></el-input>
            <el-input :value="ticketViewed.ticketCode" @input="$store.commit('trip/SET_TICKET_VIEWED', {ticketCode: $event})" class="w-2/5 pr-2" placeholder="Mã vé"></el-input>
            <button  class="w-1/5" @click="getTicketInfo">Tra cứu vé</button>
          </div>
          <p v-if="ticketViewed.searchSuccess === false" style="margin-top: 8px">Không tìm thấy thông tin cho mã vé này, vui lòng thử lại</p>

          <div class="searchTicket__content" v-if="ticketViewed.data">
            <div class="searchTicket__sum">
              <div class="searchTicket__sum__wrap">
                <div>
                  <h4>17:00 - 12/11/2020</h4>
                  <p>{{ ticketViewed.data[0]['routeInfo']['name'] }}</p>
                </div>
              </div>
            </div>

            <div class="searchTicket__content__item">
              <h3>Tuyến</h3>
              <p>{{ ticketViewed.data[0]['routeInfo']['name'] }}</p>
              <hr>
            </div>
            <div class="flex flex-wrap overflow-hidden">
              <div class="w-1/2">
                <div class="searchTicket__content__item">
                  <h3>Điểm lên</h3>
                  <p>{{ ticketViewed.data[0]['pointUp']['name'] }}</p>
                </div>
              </div>
              <div class="w-1/2">
                <div class="searchTicket__content__item">
                  <h3>Điểm xuống</h3>
                  <p>{{ ticketViewed.data[0]['pointDown']['name'] }}</p>
                </div>
              </div>
              <div class="w-full" style="padding-left: 16px; padding-right: 16px;">
                <hr>
              </div>
            </div>
            <div class="searchTicket__content__item">
              <h3>THÔNG TIN KHÁCH HÀNG</h3>
              <div class="mb-3 flex flex-wrap overflow-hidden items-center">
                <h4 class="w-1/4">Tên</h4>
                <h5 class="w-3/4">{{ ticketViewed.data[0]['fullName'] }}</h5>
              </div>
              <div class="mb-3 flex flex-wrap overflow-hidden items-center">
                <h4 class="w-1/4">Điện thoại</h4>
                <h5 class="w-3/4">{{ ticketViewed.data[0]['phoneNumber'] }}</h5>
              </div>
              <div class="mb-3 flex flex-wrap overflow-hidden items-center">
                <h4 class="w-1/4">Email</h4>
                <h5 class="w-3/4">{{ ticketViewed.data[0]['Email'] }}</h5>
              </div>
              <hr>
            </div>

            <div class="searchTicket__content__item">
              <h3>THÔNG TIN THANH TOÁN</h3>
              <div class="mb-3 flex flex-wrap overflow-hidden items-center">
                <h4 class="w-1/4">Ghế đã đặt</h4>
                <h5 class="w-3/4"> <span v-for="ticket in ticketViewed.data" :key="ticket.ticketId" >{{ ticket.seat.seatId }}</span> </h5>
              </div>
              <div class="mb-3 flex flex-wrap overflow-hidden items-center">
                <h4 class="w-1/4">Tổng tiền</h4>
                <div class="w-3/4 flex items-center justify-between">
                  <h5>{{ ticketViewed.totalMoney | number }}đ</h5>
                  <span class="cursor-pointer" v-if="ticketViewed['data'][0]['paidMoney'] == ticketViewed['data'][0]['agencyPrice']">Đã thanh toán</span>
                  <b v-else>Chưa thanh toán</b>
                </div>
              </div>
            </div>

          </div>
        </div>
    </el-dialog>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import icons from './icon'

export default {
  data () {
    return {
      icons,
      onModalSearchTicket: false
    }
  },

  computed: {
    ...mapState({
      ticketViewed: state => state.trip.ticketViewed
    })
  },

  methods: {
    validateSearchTicket () {
      if( !this.ticketViewed.phone || this.ticketViewed.phone.trim() == "" ) {
          this.$notify.warning({
              message: 'Vui lòng nhập số điện thoại !'
          })

          return false
      }

      if( !this.ticketViewed.ticketCode || this.ticketViewed.ticketCode.trim() == "" ) {
          this.$notify.warning({
              message: 'Vui lòng nhập mã vé !'
          })

          return false
      }

      return true
    },
    onClosedViewTicket () {
      this.$store.commit('trip/RESET_TICKET_VIEWED')
    },

    async getTicketInfo () {
      if(!this.validateSearchTicket()) {
        return false
      }

      let params = {
        'phoneNumber': this.ticketViewed.phone,
        'ticketCode': this.ticketViewed.ticketCode
      }

      try {
        let res = await this.$http.post('https://ticket-new-dot-dobody-anvui.appspot.com/ticket/check', params)
        let ticketInfo = await res.json()

        if( ticketInfo.results.data.length  > 0 ) {
          let totalMoney = 0

          ticketInfo.results.data.forEach(ticket => {
            totalMoney += ticket.agencyPrice
          });

          this.$store.commit('trip/SET_TICKET_VIEWED', {phone: null})
          this.$store.commit('trip/SET_TICKET_VIEWED', {searchSuccess: true})
          this.$store.commit('trip/SET_TICKET_VIEWED', {data: ticketInfo.results.data})
          this.$store.commit('trip/SET_TICKET_VIEWED', {totalMoney: totalMoney})
        } else {
          this.$store.commit('trip/SET_TICKET_VIEWED', {phone: null})
          this.$store.commit('trip/SET_TICKET_VIEWED', {searchSuccess: false})
          this.$store.commit('trip/SET_TICKET_VIEWED', {data: null})
          this.$store.commit('trip/SET_TICKET_VIEWED', {totalMoney: 0})
        }
      } catch (error) {
        this.$store.commit('trip/SET_TICKET_VIEWED', {phone: null})
        this.$store.commit('trip/SET_TICKET_VIEWED', {searchSuccess: false})
        this.$store.commit('trip/SET_TICKET_VIEWED', {data: null})
        this.$store.commit('trip/SET_TICKET_VIEWED', {totalMoney: 0})
      }
    }
  }
}
</script>


<style scoped>
.navbar {
  border-bottom: 1px solid #FFDAE1;
}
.navbar__wrap {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.navbar_right ul {
  display: flex;
  align-items: center;
}

.navbar_right ul li {
  margin-right: 40px;
}

.navbar_right ul li a {
  font-weight: 500;
  font-size: 18px;
}

.navbar__register {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  color: #FF4868;
  border: 2px solid #FFDAE1;
  border-radius: 4px;
}

.navbar_left ul {
  display: flex;
}

.navbar_left ul li {
  height: 80px;
  line-height: 80px;
  margin-right: 40px;
  transition: .3s ease-in-out;
}

.navbar_left ul li a {
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: 4px solid transparent;
}

.navbar_left ul li:not(.navbar__logo):hover a{
  border-bottom-color: #FF4868;
}

.navbar_left ul li.navbar__logo {
  margin-right: 76px;
}

.navbar_left ul li .nuxt-link-exact-active{
  border-bottom-color: #FF4868;
} 

.navbar_left ul li a {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #383F47;
}

.searchTicket__content {
  margin-top: 22px;
}

.searchTicket__sum {
  padding: 16px 16px 16px 0px;
  background: #ffdae166;
  border-radius: 4px 4px 0px 0px;
  margin-bottom: 24px;
}

.searchTicket__sum__wrap {
  border-left: 4px solid #FF4868;
  padding-left: 16px;
}

.searchTicket__sum h4 {
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #383F47;
  margin-bottom: 8px;
}

.searchTicket__sum p {
  display: flex;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #646D84;
}

.searchTicket__sum p span {
  margin-right: 18px;
  margin-left: 18px;
}

.searchTicket__content__item {
  padding: 16px 24px;
  /* border-bottom: 1px solid #ECEDF1; */
}

.searchTicket__content__item>h3 {
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #FF4868;
  margin-bottom: 16px;
}

.searchTicket__content__item hr {
  margin-top: 16px;
}

.searchTicket__content__item p {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #383F47;
}

.searchTicket__content__item h4 {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #9399A9;
}

.searchTicket__content__item h5 {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #383F47;
}

.searchTicket__content__item span {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #49D193;
}

.searchTicket__content__item b {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #ffc107;
}

.searchTicket__content__item h5 span::after {
  content: ",";
  margin-right: 8px;
}

.searchTicket__content__item h5 span:last-child:after {
  content: "";
}
</style>