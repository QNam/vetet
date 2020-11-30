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

import TripFilter from '../components/Trip/TripFilter'
import TripList from '../components/Trip/TripList' 
import dummy from '../ulti/dummy' 

export default {
    components: {
        "trip-filter": TripFilter,
        "trip-list": TripList,
    },
    head: {
        title: "Vé xe từ Hà Nội đi Sài Gòn"
    },
    async asyncData({ store, $http }) {
        let filterTripParam = store.state.trip.filterTrip
        const listTrip = dummy.listTrip.data.trips
        
        return { listTrip }
    }
}
</script>

<style scoped>
.listTrip {
    padding-top: 40px;
    padding-bottom: 80px;
}
</style>