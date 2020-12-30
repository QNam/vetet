<template>
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