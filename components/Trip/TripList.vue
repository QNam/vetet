<template>
    <div class="tripList overflow-hidden" v-loading="filterTrip.loadingTrip" style="min-height: 200px">
        <!-- infinite-list  -->
        <!-- v-infinite-scroll="loadMoreTrip" -->
        <template v-if="listTrip.length > 0">
            <div class="tripList__header flex flex-wrap overflow-hidden">
                <div class="tripItem__name w-5/12">
                    <h3>Tuyến xe</h3>
                </div>
                <div class="tripItem__name w-7/12 flex flex-wrap overflow-hidden">
                    <div class="w-1/3"> <h3>Khởi hành</h3> </div>
                    <div class="w-1/3 text-center"> <h3>Giá vé</h3> </div>
                </div>
            </div>
            <template>
                <transition-group  name="slide-bottom" mode="out-in">
                    <trip-item v-for="(trip, key) in listTrip" :key="key + 'unique' " :trip="trip" />
                </transition-group>
            </template>
            <p class="text-center cursor-pointer loadMore" v-if="allowLoadMore" :class="{'loading__dot': filterTrip.loadingMore, 'pointer-events-none': filterTrip.loadingMore}" @click="loadMoreTrip"> {{ filterTrip.loadingMore ? "Đang tải" : "Xem thêm"  }}</p>
        </template>
        <template v-else>
            <h2 class="text-center" style="font-size: 32px" v-if="!filterTrip.loadingTrip">Không tìm thấy chuyến !</h2>
        </template>
    </div>
</template>

<script>
import TripItem from './TripItem'
import { mapState } from 'vuex'

export default {
    data () {
        return {
            allowLoadMore: true,
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
            this.$store.commit('trip/SET_FILTER_TRIP', {loadingMore: true})
            let nextPage = this.filterTrip.page + 1
            let oldListTripTotal = this.listTrip.length

            this.$store.commit('trip/SET_FILTER_TRIP', {page: nextPage})
            await this.$store.dispatch('trip/getTrip')
            this.$store.commit('trip/SET_FILTER_TRIP', {loadingMore: false})

            if( oldListTripTotal == this.listTrip.length  ) {
                this.allowLoadMore = false
            }
        }
    },

    // destroyed () {
    //     this.$store.commit('trip/SET_EMPTY_LIST_TRIP')
    //     this.$store.commit('trip/SET_TRIP_SELECTED', null)
    // }
}
</script>

<style scoped>
.tripList__header {
    padding: 8px 16px;
    border-bottom: 1px solid #ECEDF1!important;
}
.loadMore {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #FF4868;
    margin-top: 32px;
}
</style>