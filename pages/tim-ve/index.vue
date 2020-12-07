<template>
    <section class="listTrip">
        <div class="container mx-auto">
            <div class="flex flex-wrap overflow-hidden">

                <div class="w-1/4 overflow-hidden pr-3">
                    <trip-filter />
                </div>
                <div class="w-3/4 overflow-hidden pl-3">
                    <trip-list />
                </div>

            </div>
        </div>
    </section>
</template>

<script>

import TripFilter from '../../components/Trip/TripFilter'
import TripList from '../../components/Trip/TripList' 
import dummy from '../../ulti/dummy' 

export default {
    components: {
        "trip-filter": TripFilter,
        "trip-list": TripList,
    },

    head() {
        return {
            title: `Vé xe từ ${this.$route.query.pointUp} đi ${this.$route.query.pointDown}`
        }
    },

    async fetch ({ query, store, route, $http, $helper }) {
        if(!store.state.trip.filterTrip.pointUp && query.pointUp) {
            store.commit('trip/SET_FILTER_TRIP', {pointUp: query.pointUp})
        }
        if(!store.state.trip.filterTrip.pointDown && query.pointDown) {
            store.commit('trip/SET_FILTER_TRIP', {pointDown: query.pointDown})
        }
        if(!store.state.trip.filterTrip.date && query.date) {
            store.commit('trip/SET_FILTER_TRIP', {date: query.date})
        }

        await store.dispatch('trip/getTrip')
    },
}
</script>

<style scoped>
.listTrip {
    padding-top: 40px;
    padding-bottom: 80px;
}
</style>