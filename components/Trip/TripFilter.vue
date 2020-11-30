<template>
  <div class="tripFilter">
      <h2>BỘ LỌC</h2>
      <div class="tripFilter__input flex items-center">
          <el-select v-model="searchInput.pointDown" filterable placeholder="Điểm xuất phát">
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
            <el-select v-model="searchInput.pointDown" filterable placeholder="Điểm đến">
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
                v-model="searchInput.date"
                type="date"
                format="dd-MM-yyyy"
                value-format="yyyyMMdd"
                placeholder="Ngày khởi hành">
            </el-date-picker>
            <span v-html="icons.calendar"></span>
        </div>

        <!-- <h2>Giá tiền</h2>
        <div class="px-3">   
            <el-slider
            range
            :marks="marks">
            </el-slider>
        </div> -->

        <!-- <h2>Khởi hành</h2>
        <div>   
            <el-checkbox class="block mb-1">Trước 06:00</el-checkbox>
            <el-checkbox class="block mb-1">Từ 06:00 - 12:00</el-checkbox>
            <el-checkbox class="block mb-1">Từ 12:00 - 18:00</el-checkbox>
            <el-checkbox class="block mb-1">Sau 18:00</el-checkbox>
        </div> -->
  </div>
</template>

<script>
import provinces from '../province.js'
import icons from '../icon'

export default {
    data() {
    const dateObj = new Date()
    return {
        marks: {
            "0": 0,
            "1000000": 1000000
        },
        icons: icons,
      provinces: provinces,
      searchInput: {
        date: null,
        pointUp: null,
        pointDown: null,
      },
    }
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
.tripFilter__input input::placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #B0B5C1;
}
</style>
<style scoped>
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

.tripFilter>h2 {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: #383F47;
    margin-bottom: 24px;
}
</style>