<template>
  <div class="mrouteHot__item">
    <div class="mrouteHot__item__name">
        <h4 @click="searchTripByRoute">{{ route.name }}</h4>
        <!-- <h5 class="w-1/5" v-html="icons.arrowr"></h5>
        <h4 class="w-2/5">Nghệ An</h4> -->
    </div>
    <h3>{{ route.display_price | number }}đ</h3>
    <button @click="toggleDatePicker()" v-html="icons.calendar1"></button>

    
      <div class="w-full mt-4" v-if="this.dateIsShow">
        <v-date-picker locale="vi" @input="searchTripByRoute" v-model="date" :rows="1" class="w-full" :key="route.id" :min-date="minDate"/>  
      </div>
    
    <!-- <el-date-picker
        class="absolute pointer-events-none"
        ref="date"
        type="date"
        @change="searchTripByRoute"
        :picker-options="datePickerOptions"
        v-model="date"
        format="dd-MM-yyyy"
        value-format="yyyyMMdd"
        placeholder="Chọn ngày">
    </el-date-picker> -->
 </div>
</template>

<script>
import icons from '../../icon'

export default {
    props: ['route'],
    data () {
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        return {
            dateIsShow: false,
            icons,
            date: tomorrow,
            minDate: tomorrow
        }
    },

    methods: {
        toggleDatePicker () {
          this.dateIsShow = !this.dateIsShow
        },

        searchTripByRoute () {
          
            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1) 

            let query = {
                date: this.date.toAVDateString(),
                pointUp: this.route.start_province,
                pointDown: this.route.end_province,
                // route_id: this.route.route_id
            }

            console.log(query)
            this.$store.commit('trip/SET_FILTER_TRIP', {pointUp: query.pointUp})
            this.$store.commit('trip/SET_FILTER_TRIP', {date: query.date})
            this.$store.commit('trip/SET_FILTER_TRIP', {pointDown: query.pointDown})

            this.$router.push({path: "/tim-ve", query})
        }
    }
}
</script>

<style>
.mrouteHot__item .el-input__inner {
  opacity: 0;
}

.mrouteHot__item .el-input__prefix {
  display: none;
}
</style>

<style scoped>
.mrouteHot__item {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  margin-top: 16px;
  justify-content: space-between;
  align-items: center;
}

.mrouteHot__item__name {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-right: 8px;
  width: 60%;
}

.mrouteHot__item>h3 {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  text-align: right;
  color: #49D193;
  margin-right: 16px;
}

.mrouteHot__item button {
  width: 32px;
  height: 32px;
  background: #FFFFFF;
  border: 2px solid #FFDAE1;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>