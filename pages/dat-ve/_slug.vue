<template>
  <div class="tripDetail" v-loading="loading">
      <div class="container mx-auto">
          <div class="flex flex-wrap overflow-hidden">

                <div class="w-1/3 overflow-hidden pr-3">
                    <trip-info />
                </div>
                <div class="tripDetail__content w-2/3 overflow-hidden pl-3">
                    <div class="seatMap__wrap" v-if="tabs.seatMap">
                        <div class="seatMap__header">
                            <h3>Chọn ghế</h3>
                            <div class="seatMap__note">
                                <h4>
                                    <b v-html="icons.seat"></b>
                                    <span>Ghế trống</span>
                                </h4>
                                <h4>
                                    <b v-html="icons.seat" class="seatItem__selected"></b>
                                    <span>Đang chọn</span>
                                </h4>
                                <h4>
                                    <b v-html="icons.seat" class="seatItem__booked"></b>
                                    <span>Đã đặt</span>
                                </h4>
                            </div>
                        </div>
                        
                        <div class="flex flex-wrap overflow-hidden">
                            <seat-map />
                        </div>
                    </div>

                    <div class="flex flex-wrap overflow-hidden" v-if="tabs.userInfo">
                        <div class="w-1/2 overflow-hidden pr-3">
                            <div class="trip__userInfo">
                                <h3>Thông tin khách hàng</h3>
                                <div class="trip__userInfo__input">
                                    <label for="">Tên khách hàng <span class="text-red-500">*</span></label>
                                    <input type="text" :value="ticketInfo.userName" @keyup="$store.commit('trip/SET_TICKET_INFO', {userName: $event.target.value})">
                                </div>
                                <div class="trip__userInfo__input">
                                    <label for="">Số điện thoại <span class="text-red-500">*</span></label>
                                    <input type="number" :value="ticketInfo.userPhone" @keyup="$store.commit('trip/SET_TICKET_INFO', {userPhone: $event.target.value})">
                                </div>
                                <div class="trip__userInfo__input">
                                    <label for="">Email</label>
                                    <input type="text"  :value="ticketInfo.userEmail" @keyup="$store.commit('trip/SET_TICKET_INFO', {userEmail: $event.target.value})">
                                </div>
                                <div class="trip__userInfo__input">
                                    <label for="">Ghi chú</label>
                                    <textarea :value="ticketInfo.userNote" @keyup="$store.commit('trip/SET_TICKET_INFO', {userNote: $event.target.value})"></textarea>
                                </div>
                                <div class="trip__userInfo__input">
                                    <el-checkbox>Đồng ý với Điều khoản đặt vé của vetet.vn</el-checkbox>
                                </div>
                            </div>
                        </div>
                        <div class="w-1/2 overflow-hidden pl-3 pr-3">
                            <div class="trip__policy">
                                <h3>Điều khoản & Lưu ý</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                            </div>
                        </div>
                    </div>

                    <div class="payment" v-if="tabs.payment">
                        <div class="payment__header">
                            <h3>Thanh toán</h3>
                            <span>Thời gian giữ chỗ còn lại: 19:59</span>
                        </div>
                        <p>Vui lòng chọn một trong các phương thức thanh toán dưới đây</p>

                        <div class="payment__type">
                            <el-radio-group :value="ticketInfo.paymentType">
                                <el-radio label="vnpay" @change="$store.commit('trip/SET_TICKET_INFO', {paymentType: 'vnpay'})">VNPAY</el-radio>
                                <el-radio label="vnpayqr" @change="$store.commit('trip/SET_TICKET_INFO', {paymentType: 'vnpayqr'})">VNPAY QR</el-radio>
                            </el-radio-group>
                        </div>
                    </div>


                    <div class="tripDetail__price">
                        <div class="tripDetail__price__content">
                            <div>
                                <h4><b>Ghế đã chọn:</b> <span v-for="(seat, key) in seatSelected" :key="key">{{ seat.seatId }}</span></h4>
                                <h4><b>Tổng tiền:</b> <span>0đ</span></h4>
                            </div>
                            <div v-if="tabs.seatMap">
                                <button :class="{'disabled': ticketInfo.seatSelected.length == 0}" @click="switchTab('userInfo')">Tiếp tục</button> 
                            </div>
                            <div v-if="tabs.userInfo">
                                <button class="switchBack" @click="switchTab('seatMap')">Quay lại</button>
                                <button :class='{"disabled": validatePayment}' @click="switchTab('payment')">Tiếp tục</button> 
                            </div>
                            <div v-if="tabs.payment">
                                <button class="switchBack" @click="switchTab('userInfo')">Quay lại</button>
                                <button @click="doPayment()">Tiến hành thanh toán</button> 
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    </div>
</div>
</template>

<script>
import SeatMap from '../../components/Trip/SeatMap'
import TripInfo from '../../components/Trip/TripInfo'
import icons from '../../components/icon'
import { mapState } from 'vuex'
import dummy from '../../ulti/dummy'

export default {
    head: {
        title: "Vé xe tết chuyến Sài Gòn Hà Nội"
    },

    async asyncData({ query, store, $http, $helper }) {
        const tripId = query.tripId
        if(!store.state.trip.tripSelected) {
            $http.setHeader('DOBODY6969', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2IjowLCJkIjp7InVpZCI6IkFETTExMDk3Nzg4NTI0MTQ2MjIiLCJmdWxsTmFtZSI6IkFkbWluIHdlYiIsImF2YXRhciI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9kb2JvZHktZ29ub3cuYXBwc3BvdC5jb20vZGVmYXVsdC9pbWdwc2hfZnVsbHNpemUucG5nIn0sImlhdCI6MTQ5MjQ5MjA3NX0.PLipjLQLBZ-vfIWOFw1QAcGLPAXxAjpy4pRTPUozBpw')
            let res = await $http.get(`https://ticket-new-dot-dobody-anvui.appspot.com/trip/view?id=${tripId}`)
            let trip = await res.json()
            trip = trip.results.trip
            
            store.commit('trip/SET_TRIP_SELECTED', trip)
        }
    },

    components: {
        "seat-map": SeatMap,
        "trip-info": TripInfo,
        SeatMap
    },

    data () {
        return {
            icons: icons,
            loading: false,
            tabs: {
                seatMap: true,
                userInfo: false,
                payment: false
            },
        }
    },

    destroyed () {
        this.$store.commit('trip/SET_DEFAULT_TICKET_INFO')
    },

    computed: {
        ...mapState({
            seatSelected: state => state.trip.ticketInfo.seatSelected,
            ticketInfo: state => state.trip.ticketInfo,
            tripSelected: state => state.trip.tripSelected
        }),

        validatePayment () {
            return this.ticketInfo.userName == null || this.ticketInfo.userName == "" || this.ticketInfo.userPhone == null || this.ticketInfo.userPhone == "" 
        }
    },

    methods: {
        switchTab (tab) {
            this.tabs.seatMap = false
            this.tabs.userInfo = false
            this.tabs.payment = false

            this.tabs[tab] = true
        },

        async doPayment () {
            let body = {
                'tripId': this.tripSelected.tripId,
                'platform': 2,
                'informationsBySeats': []
            }

            body.informationsBySeats = this.ticketInfo.seatSelected.map(value => {
                return {
                    'seatId': value.seatId,
                    'isAdult': true,
                    'fullName': this.ticketInfo.userName,
                    'phoneNumber': this.ticketInfo.userPhone,
                    'note': this.ticketInfo.userNote,
                    'sendSMS': false,
                    'paymentType': 1,
                    'promotionCode' : null,
                    'agencyPrice': 40000,
                    'paidMoney': 0,
                    'pointUp': {
                        'id': this.ticketInfo.pointUp.id,
                        'name': this.ticketInfo.pointUp.name,
                        'address': null,
                        'province':  this.ticketInfo.pointUp.province,
                        'transshipmentId': null,
                        'district': this.ticketInfo.pointUp.district,
                        'longitude': this.ticketInfo.pointUp.longitude,
                        'latitude': this.ticketInfo.pointUp.latitude,
                        'transshipmentPrice': 0,
                        'completedTransshipment': false
                    },
                    'pointDown': {
                        'id': this.ticketInfo.pointDown.id,
                        'name': this.ticketInfo.pointDown.name,
                        'address': null,
                        'province':  this.ticketInfo.pointDown.province,
                        'transshipmentId': null,
                        'district': this.ticketInfo.pointDown.district,
                        'longitude': this.ticketInfo.pointDown.longitude,
                        'latitude': this.ticketInfo.pointDown.latitude,
                        'transshipmentPrice': 0,
                        'completedTransshipment': false
                    }
                }
            });
            this.loading = true
            this.$http.setHeader('DOBODY6969', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2IjowLCJkIjp7InVpZCI6IkFETTExMDk3Nzg4NTI0MTQ2MjIiLCJmdWxsTmFtZSI6IkFkbWluIHdlYiIsImF2YXRhciI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9kb2JvZHktZ29ub3cuYXBwc3BvdC5jb20vZGVmYXVsdC9pbWdwc2hfZnVsbHNpemUucG5nIn0sImlhdCI6MTQ5MjQ5MjA3NX0.PLipjLQLBZ-vfIWOFw1QAcGLPAXxAjpy4pRTPUozBpw')
            try {
                let res = await this.$http.post('https://ticket-new-dot-dobody-anvui.appspot.com/ticket/book',body)

                let tickets = await res.json()
                tickets = tickets.results.listTicket
                console.log(tickets)
                
                if(this.ticketInfo.paymentType == 'vnpay') {
                    const ticketIds = tickets.map(value => {
                        return value.ticketId
                    })
                    let res = await this.$http.get(`https://ticket-new-dot-dobody-anvui.appspot.com/vnp/pay?vnp_OrderInfo=${ticketIds}&packageName=web&bankcode=VIETCOMBANK&companyId=TC08Z1qHHZBxlNLt`)
                    let vnpayPaymentInfo = await res.json()
                    this.loading = false
                    
                    this.$notify.success({
                        message: 'Đặt vé thành công !'
                    })

                    this.$store.commit('trip/SET_DEFAULT_TICKET_INFO')
                    console.log(vnpayPaymentInfo)
                    window.open(vnpayPaymentInfo.results.data.paymentUrl, '_blank');
                }

            } catch (e) {
                this.loading = false
                this.$notify.error({
                    title: 'Oop !',
                    message: 'Có lỗi trong quá trình tạo vé! Rất xin lỗi quý khách vì sự bất tiện.'
                })
                console.log(e)
            }
            
        }
    }
}
</script>

<style>
.payment__type .el-radio-group span.el-radio__inner {
    width: 21px;
    height: 21px;
    border: 2px solid #FF4868;
    background-color: #fff;
}

.payment__type .el-radio__input.is-checked .el-radio__inner::after{
    background-color: #FF4868;
    width: 9px;
    height: 9px;
    left: calc(50% - 1px);
    top: calc(50% - 1px);
}

.payment__type .el-radio.is-checked .el-radio__label,
.payment__type .el-radio .el-radio__label {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #383F47;
}

.seatMap__note h4 b svg {
    width: 18px!important;
    height: 21px!important;
}

.seatItem__selected svg [fill="#383F47"]{
    fill: #FF4868
}

.seatItem__booked svg [fill="#383F47"]{
    fill: #ECEDF1
}

</style>
<style scoped>
.tripDetail button.disabled {
    background: #ECEDF1!important;
    color: #B0B5C1!important;
    pointer-events: none;
}

.payment__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
}

.payment__header h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    color: #383F47;
}

.payment__header span {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    text-align: right;
    color: #FF4868;
}

.payment>p {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #646D84;
    margin-bottom: 24px;
}

.payment__type .el-radio-group>label{
    display: block;
    margin-bottom: 16px;
}

.tripDetail {
    padding-top: 24px;
    padding-bottom: 80px;
}
.tripDetail__content {
    background: #FFFFFF;
    /* shadow/background */

    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
    border-radius: 4px 4px 0px 0px;

}
.seatMap__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
}

.seatMap__header h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    color: #383F47;
}

.seatMap__note {
    display: flex;
}

.seatMap__note h4 {
    display: flex;
    align-items: center;
    margin-left: 19px;
}

.seatMap__note h4 b {
    margin-right: 11px;
}

.seatMap__note h4 span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #383F47;
}

.seatMap__wrap {
    padding: 24px;
    background: #FFFFFF;
    /* box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08); */
    /* border-radius: 4px 4px 0px 0px; */
}
.tripDetail__price {
    margin-top: 16px;
    padding: 16px 0px;
    background: #FFFFFF;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
    border-radius: 0px 0px 4px 4px;

}


.tripDetail__price__content {
    padding-left: 20px;
    padding-right: 20px;
    border-left: 4px solid #FF4868;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.tripDetail__price__content button {
    background: #FF4868;
    border-radius: 4px;
    padding: 9px 24px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #FFFFFF;
    margin-left: 8px;
}


.tripDetail__price .switchBack {
    background: #FFFFFF;
    border: 2px solid #9399A9;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 9px 24px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #646D84;
}

.tripDetail__price h4 b{
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #9399A9;
    margin-right: 16px;
}

.tripDetail__price h4 span {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #383F47;
    margin-right: 8px;
}

.tripDetail__price h4 span::after {
    content: ",";
}
.tripDetail__price h4 span:last-child::after {
    content: "";
}

.trip__userInfo {
    padding: 24px;
    background: #FFFFFF;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
    border-radius: 4px 4px 0px 0px;
}

.trip__userInfo h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    color: #383F47;
    margin-bottom: 24px;
}

.trip__userInfo__input label{
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #646D84;
    margin-bottom: 8px;
    display: block;
}

.trip__userInfo__input {
    margin-bottom: 16px;
}

.trip__userInfo__input .el-checkbox .el-checkbox__label{
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #383F47;
}
.trip__userInfo__input textarea,
.trip__userInfo__input input[type="text"],
.trip__userInfo__input input[type="number"] {
    height: 40px;
    padding: 11px 10px;
    width: 100%;
    background: #F9FAFC;
    border: 1px solid #ECEDF1;
    box-sizing: border-box;
    border-radius: 4px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #383F47;
}

.trip__userInfo__input textarea {
    height: 100px;
}

.trip__policy h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    color: #FF4868;
    margin-bottom: 8px;
}

.trip__policy p {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #646D84;
}
</style>