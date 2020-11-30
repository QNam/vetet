<template>
  <div class="flex flex-initial">
    <div class="searchTrip flex items-center" style="flex-grow: 3">
      <div class="searchTrip__input flex-grow flex items-center" style="width: 30%">
        <span class="block searchTrip__icon cursor-pointer mr-12px" v-html="icons.bus"></span>
        <el-select ref="pointUp" v-model="searchInput.pointUp" filterable placeholder="Nơi đi">
          <!-- <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-option-group> -->
          <el-option
            v-for="province in provinces"
            :key="province.id"
            :label="province.provinceName"
            :value="province.provinceName">
          </el-option>
        </el-select>
      </div>
      <span class="block searchTrip__icon mx-20px" v-html="icons.switch"></span>
      
      <div class="searchTrip__input flex flex-grow items-center" style="width: 30%">
        <span class="block searchTrip__icon cursor-pointer mr-12px" v-html="icons.location"></span>
        <el-select ref="pointDown" v-model="searchInput.pointDown" filterable placeholder="Nơi đến">
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
          v-model="searchInput.date"
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
import { mapMutations } from 'vuex'

export default {
  data() {
    const dateObj = new Date()
    return {
      icons: icons,
      provinces: provinces,
      searchInput: {
        date: "20201130",
        pointUp: "Hà Nội",
        pointDown: "Thái Nguyên",
      },
    }
  },
  
  computed: {
    // todos () {
    //   return this.$store.state.todos.list
    // }
  },

  methods: {
    setFilterTrip () {
      this.$store.commit('trip/SET_FILTER_TRIP', this.searchInput)
      this.$router.push({path: "/tim-ve", query: this.searchInput})
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