<template>
  <div class="mformSearTrip">
    <div class="msearchTrip__input">
        <span class="block searchTrip__icon cursor-pointer mr-12px" v-html="icons.bus"></span>
        <el-select ref="pointUp" 
            :value="filterTrip.pointUp" 
            @change="$store.commit('trip/SET_FILTER_TRIP', {pointUp: $event});" 
            filterable placeholder="Nơi đi">
            <el-option
            v-for="province in provinces"
            :key="province.id"
            :label="province.provinceName"
            :value="province.provinceName">
            </el-option>
        </el-select>
    </div>

    <div class="msearchTrip__input contents-betwwen">
        <span class="block searchTrip__icon cursor-pointer mr-12px" v-html="icons.location"></span>
        <el-select ref="pointDown" 
            :value="filterTrip.pointDown" 
            @change="$store.commit('trip/SET_FILTER_TRIP', {pointDown: $event})" 
            filterable placeholder="Nơi đi">
            <el-option
            v-for="province in provinces"
            :key="province.id"
            :label="province.provinceName"
            :value="province.provinceName">
            </el-option>
        </el-select>
        <span class="block searchTrip__icon ml-20px cursor-pointer" @click="switchPoint" v-html="icons.switch"></span>
    </div>

    <div class="msearchTrip__input">
        <span class="block searchTrip__icon cursor-pointer mr-12px" v-html="icons.calendar"></span>
        <el-date-picker
            ref="date"
            :value="filterTrip.date" 
            @input="$store.commit('trip/SET_FILTER_TRIP', {date: $event})"
            type="date"
            format="dd-MM-yyyy"
            value-format="yyyyMMdd"
            placeholder="Chọn ngày">
        </el-date-picker>
    </div>
    <div class="msearchTrip__submit">
        <button @click="setFilterTrip">VỀ NHÀ ĂN TẾT!</button>
    </div>
    </div>
</template>

<script>
import icons from '../icon.js'
import provinces from '../province.js'
import { mapState } from 'vuex'

export default {
    data () {
        return {
            icons,
            provinces,
            filterTripHistory: {}
        }
    },

    computed: {
        ...mapState({
        filterTrip: state => state.trip.filterTrip
        })
    },

    mounted () {
        const dateObj = new Date()
        const date = dateObj.getDate() < 10 ? "0" + dateObj.getDate() : "" + dateObj.getDate()
        const month = (dateObj.getMonth() + 1) < 10 ? "0" + (dateObj.getMonth() + 1) : "" + (dateObj.getMonth() + 1)

        this.$store.commit('trip/SET_FILTER_TRIP', {date: `${dateObj.getFullYear()}${month}${date}`})

        try {
        const pointUpHistory = localStorage.getItem("filterTrip.pointUp")
        const pointDownHistory = localStorage.getItem("filterTrip.pointDown")

        // console.log(filterTripHistory)
        if(!this.filterTrip.pointUp && pointUpHistory) {
            this.$store.commit('trip/SET_FILTER_TRIP', {pointUp: pointUpHistory})
        }
        if(!this.filterTrip.pointDown && pointDownHistory) {
            this.$store.commit('trip/SET_FILTER_TRIP', {pointDown: pointDownHistory})
        }

        this.filterTripHistory.pointUp = pointUpHistory
        this.filterTripHistory.pointDown = pointDownHistory

        } catch (error) {
        }
    },
    methods: {
        switchPoint () {
        let pointUp = this.filterTrip.pointUp
        let pointDown = this.filterTrip.pointDown

        this.$store.commit('trip/SET_FILTER_TRIP', {pointDown: pointUp})
        this.$store.commit('trip/SET_FILTER_TRIP', {pointUp: pointDown})
        },

        validate () {
        if(!this.filterTrip.pointUp) {
            this.$notify.warning({
            message: 'Vui lòng chọn điểm lên !'
            })

            return false
        }

        if(!this.filterTrip.pointDown) {
            this.$notify.warning({
            message: 'Vui lòng chọn điểm xuống !'
            })

            return false
        }

        return true
        },

        setFilterTrip () {

        if(!this.validate()) return 
        this.$router.push({path: "/tim-ve", query: this.filterTrip})
        }
    }
}
</script>

<style>
.msearchTrip__input .el-select {
    width: 100%!important;
}

.msearchTrip__input {
    padding: 15px 20px;
    background: #FFFFFF;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    display: flex;
    align-items: center;
    height: 48px;
    margin-bottom: 8px;
}
.msearchTrip__input .el-date-editor,
.msearchTrip__input .el-input .el-input__inner,
.msearchTrip__input .el-input.is-focus .el-input__inner {
    border-color: transparent;
}

.msearchTrip__input .el-icon-date,
.msearchTrip__input .el-select__caret {
    display: none;
}

.msearchTrip__input .el-input input{
    padding-left: 0px;
}
.msearchTrip__submit {
    margin-top: 16px;
}
.msearchTrip__submit button {
    background: #FF4868;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    height: 56px;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #FFFFFF;
    width: 100%;
    padding: 0px 16px;
}
</style>

<style scoped>
.mr-12px {
    margin-right: 12px;
}
</style>