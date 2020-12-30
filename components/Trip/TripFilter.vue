<template>
    <div class="tripFilter">
        <div class="tripFilter__point">
            <h2>BỘ LỌC</h2>
            <div class="tripFilter__input flex items-center">
                <el-select :value="filterTrip.pointUp" 
                    @change="$store.commit('trip/SET_FILTER_TRIP', {pointUp: $event})" 
                    filterable placeholder="Điểm xuất phát">
                    <el-option
                        v-for="province in provinces"
                        :key="province.id"
                        :label="province.provinceName"
                        :value="province.provinceName">
                    </el-option>
                    </el-select>
                    <span v-html="icons.search"></span>
            </div>

            <div class="tripFilter__input flex items-center">
                <el-select :value="filterTrip.pointDown" 
                    @change="$store.commit('trip/SET_FILTER_TRIP', {pointDown: $event})"
                    filterable placeholder="Điểm đến">
                    <el-option
                        v-for="province in provinces"
                        :key="province.id"
                        :label="province.provinceName"
                        :value="province.provinceName">
                    </el-option>
                </el-select>
                <span v-html="icons.search"></span>
            </div>

            <div class="tripFilter__input flex items-center">
                <el-date-picker
                    ref="date"
                    :value="filterTrip.date"
                    :picker-options="datePickerOptions"
                    @input="$store.commit('trip/SET_FILTER_TRIP', {date: $event})"
                    type="date"
                    format="dd-MM-yyyy"
                    value-format="yyyyMMdd"
                    placeholder="Ngày khởi hành">
                </el-date-picker>
                <span v-html="icons.calendar"></span>
            </div>
        </div>

        <!-- <div class="tripFilter__time">
            <h2>Khởi hành</h2>
            <div>   
                <el-checkbox class="block">Trước 06:00</el-checkbox>
                <el-checkbox class="block">Từ 06:00 - 12:00</el-checkbox>
                <el-checkbox class="block">Từ 12:00 - 18:00</el-checkbox>
                <el-checkbox class="block">Sau 18:00</el-checkbox>
            </div>
        </div> -->

        <button class="tripFilter__search" @click="searchTrip">VỀ NHÀ ĂN TẾT!</button>
    </div>
</template>

<script>
import provinces from '../province.js'
import icons from '../icon'
import { mapState } from 'vuex'

export default {
    data() {
        const dateObj = new Date()
        return {
            icons: icons,
            provinces: provinces,
            datePickerOptions: {
                disabledDate (date) {
                    let today = new Date()
                    let yesterday = new Date()
                    let tomorrow = new Date()
                    yesterday.setDate( today.getDate() - 1 ) 
                    tomorrow.setDate( today.getDate() + 1 ) 
                    return date < today || date > tomorrow
                }
            },
        }
    },
    computed: {
        ...mapState({
            filterTrip: state => state.trip.filterTrip
        })
    },

    methods: {
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
        async searchTrip () {
            if(!this.validate()) return 

            this.$store.commit('trip/SET_FILTER_TRIP', {loadingTrip: true})
            this.$store.commit('trip/SET_FILTER_TRIP', {page: 0})
            this.$store.commit('trip/SET_EMPTY_LIST_TRIP')
            await this.$store.dispatch('trip/getTrip')
            this.$store.commit('trip/SET_FILTER_TRIP', {loadingTrip: false})
        }
    }
}
</script>


<style scoped>
.tripFilter__point {
    border-bottom: 1px solid #ECEDF1;
    margin-bottom: 16px;
    padding-bottom: 16px;

}
.tripFilter__time {
    padding-bottom: 16px;
}
.tripFilter__time>h2 {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #FF4868;
    margin-bottom: 17px;
}

.tripFilter__input {
    margin-bottom: 8px;
}
.tripFilter__input .el-date-editor,
.tripFilter__input .el-select{
    width: calc(100% - 48px);
    height: 48px;
}

.tripFilter__input>span {
    display: flex;
    width: 35px;
    height: 48px;
    align-items: center;
    justify-content: center;
}

.tripFilter__point>h2 {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    /* line-height: 24px; */
    color: #383F47;
    margin-bottom: 24px;
}
.tripFilter__search {
    background: #FFDAE1;
    /* border: 2px solid #FFDAE1; */
    box-sizing: border-box;
    border-radius: 4px;
    padding: 9px 16px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: #FF4868;
}
</style>