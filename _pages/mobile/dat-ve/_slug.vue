<template>
    <div class="mtripDetail" v-loading="loading">
        <trip-info class="mb-2" />

        <div class="mticket__main">
            <div class="mseatMap__wrap" v-if="tabs.seatMap">
                <div class="seatMap__header flex-col items-start">
                    <h3 class="mb-4">Chọn ghế</h3>
                    <div class="seatMap__note">
                        <h4 class="ml-0">
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
                <seat-map />
            </div>

            <div class="muserInfo__wrap" v-if="tabs.userInfo">
                <div class="muserInfo__form">
                    <trip-user-info />
                </div>
                <div class="muserInfo__note">
                    <trip-policy/>
                </div>
            </div>

            <div class="mTrip__payment"  v-if="tabs.payment"  style="box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);">
                <trip-payment />
            </div>
        </div>
        <div class="mtrip__price" :class="{'z-0': loading, 'min-h-0': timeBookingOut}">
            <div class="mtrip__price__content">
                <h4><b>Ghế đã chọn: </b> <span v-for="(seat, key) in seatSelected" :key="key">{{ seat.seatId }}</span></h4>
                <h4><b>Tổng tiền: </b> 
                    <span v-if="!ticketInfo.loadingCalcPrice">{{  ticketInfo.totalPrice | number }}đ</span>
                    <span v-else><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></span>
                </h4>
            </div>
            <div class="mtrip__price__action">
                <div v-if="tabs.seatMap">
                    <button class="w-full ml-0" :class="{'disabled': ticketInfo.seatSelected.length == 0}" @click="switchTab('userInfo')">Tiếp tục</button> 
                </div>
                <div v-if="tabs.userInfo" class="flex">
                    <button class="switchBack flex-grow ml-0" @click="switchTab('seatMap')">Quay lại</button>
                    <button class="flex-grow" :class='{"disabled": validateUserInfo}' @click="switchTab('payment')">Tiếp tục</button> 
                </div>
                <div v-if="tabs.payment && !timeBookingOut" class="flex">
                    <template v-if="ticketInfo.vnPayUrl"> 
                        <a :href="ticketInfo.vnPayUrl" target="_BLANK" class="block w-full  ml-0"><button class="w-full ml-0">Tiến hành thanh toán</button></a>
                    </template>
                    <template v-else> 
                        <button class="switchBack flex-grow ml-0" @click="switchTab('userInfo')">Quay lại</button>
                        <button class=" flex-grow" @click="doPayment()">Tiến hành thanh toán</button>
                    </template>
                </div>
            </div>
            <!-- <div class="tripDetail__price__content">
                <div>
                    <h4><b>Ghế đã chọn:</b> <span v-for="(seat, key) in seatSelected" :key="key">{{ seat.seatId }}</span></h4>
                    <h4><b>Tổng tiền:</b> <span>{{ ticketInfo.totalPrice | number }}đ</span></h4>
                </div>
                <div v-if="tabs.seatMap">
                    <button :class="{'disabled': ticketInfo.seatSelected.length == 0}" @click="switchTab('userInfo')">Tiếp tục</button> 
                </div>
                <div v-if="tabs.userInfo">
                    <button class="switchBack" @click="switchTab('seatMap')">Quay lại</button>
                    <button :class='{"disabled": validateUserInfo}' @click="switchTab('payment')">Tiếp tục</button> 
                </div>
                <div v-if="tabs.payment" class="flex">
                    <template v-if="ticketInfo.vnPayUrl"> 
                        <a :href="ticketInfo.vnPayUrl" target="_BLANK" class="block"><button>Tiến hành thanh toán</button></a>
                    </template>
                    <template v-else> 
                        <button class="switchBack" @click="switchTab('userInfo')">Quay lại</button>
                        <button @click="doPayment()">Tiến hành thanh toán</button>
                    </template>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import SeatMap from '../../../components/Trip/SeatMap'
import TripInfo from '../../../components/Trip/TripInfo'
import TripUserInfo from '../../../components/Trip/TripUserInfo'
import TripPolicy from '../../../components/Trip/TripPolicy'
import TripPayment from '../../../components/Trip/TripPayment'
import icons from '../../../components/icon'
import enums from '../../../ulti/enum'
import { mapState, mapActions } from 'vuex'

export default {
    props: ['tripCollectionFS'],
    components: {
        "seat-map": SeatMap,
        "trip-info": TripInfo,
        'trip-user-info': TripUserInfo,
        'trip-policy' : TripPolicy,
        'trip-payment': TripPayment,
        SeatMap
    },

    data () {
        return {
            icons: icons,
            transportType: enums.transportType,
            loading: false,
            timeBookingOut: false,
            tabs: {
                seatMap: true,
                userInfo: false,
                payment: false
            },
        }
    },

    computed: {
        ...mapState({
            seatSelected: state => state.trip.ticketInfo.seatSelected,
            ticketInfo: state => state.trip.ticketInfo,
            tripSelected: state => state.trip.tripSelected,
            pickAndDrop: state => state.trip.pickAndDrop
        }),

        validateUserInfo () {
            return this.ticketInfo.userName == null || this.ticketInfo.userName == "" || this.ticketInfo.userPhone == null || this.ticketInfo.userPhone == "" || this.ticketInfo.agreePolicy == false
        }
    },

    methods: {
        ...mapActions ({
            'calcPrice': 'trip/calcPrice'
        }),

        switchTab (tab) {
            this.tabs.seatMap = false
            this.tabs.userInfo = false
            this.tabs.payment = false

            this.tabs[tab] = true
        },

        countDown (time) {
            setInterval(() => {
                if(time >= 1000) {
                    let minute = Math.floor(time / 60000)
                    minute = minute > 9 ? minute.toString() : '0' + minute

                    let second = Math.floor( ((time / 60000) - minute ) * 60 )
                    second = second > 9 ? second.toString() : '0' + second

                    this.$store.commit('trip/SET_TICKET_INFO', { overTime: {
                        minute,
                        second,
                        mns: time
                    }})
                    time = time - 1000
                } else {
                    this.$store.commit('trip/SET_TICKET_INFO', { overTime: {
                        minute: '00',
                        second: '00',
                        mns: 0
                    }})
                    this.timeBookingOut = true
                    clearInterval()
                    return
                }
            }, 1000);
        },

        listenTicketBooked (ticketId) {
            if(this.tripCollectionFS) {
                this.tripCollectionFS.doc(`${this.tripSelected.tripId}`).collection('ticketsInfo').doc(ticketId).onSnapshot((doc) => {
                    let ticket = doc.data()
                    if ( ticket.paidMoney == ticket.agencyPrice ) {
                        let query = {
                            phoneNumber: ticket.phoneNumber, 
                            ticketCode: ticket.ticketCode
                        } 

                        this.$router.push({path: "/thanh-toan-thanh-cong", query })
                    }
                });
            }
        },

        validatePayment () {
            if( this.seatSelected.length == 0 ) {
                this.$notify.warning({
                    message: 'Vui lòng chọn ít nhất 1 ghế !'
                })

                return false
            }

            if(this.pickAndDrop.pointUp != this.transportType.STATION) {
                if( !this.ticketInfo.pointUpAddress || 
                (this.ticketInfo.pointUpAddress && this.ticketInfo.pointUpAddress.trim() == "") ) {
                    this.$notify.warning({
                        message: 'Vui  lòng nhập địa chỉ điểm lên !'
                    })

                    return false
                }
            } else {
                if( this.ticketInfo.pointUp == "" || this.ticketInfo.pointUp == null ) {
                    this.$notify.warning({
                        message: 'Vui lòng chọn điểm lên !'
                    })

                    return false
                }
            }

            if(this.pickAndDrop.pointDown != this.transportType.STATION) {
                 if( !this.ticketInfo.pointDownAddress || 
                    (this.ticketInfo.pointDownAddress && this.ticketInfo.pointDownAddress.trim() == "") ) {
                    this.$notify.warning({
                        message: 'Vui  lòng nhập địa chỉ điểm xuống !'
                    })

                    return false
                }
            } else {
                if( this.ticketInfo.pointDown == "" || this.ticketInfo.pointDown == null  ) {
                    this.$notify.warning({
                        message: 'Vui lòng chọn điểm xuống !'
                    })

                    return false
                }
            }

            if( this.ticketInfo.userName == "" ) {
                this.$notify.warning({
                    message: 'Vui lòng nhập họ tên !'
                })

                return false
            }

            if( this.ticketInfo.userPhone == "" ) {
                this.$notify.warning({
                    message: 'Vui lòng nhập số điện thoại !'
                })

                return false
            }

            if( !this.ticketInfo.agreePolicy ) {
                this.$notify.warning({
                    message: 'Vui lòng đồng ý với Điều khoản đặt vé của vetet.vn !'
                })

                return false
            }

            return true
        },

        async doPayment () {
            if(!this.validatePayment()) {
                return
            }

            const ticketOverTime = (new Date()).getTime() + 480000
            let body = {
                'tripId': this.tripSelected.tripId,
                'platform': 1,
                'overTime': ticketOverTime,
                'informationsBySeats': []
            }

            let PUtransshipmentId = null
            let PUtransshipmentPrice = 0
            
            if(this.ticketInfo.pointUp) {
                if ( this.pickAndDrop.pointUp == this.transportType.STATION 
                && typeof this.ticketInfo.pointUp.listTransshipmentPoint == 'undefined' ) {
                    PUtransshipmentId = this.ticketInfo.pointUp.id
                    PUtransshipmentPrice = this.ticketInfo.pointUp.transshipmentPrice
                }
            }

            let PDtransshipmentId = null
            let PDtransshipmentPrice = 0
            if(this.ticketInfo.pointDown) {
                if ( this.pickAndDrop.pointDown == this.transportType.STATION 
                && typeof this.ticketInfo.pointDown.listTransshipmentPoint == 'undefined' ) {
                    PDtransshipmentId = this.ticketInfo.pointDown.id
                    PDtransshipmentPrice = this.ticketInfo.pointDown.transshipmentPrice
                }
            }

            body.informationsBySeats = this.ticketInfo.seatSelected.map(value => {
                return {
                    'seatId': value.seatId,
                    'isAdult': true,
                    'fullName': this.ticketInfo.userName,
                    'phoneNumber': this.ticketInfo.userPhone,
                    'email': this.ticketInfo.userEmail,
                    'note': this.ticketInfo.userNote,
                    'sendSMS': false,
                    'paymentType': 1,
                    'promotionCode' : null,
                    'agencyPrice': 40000,
                    'paidMoney': 0,
                    'pointUp': {
                        'id': this.tripSelected.pointUp.id,
                        'name': this.tripSelected.pointUp.name,
                        'address': this.pickAndDrop.pointUp == 2 ? this.ticketInfo.pointUpAddress  : null,
                        'province':  this.tripSelected.pointUp.province,
                        'transshipmentId': PUtransshipmentId,
                        'district': this.tripSelected.pointUp.district,
                        'longitude': this.tripSelected.pointUp.longitude,
                        'latitude': this.tripSelected.pointUp.latitude,
                        'transshipmentPrice': PUtransshipmentPrice,
                        'completedTransshipment': false,
                        'pointType': this.pickAndDrop.pointUp
                    },
                    'pointDown': {
                        'id': this.tripSelected.pointDown.id,
                        'name': this.tripSelected.pointDown.name,
                        'address': this.pickAndDrop.pointDown == 2 ? this.ticketInfo.pointDownAddress  : null,
                        'province':  this.tripSelected.pointDown.province,
                        'transshipmentId': PDtransshipmentId,
                        'district': this.tripSelected.pointDown.district,
                        'longitude': this.tripSelected.pointDown.longitude,
                        'latitude': this.tripSelected.pointDown.latitude,
                        'transshipmentPrice': PDtransshipmentPrice,
                        'completedTransshipment': false,
                        'pointType': this.pickAndDrop.pointDown
                    }
                }
            });

            this.loading = true
            this.$http.setHeader('DOBODY6969', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkIjp7InVpZCI6IkFETTBKWTF1Y3FkM0JZTWoxIiwiZnVsbE5hbWUiOiJBZG1pbiBWZSBUZXQifSwidiI6MCwiaWF0IjoxNjA1ODU4NDc5fQ.k5r8MbJZGNQSyNe42ZNa3cCoMblWXSUyLpHgNMkTXXY')
            try {
                let res = await this.$http.post('https://ticket-new-dot-dobody-anvui.appspot.com/ticket/book',body)

                let tickets = await res.json()
                tickets = tickets.results.listTicket
                const ticketIds = tickets.map(value => {
                    return value.ticketId
                })
                this.countDown(8 * 60000)

                if(this.ticketInfo.paymentType == 'vnpay') {
                    let res = await this.$http.get(`https://ticket-dot-dobody-anvui.appspot.com/vnp/pay?vnp_OrderInfo=${ticketIds.join('-')}&packageName=web&companyId=TC08Z1qHHZBxlNLt`)
                    let vnpayPaymentInfo = await res.json()
                    this.loading = false
                    
                    this.$notify.success({
                        message: 'Đặt vé thành công !'
                    })

                    this.$store.commit('trip/SET_TICKET_INFO', {bookingCompleted: true})
                    this.$store.commit('trip/SET_TICKET_INFO', {vnPayUrl: vnpayPaymentInfo.results.data.paymentUrl})
                    // this.$store.commit('trip/SET_DEFAULT_TICKET_INFO')
                    window.open(vnpayPaymentInfo.results.data.paymentUrl, '_blank');

                    this.listenTicketBooked(ticketIds[0])
                }

                if(this.ticketInfo.paymentType == 'vnpayqr') {
                    let qrParams = {
                        'companyId': tickets[0]['company']['id'],
                        'ticketIds': ticketIds
                    }

                    let qrImage = await this.genQRCode(qrParams);
                    this.loading = false
                    this.$store.commit('trip/SET_TICKET_INFO', {bookingCompleted: true})
                    this.$store.commit('trip/SET_TICKET_INFO', {vnpayQRImg: qrImage})
                    this.listenTicketBooked(ticketIds[0])
                }

            } catch (e) {
                this.loading = false
                this.$notify.error({
                    title: 'Oop !',
                    message: 'Có lỗi trong quá trình tạo vé! Rất xin lỗi quý khách vì sự bất tiện.'
                })
                console.log(e)
            }
            
        },

        async genQRCode (params) {
            let body = {
                'companyId': 'TC08Z1qHHZBxlNLt',
                'packageName': 'web',
                'ticketIds': params['ticketIds'].join('-'),
            }

            const url = 'https://ticket-dot-dobody-anvui.appspot.com/vnpay/qr/pay';
            let res = await this.$http.post(url, body)
            let payment = await res.json()

            return `https://chart.googleapis.com/chart?cht=qr&chl=${payment.results.data.qrString}&choe=UTF-8&chs=250x250`
        }
    }
}
</script>

<style>
.mTrip__payment .payment__qrcode img{
    /* text-align: center; */
    margin: 0 auto;
}
.payment__banner {
    display: none;
}
.mTrip__payment .payment__banner {
    display: block;
}
</style>
<style scoped>
.mtrip__price {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 144px;
    background: #FFFFFF;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
    border-radius: 0px 0px 4px 4px;
    padding-bottom: 16px;
    padding-top: 16px;
    z-index: 2001;
}

.mtrip__price__action {
    padding: 0px 16px;
}
.mtrip__price__action button.disabled {
    background: #ECEDF1!important;
    color: #B0B5C1!important;
    pointer-events: none;
} 

.mtrip__price button {
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


.mtrip__price .switchBack {
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

.mtrip__price__content {
    border-left: 4px solid #FF4868;
    padding: 0px 16px;
    margin-bottom: 16px;
}

.mtrip__price__content h4 span::after {
  content: ",";
}
.mtrip__price__content h4 span:last-child::after {
  content: "";
}


.mtrip__price h4 {
    margin-bottom: 8px;
}

.mtrip__price h4 b {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #9399A9;
}

.mtrip__price h4 span {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #383F47;
}

.mticket__main {
    margin-bottom: 168px;
}
.mtripDetail {
    padding: 16px;
}

.mTrip__payment {
    background: #FFFFFF;
    padding: 16px;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
    border-radius: 4px 4px 0px 0px;

}

.mseatMap__wrap {
    background: #FFFFFF;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
    border-radius: 4px 4px 0px 0px;
    padding: 16px;
}

.muserInfo__note,
.muserInfo__form {
    background: #FFFFFF;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
    border-radius: 4px 4px 0px 0px;
    padding: 16px;
    margin-bottom: 8px;
}

.muserInfo__note {
    margin-bottom: 24px;
}
</style>