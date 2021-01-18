<template>
    <div class="tripItem">
        <div class="tripItem__name flex-wrap w-5/12">
            <h3>{{ trip.pointUp.name }}</h3>
            <span v-html="icons.arrowr"></span>
            <h3>{{ trip.pointDown.name }}</h3>
            <h4 class="w-full mt-2">{{ trip.companyInfo.companyName }}</h4>
        </div>
        <div class="w-7/12 flex items-center flex-wrap overflow-hidden">
            <div class="tripItem__time w-1/3">
                <h3>{{ trip.startTimeText }} {{ "(" + trip.vehicleTypeText + ")" }}</h3>
                <span>{{ trip.startDateText }}</span>
            </div>
            <div class="tripItem__price w-1/3">
                <h3>{{ routePrice | number }}đ</h3>
            </div>
            <div class="tripItem__book w-1/3 flex justify-end">
                <button @click="goToTrip">Đặt vé</button>
            </div>
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

    computed: {
        routePrice () {
            let price = this.trip.routeInfo.displayPrice
            try {
                let orderPointDown = this.trip.pointDown.order

                price = this.trip.pointUp.listPrice[orderPointDown]
            } catch (e) {

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
.tripItem {
    padding: 8px 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid #ECEDF1!important;
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

.tripItem__name h4 {
    color: #FF4868;
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