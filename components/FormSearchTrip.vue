<template>
  <div class="flex flex-initial">
    <div class="searchTrip flex items-center" style="flex-grow: 3">
      <div class="searchTrip__input flex-grow flex items-center" style="width: 30%">
        <span class="block searchTrip__icon cursor-pointer mr-12px" v-html="icons.bus"></span>
        <el-select ref="pointUp" 
          :value="filterTrip.pointUp" 
          @change="$store.commit('trip/SET_FILTER_TRIP', {pointUp: $event}); $refs.pointDown.focus()" 
          filterable placeholder="Nơi đi">
          <!-- <el-option-group>
            <el-option :label="filterTripHistory.pointUp" :value="filterTripHistory.pointUp"></el-option>
            <el-option :label="filterTripHistory.pointDown" :value="filterTripHistory.pointDown"></el-option>
          </el-option-group> -->
          <el-option
            v-for="province in provinces"
            :key="province.id"
            :label="province.provinceName"
            :value="province.provinceName">
          </el-option>
        </el-select>
      </div>
      <span class="block searchTrip__icon mx-20px cursor-pointer" @click="switchPoint" v-html="icons.switch"></span>
      
      <div class="searchTrip__input flex flex-grow items-center" style="width: 30%">
        <span class="block searchTrip__icon cursor-pointer mr-12px" v-html="icons.location"></span>
        <el-select ref="pointDown" 
            :value="filterTrip.pointDown" 
            @change="$store.commit('trip/SET_FILTER_TRIP', {pointDown: $event})" 
            filterable placeholder="Nơi đến">
          <!-- <el-option-group>
            <el-option :label="filterTripHistory.pointDown" :value="filterTripHistory.pointDown"></el-option>
            <el-option :label="filterTripHistory.pointUp" :value="filterTripHistory.pointUp"></el-option>
          </el-option-group> -->
          <el-option
            v-for="province in provinces"
            :key="province.id"
            :label="province.provinceName"
            :value="province.provinceName">
          </el-option>
        </el-select>
      </div>
      
      <div class="searchTrip__input  flex-grow flex items-center" style="width: 30%">
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
    </div>
    <div class="searchTrip__submit flex-grow-2">
      <button @click="setFilterTrip">VỀ NHÀ ĂN TẾT!</button>
    </div>
  </div>
</template>

<script>
import icons from './icon.js'
import provinces from './province.js'
import { mapState } from 'vuex'

export default {
  data() {
    const dateObj = new Date()
    return {
      icons: icons,
      provinces: provinces,
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
.searchTrip__input input.el-input__inner{
  border-color: transparent!important;
  padding: 0px;
}

.searchTrip__input input.el-input__inner::placeholder {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #B0B5C1;
}
.searchTrip__icon svg{
  width: 24px!important;
  height: 26px!important;
}

</style>
<style scoped>
.mr-12px {
  margin-right: 16px;
}

.mx-20px {
  margin-left: 20px;
  margin-right: 20px;
}
.searchTrip__submit button {
  background: #FF4868;
  border-radius: 0px 4px 4px 0px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #FFFFFF;
  height: 100%;
  padding-right: 22px;
  padding-left: 22px;
}
</style>