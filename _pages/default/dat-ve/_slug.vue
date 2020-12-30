<template>
    <div class="tripDetail" v-loading="loading">
        <div class="container mx-auto">
            <div class="flex flex-wrap mr--15px">
                <div class="w-1/3 px-15px">
                    <trip-info />
                </div>
                <div class="w-2/3 px-15px">
                    <div class="tripDetail__content">
                        <div class="seatMap__wrap" v-if="tabs.seatMap" style="box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);">
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
                            
                            <div class="flex flex-wrap">
                                <seat-map />
                            </div>
                        </div>

                        <div class="flex flex-wrap trip_userInfo__wrap" v-if="tabs.userInfo">
                            <div class="w-1/2" style="border-right: 1px solid #ECEDF1">
                                <div class="pr-6">
                                    <trip-user-info />
                                </div>
                            </div>
                            <div class="w-1/2 pl-6">
                                <trip-policy />
                            </div>
                        </div>

                        <div class="payment" v-if="tabs.payment"  style="box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);">
                            <trip-payment />
                        </div>

                        <div class="tripDetail__price"  style="box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);">
                            <div class="tripDetail__price__content">
                                <div>
                                    <h4><b>Ghế đã chọn:</b> <span v-for="(seat, key) in seatSelected" :key="key">{{ seat.seatId }}</span></h4>
                                    <h4><b>Tổng tiền:</b> <span>{{ ticketInfo.totalPrice | number }}đ</span></h4>
                                </div>
                                <div v-if="tabs.seatMap">
                                    <!-- <button class="switchBack" @click="$route.push(/)">Quay lại</button> -->
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            loading: false,
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
                let minute = Math.floor(time / 60000)
                minute = minute > 9 ? minute.toString() : '0' + minute

                let second = Math.floor( ((time / 60000) - minute ) * 60 )
                second = second > 9 ? second.toString() : '0' + second
                time = time - 1000

                this.$store.commit('trip/SET_TICKET_INFO', { overTime: {
                    minute,
                    second,
                    mns: time
                }})

                if(time == 0) {
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

            if( this.ticketInfo.pointUp == "" || this.ticketInfo.pointUp == null ) {
                this.$notify.warning({
                    message: 'Vui lòng chọn điểm lên !'
                })

                return false
            }

            if( this.ticketInfo.pointDown == "" || this.ticketInfo.pointDown == null  ) {
                this.$notify.warning({
                    message: 'Vui lòng chọn điểm xuống !'
                })

                return false
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
            if ( typeof this.ticketInfo.pointUp.listTransshipmentPoint == 'undefined' ) {
                PUtransshipmentId = this.ticketInfo.pointUp.id
                PUtransshipmentPrice = this.ticketInfo.pointUp.transshipmentPrice
            }

            let PDtransshipmentId = null
            let PDtransshipmentPrice = 0
            if ( typeof this.ticketInfo.pointDown.listTransshipmentPoint == 'undefined' ) {
                PDtransshipmentId = this.ticketInfo.pointDown.id
                PDtransshipmentPrice = this.ticketInfo.pointDown.transshipmentPrice
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
                        'completedTransshipment': false
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
                        'completedTransshipment': false
                    }
                }
            });

            this.loading = true
            this.$http.setHeader('DOBODY6969', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkIjp7InVpZCI6IkFETTBKWTF1Y3FkM0JZTWoxIiwiZnVsbE5hbWUiOiJBZG1pbiBWZSBUZXQifSwidiI6MCwiaWF0IjoxNjA1ODU4NDc5fQ.k5r8MbJZGNQSyNe42ZNa3cCoMblWXSUyLpHgNMkTXXY')
            try {
                let res = await this.$http.post('https://ticket-new-dot-dobody-anvui.appspot.com/ticket/book',body)

                let tickets = await res.json()
                tickets = tickets.results.listTicket
                
                this.countDown(480000)

                if(this.ticketInfo.paymentType == 'vnpay') {
                    const ticketIds = tickets.map(value => {
                        return value.ticketId
                    })
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

            } catch (e) {
                this.loading = false
                this.$notify.error({
                    title: 'Oop !',
                    message: 'Có lỗi trong quá trình tạo vé! Rất xin lỗi quý khách vì sự bất tiện.'
                })
                console.log(e)
            }
            
        },
    }

}
</script>

<style>

</style>