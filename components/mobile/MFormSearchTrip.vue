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
            :picker-options="datePickerOptions"
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
            filterTripHistory: {},
            datePickerOptions: {
                disabledDate (date) {
                    let today = new Date()
                    let yesterday = new Date()
                    let tomorrow = new Date()
                    yesterday.setDate( today.getDate() - 1 ) 
                    tomorrow.setDate( today.getDate() + 1 ) 
                    return date < today
                }
            },
        }
    },

    computed: {
        ...mapState({
        filterTrip: state => state.trip.filterTrip
        })
    },

    mounted () {
        const dateObj = new Date()
        const date = dateObj.getDate() + 1 < 10 ? "0" + (dateObj.getDate() - -1) : "" + (dateObj.getDate() - -1)
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
            let query = {
                pointUp: this.filterTrip.pointUp,
                pointDown: this.filterTrip.pointDown,
                date: this.filterTrip.date,
            }

            this.$router.push({path: "/tim-ve", query}) 
        }
    }
}
</script>

<style>

</style>

<style scoped>
.mr-12px {
    margin-right: 12px;
}
</style>