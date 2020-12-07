<template>
    <div class="tripList infinite-list overflow-auto" v-infinite-scroll="loadMoreTrip">
        <div class="tripList__header flex flex-wrap overflow-hidden">
            <div class="tripItem__name w-5/12">
                <h3>Tuyến xe</h3>
            </div>
            <div class="tripItem__name w-7/12 flex flex-wrap overflow-hidden">
                <div class="w-1/3"> <h3>Khởi hành</h3> </div>
                <div class="w-1/3 text-center"> <h3>Giá vé</h3> </div>
            </div>
        </div>
        <template v-if="listTrip.length > 0">
            <trip-item v-for="(trip, key) in listTrip" :key="key" :trip="trip" />
        </template>
        <template v-else>
            <h2 class="text-center" style="font-size: 32px">Không tìm thấy chuyến !</h2>
        </template>
        <!-- <p class="text-center loadMore">Xem thêm</p> -->
    </div>
</template>

<script>
import TripItem from './TripItem'
import { mapState } from 'vuex'

export default {
    data () {
        return {
            loadMore: false
        }
    },
    components: {
        "trip-item": TripItem
    },
    computed: {
        ...mapState({
            listTrip: state => state.trip.listTrip,
            filterTrip: state => state.trip.filterTrip
        })
    },

    methods: {
        async loadMoreTrip () {
            // this.loadMore = true
            let nextPage = this.filterTrip.page + 1
            this.$store.commit('trip/SET_FILTER_TRIP', {page: nextPage})
            await this.$store.dispatch('trip/getTrip')
            // this.loadMore = false
        }
    }
}
</script>

<style scoped>
.tripList__header {
    padding: 8px 16px;
    border-bottom: 1px solid #ECEDF1!important;
}
.loadMore {

}
</style>