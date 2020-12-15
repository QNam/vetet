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
        width="45%">
        <div class="searchTicket__form">
          <p>Nhập mã vé để tra cứu thông tin</p>
          <div class="flex flex-wrap">
            <el-input :value="ticketViewed.phone" @input="$store.commit('trip/SET_TICKET_VIEWED', {phone: $event})" class="w-2/5 pr-2" placeholder="Mã vé"></el-input>
            <el-input :value="ticketViewed.ticketCode" @input="$store.commit('trip/SET_TICKET_VIEWED', {ticketCode: $event})" class="w-2/5 pr-2" placeholder="Số điện thoại"></el-input>
            <button  class="w-1/5" @click="getTicketInfo">Tra cứu vé</button>
          </div>
        </div>
    </el-dialog>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      onModalSearchTicket: false
    }
  },

  computed: {
    ...mapState({
      ticketViewed: state => state.trip.ticketViewed
    })
  },

  methods: {
    async getTicketInfo () {
      let params = {
        'ticketCode': this.ticketViewed.phone,
        'phoneNumber': this.ticketViewed.ticketCode
      }

      let res = await this.$http.post('https://ticket-new-dot-dobody-anvui.appspot.com/ticket/check', params)
      let ticketInfo = await res.json() 
    }
  }
}
</script>

<style>
.searchTicket .el-dialog{
  padding: 24px;
}

.searchTicket .el-dialog .el-dialog__header {
  padding: 0px!important;
  margin-bottom: 16px;
}

.searchTicket .el-dialog .el-dialog__body {
  padding: 0px!important;
}

.searchTicket__form>p{
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #646D84;
  margin-bottom: 8px;
}

.searchTicket__form input {
  height: 40px;
  background: #F9FAFC;
  border: 1px solid #ECEDF1;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 16px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #383F47;
}

.searchTicket__form button {
  background: #FF4868;
  border-radius: 4px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #FFFFFF;
}

.searchTicket .el-dialog .el-dialog__title {
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #383F47;
}
</style>

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

</style>