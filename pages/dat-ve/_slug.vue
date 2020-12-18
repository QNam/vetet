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

                        <div class="flex flex-wrap" v-if="tabs.userInfo"  style="box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);">
                            <div class="w-1/2 pr-3">
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
                                        <el-checkbox :value="ticketInfo.agreePolicy" @change="$store.commit('trip/SET_TICKET_INFO', {agreePolicy: $event})">Đồng ý với <span>Điều khoản đặt vé</span> của vetet.vn</el-checkbox>
                                    </div>
                                </div>
                            </div>
                            <div class="w-1/2 pl-3 pr-3">
                                <div class="trip__policy">
                                    <h3>Điều khoản & Lưu ý</h3>
                                    <p>- Vui lòng xuất trình thông tin vé trước khi lên xe. Thông tin vé sẽ được gửi tới email và số điện thoại của Quý khách.</p>
                                </div>
                            </div>
                        </div>

                        <div class="payment" v-if="tabs.payment"  style="box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);">
                            <div class="payment__header">
                                <h3>Thanh toán</h3>
                                <span v-if="ticketInfo.bookingCompleted">Thời gian giữ chỗ còn lại: {{ticketInfo.overTime.minute }}:{{ ticketInfo.overTime.second }}</span>
                            </div>
                            <p>Vui lòng chọn một trong các phương thức thanh toán dưới đây</p>

                            <div class="payment__type">
                                <el-radio-group :value="ticketInfo.paymentType">
                                    <el-radio label="vnpay" @change="$store.commit('trip/SET_TICKET_INFO', {paymentType: 'vnpay'})">VNPAY</el-radio>
                                    <!-- <el-radio label="vnpayqr" @change="$store.commit('trip/SET_TICKET_INFO', {paymentType: 'vnpayqr'})">VNPAY QR</el-radio> -->
                                </el-radio-group>
                            </div>
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
                                    <button class="switchBack" @click="switchTab('userInfo')">Quay lại</button>
                                    <a :href="ticketInfo.vnPayUrl" target="_BLANK" class="block" v-if="ticketInfo.vnPayUrl">
                                        <button>Tiến hành thanh toán</button> 
                                    </a>
                                    <button v-else @click="doPayment()">Tiến hành thanh toán</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    </div>

    <!-- <el-dialog :visible.sync="modalVnpay" width="70%">
        <iframe src="https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop/" class="w-full" style="height: 500px" frameborder="0"></iframe>
    </el-dialog> -->

</div>
</template>

<script>
import SeatMap from '../../components/Trip/SeatMap'
import TripInfo from '../../components/Trip/TripInfo'
import icons from '../../components/icon'
import { mapState, mapActions } from 'vuex'
import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

export default {
    head: {
        title: "Đặt vé tết"
    },

    async asyncData({ query, store, $http, $helper }) {
        const tripId = query.tripId

        if(!store.state.trip.tripSelected) {
            $http.setHeader('DOBODY6969', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkIjp7InVpZCI6IkFETTBKWTF1Y3FkM0JZTWoxIiwiZnVsbE5hbWUiOiJBZG1pbiBWZSBUZXQifSwidiI6MCwiaWF0IjoxNjA1ODU4NDc5fQ.k5r8MbJZGNQSyNe42ZNa3cCoMblWXSUyLpHgNMkTXXY')
            let res = await $http.get(`https://ticket-new-dot-dobody-anvui.appspot.com/trip/view?id=${tripId}`)
            let trip = await res.json()
            trip =  $helper.tripDTO(trip.results.trip)
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
            modalVnpay: false,
            tripCollection: null,
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
            tripSelected: state => state.trip.tripSelected,
            pickAndDrop: state => state.trip.pickAndDrop
        }),

        validateUserInfo () {
            return this.ticketInfo.userName == null || this.ticketInfo.userName == "" || this.ticketInfo.userPhone == null || this.ticketInfo.userPhone == "" || this.ticketInfo.agreePolicy == false
        }
    },

    mounted () {
        this.initConfigFireBase()
    },

    methods: {
        ...mapActions ({
            'calcPrice': 'trip/calcPrice'
        }),

        initConfigFireBase () {
            const config = {
                apiKey: "AIzaSyBWI3rqm3ZqMQHBxFJxG_ma7Vm8h3CFeP4",
                authDomain: "anvui-firestore.firebaseapp.com",
                databaseURL: "https://anvui-firestore.firebaseio.com",
                projectId: "anvui-firestore",
                storageBucket: "anvui-firestore.appspot.com",
                messagingSenderId: "978123247240",
                appId: "1:978123247240:web:957b7e55b784e9d1d6593d"
            }

            if (!firebase.apps.length) {
                firebase.initializeApp(config)
            }
            let firestore = firebase.firestore()
            if(!firebase.auth.currentUser){
                firebase.auth().signInWithEmailAndPassword('quocnam@anvui.vn', 'nam@anvui@1')
                .then((firebaseUser) => {
                    console.log('connected realtime firebase');
                    this.tripCollection = firestore.collection(`trip`)
                    // this.tripCollection.doc(`${this.tripSelected.tripId}`).collection('ticketsInfo').doc('TK0Jz1unYZNq16n2').onSnapshot(function(doc) {
                    //     var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                    //     console.log(source, " data: ", doc.data());
                    // });
                })
                .catch(function (error) {
                    console.log(error)
                    console.log('connect firebase error');
                });
            } else {
                this.tripCollection = firestore.collection('trip')
            }
        },

        countDown (time) {
            setInterval(() => {
                if (time == 0) return 
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
                }
            }, 1000);

        },

        switchTab (tab) {
            this.tabs.seatMap = false
            this.tabs.userInfo = false
            this.tabs.payment = false

            this.tabs[tab] = true
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

        listenTicketBooked (ticketId) {
            if(this.tripCollection) {
                this.tripCollection.doc(`${this.tripSelected.tripId}`).collection('ticketsInfo').doc(ticketId).onSnapshot((doc) => {
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