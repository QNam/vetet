<template>
    <div class="mlistTrip" v-loading="filterTrip.loadingTrip" style="min-height: 200px">
         <template v-if="listTrip.length > 0">
        <div class="mlistTrip__head flex flex-wrap">
            <div class="w-1/3"><p>Tuyến xe</p></div>
            <div class="w-1/3"><p>Khởi hành</p></div>
            <div class="w-1/3"><p class="text-center">Giá vé</p></div>
        </div>
        <div class="mlistTrip__content">
            <div class="container mx-auto">
                <trip-item v-for="(trip, index) in listTrip" :key="index" :trip="trip" />
            </div>
            <p class="text-center cursor-pointer loadMore" v-if="allowLoadMore" :class="{'loading__dot': filterTrip.loadingMore, 'pointer-events-none': filterTrip.loadingMore}" @click="loadMoreTrip"> 
                {{ filterTrip.loadingMore ? "Đang tải" : "Xem thêm"  }}
            </p>
        </div>
         </template>
         <template v-else>
            <h2 class="text-center" style="font-size: 24px; padding: 80px 0px" v-if="!filterTrip.loadingTrip">Không tìm thấy chuyến !</h2>
         </template>
    </div>
</template>

<script>
import MTripItem from './MTripItem'
import { mapState } from 'vuex'

export default {
    data () {
        return {
            allowLoadMore: true,
        }
    },
    components: {
        'trip-item': MTripItem
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
}
</script>

<style scoped>
.mlistTrip {
    margin-bottom: 80px;
}
.mlistTrip__content {
    padding: 0px 16px;
}

.mlistTrip__head {
    padding: 8px 16px;
    background: #FFDAE1;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
}

.mlistTrip__head p {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.41px;
    color: #383F47;
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