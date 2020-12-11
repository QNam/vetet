<template>
    <div class="tripFilter">
        <div class="tripFilter__point">
            <h2>BỘ LỌC</h2>
            <div class="tripFilter__input flex items-center">
                <el-select :value="filterTrip.pointUp" filterable placeholder="Điểm xuất phát">
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
                <el-select :value="filterTrip.pointDown" filterable placeholder="Điểm đến">
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
                    type="date"
                    format="dd-MM-yyyy"
                    value-format="yyyyMMdd"
                    placeholder="Ngày khởi hành">
                </el-date-picker>
                <span v-html="icons.calendar"></span>
            </div>
        </div>

        <div class="tripFilter__time">
            <h2>Khởi hành</h2>
            <div>   
                <el-checkbox class="block">Trước 06:00</el-checkbox>
                <el-checkbox class="block">Từ 06:00 - 12:00</el-checkbox>
                <el-checkbox class="block">Từ 12:00 - 18:00</el-checkbox>
                <el-checkbox class="block">Sau 18:00</el-checkbox>
            </div>
        </div>

        <button class="tripFilter__search">Tìm chuyến</button>
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
        }
    },
    computed: {
        ...mapState({
            filterTrip: state => state.trip.filterTrip
        })
    }
}
</script>

<style>
.tripFilter__input {
    background: #FFFFFF;
    border: 2px solid #ECEDF1;
    box-sizing: border-box;
    border-radius: 4px;
    padding-left: 16px;
}
.tripFilter__input svg {
    width: 20px!important;
    height: 20px!important;
}
.tripFilter__input input {
    height: 48px;
    border: none!important;
    padding-left: 0px!important;
}
.tripFilter__input .el-input__prefix,
.tripFilter__input .el-input__suffix-inner {
    display: none;
}
.tripFilter__input input::placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #B0B5C1;
}

.tripFilter__time .el-checkbox__label {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.41px;
    color: #383F47;
    padding-left: 11px;
}

.tripFilter__time span.el-checkbox__inner {
    width: 18px;
    height: 18px;
    border-color: #383F47;
}

.tripFilter__time .el-checkbox {
    margin-bottom: 18px;
}
.tripFilter__time .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #383F47!important;
}

.tripFilter__time .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #fff!important;
    border-color: #FF4868!important;
}

.tripFilter__time .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #383F47;
}

.tripFilter__time .el-checkbox__input.is-checked .el-checkbox__inner::after {
    border-color: #FF4868;
    top: 3px;
    left: 6px;
}
</style>


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
    line-height: 24px;
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