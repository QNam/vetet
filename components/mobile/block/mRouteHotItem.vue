<template>
  <div class="mrouteHot__item">
    <div class="mrouteHot__item__name">
        <h4 @click="searchTripByRoute">{{ route.route_name }}</h4>
        <!-- <h5 class="w-1/5" v-html="icons.arrowr"></h5>
        <h4 class="w-2/5">Nghệ An</h4> -->
    </div>
    <h3>{{ route.display_price | number }}đ</h3>
    <button @click="toggleFocus()" v-html="icons.calendar1"></button>
    <el-date-picker
        class="absolute pointer-events-none"
        ref="date"
        type="date"
        @change="searchTripByRoute"
        :picker-options="datePickerOptions"
        v-model="date"
        format="dd-MM-yyyy"
        value-format="yyyyMMdd"
        placeholder="Chọn ngày">
    </el-date-picker>
 </div>
</template>

<script>
import icons from '../../icon'

export default {
    props: ['route'],
    data () {
        return {
            dateIsFocus: false,
            icons,
            date: null,
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

    methods: {
        toggleFocus () {
            if(this.dateIsFocus) {
                this.dateIsFocus = false
                this.$refs.date.blur()
            } else {
                this.dateIsFocus = true
                this.$refs.date.focus()
            }
        },

        searchTripByRoute () {
            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1) 

            let query = {
                date: this.date ? this.date : tomorrow.toAVDateString(),
                pointUp: this.route.start_point_name,
                pointDown: this.route.end_point_name,
                // route_id: this.route.route_id
            }
            this.$store.commit('trip/SET_FILTER_TRIP', {pointUp: this.route.start_point_name})
            this.$store.commit('trip/SET_FILTER_TRIP', {date: this.date})
            this.$store.commit('trip/SET_FILTER_TRIP', {pointDown: this.route.end_point_name})

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