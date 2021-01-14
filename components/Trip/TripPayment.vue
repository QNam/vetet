<template>
<div>
    <div class="payment__header">
        <h3>Thanh toán</h3>
        <span v-if="ticketInfo.bookingCompleted">Thời gian giữ chỗ còn lại: {{ticketInfo.overTime.minute }}:{{ ticketInfo.overTime.second }}</span>
    </div>
    <p>Vui lòng chọn một trong các phương thức thanh toán dưới đây</p>

    <div class="payment__type mt-6">
        <el-radio-group :value="ticketInfo.paymentType">
            <el-radio label="vnpay" @change="$store.commit('trip/SET_TICKET_INFO', {paymentType: 'vnpay'})">VNPAY</el-radio>
            <el-radio label="vnpayqr" @change="$store.commit('trip/SET_TICKET_INFO', {paymentType: 'vnpayqr'})">VNPAY QR</el-radio>
            <!-- <el-radio label="vnpayqr" @change="$store.commit('trip/SET_TICKET_INFO', {paymentType: 'vnpayqr'})">VNPAY QR</el-radio> -->
        </el-radio-group>
    </div>

    <div v-if="ticketInfo.vnpayQRImg" class="mt-3 payment__qrcode">
        <img :src="ticketInfo.vnpayQRImg" alt="">
    </div>
    <p class="mt-2"><i>* Quý khách hãy dùng App Ngân hàng để quét mã QR code này để hoàn thành thanh toán</i></p>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            ticketInfo: state => state.trip.ticketInfo,
        }),
    },
}
</script>

<style>

</style>