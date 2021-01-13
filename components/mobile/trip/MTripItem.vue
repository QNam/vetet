<template>
  <div class="mtripItem"  @click="goToTrip">
      <div class="flex flex-wrap justify-between">
          <div class="w-1/3 pr-1">
            <h3> {{ trip.pointUp.name }} </h3> <h3> <span v-html="icons.arrowr"></span>  {{ trip.pointDown.name }}</h3>
          </div>  
          <div class="w-1/3 pr-1">
            <h4>{{ trip.startTimeText }} {{ "(" + trip.vehicleTypeText + ")" }}</h4>
            <p>{{ trip.startDateText }}</p>
          </div>  
          <div class="w-1/3 text-right">
            <h5>{{ routePrice | number }}đ</h5>
            <button  @click="goToTrip">Đặt vé</button>
          </div>  
      </div>
  </div>
</template>

<script>
import icons from '../../icon'

export default {
    props: ['trip'],
    data () {
        return {
            icons
        }
    },

    computed: {
        routePrice () {
            let price = this.trip.routeInfo.displayPrice
            try {
                let orderPointDown = this.trip.pointDown.order

                price = this.trip.pointUp.listPrice[orderPointDown]
            } catch (e) {
                console.log(e)
            }

            return price
        }
    },

    methods: {
        goToTrip () {
            this.$store.commit('trip/SET_TRIP_SELECTED', this.trip)
            this.$router.push({path: "/dat-ve", query: {tripId: this.trip.tripId}})
        }
    }
}
</script>

<style scoped>
.mtripItem {
    border-bottom: 1px solid #ECEDF1;
    padding: 16px 0px 8px 0px;
}
.mtripItem h5 {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    text-align: right;
    color: #49D193;
    margin-bottom: 8px;
}

.mtripItem button {
    background: #FFFFFF;
    border: 2px solid #FFDAE1;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 5px 16px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.41px;
    color: #FF4868;
}

.mtripItem h4 {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #383F47;
    margin-bottom: 4px;
}

.mtripItem p {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #9399A9;
}

.mtripItem h3 {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #383F47;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
}

.mtripItem h3 span {
    display: block;
    margin-right: 10px;
}
</style>