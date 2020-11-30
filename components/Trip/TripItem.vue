<template>
  <div class="tripItem">
        <div class="tripItem__name w-1/4">
            <h3>{{ trip.pointUp.name }}</h3>
            <span v-html="icons.arrowr"></span>
            <h3>{{ trip.pointDown.name }}</h3>
        </div>
      <div class="tripItem__time w-1/4">
          <h3>{{ trip.startTimeText }} {{ "(" + trip.vehicleTypeText + ")" }}</h3>
          <span>{{ trip.startDateText }}</span>
      </div>
      <div class="tripItem__price w-1/4">
          <h3>180,000 d</h3>
      </div>
      <div class="tripItem__book w-1/4 flex justify-end">
        <button @click="goToTrip">Đặt vé</button>
      </div>
  </div>
</template>

<script>
import icons from '../icon'

export default {
    props: ['trip'],
    data () {
        return {
            icons: icons
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

<style>
.tripItem__name span svg {
    height: 16px!important;
}
</style>
<style scoped>
.tripItem {
    padding: 8px 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.tripItem__name {
    display: flex;
    align-items: center;
}

.tripItem__name h3{
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    color: #383F47;
}

.tripItem__name span {
    margin: 0px 10px;
}

.tripItem__time h3 {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    color: #383F47;
    margin-bottom: 4px;
}

.tripItem__time span {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #9399A9;
}

.tripItem__price {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    text-align: right;
    color: #49D193;
}
.tripItem__book button {
    background: #FFFFFF;
    border: 2px solid #FFDAE1;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 9px 16px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: #FF4868;
}
</style>