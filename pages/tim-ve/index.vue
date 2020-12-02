<template>
    <section class="listTrip">
        <div class="container mx-auto">
            <div class="flex flex-wrap overflow-hidden">

                <div class="w-1/4 overflow-hidden pr-3">
                    <trip-filter />
                </div>
                <div class="w-3/4 overflow-hidden pl-3">
                    <trip-list :listTrip="listTrip" />
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

    async asyncData({ query, store, route, $http, $helper }) {
        if(!store.state.trip.filterTrip.pointUp && query.pointUp) {
            store.commit('trip/SET_FILTER_TRIP', {pointUp: query.pointUp})
        }
        if(!store.state.trip.filterTrip.pointDown && query.pointDown) {
            store.commit('trip/SET_FILTER_TRIP', {pointDown: query.pointDown})
        }
        if(!store.state.trip.filterTrip.date && query.date) {
            store.commit('trip/SET_FILTER_TRIP', {date: query.date})
        }

        let listTrip = []
        let params = store.state.trip.filterTrip

        try {
            // $http.setHeader('DOBODY6969', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2IjowLCJkIjp7InVpZCI6IkFETTExMDk3Nzg4NTI0MTQ2MjIiLCJmdWxsTmFtZSI6IkFkbWluIHdlYiIsImF2YXRhciI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9kb2JvZHktZ29ub3cuYXBwc3BvdC5jb20vZGVmYXVsdC9pbWdwc2hfZnVsbHNpemUucG5nIn0sImlhdCI6MTQ5MjQ5MjA3NX0.PLipjLQLBZ-vfIWOFw1QAcGLPAXxAjpy4pRTPUozBpw')
            let url = encodeURI(`http://13.212.80.94/api/trip/getTrips?api_token=quynv.test&page=0&count=30&start_point=${params.pointUp}&end_point=${params.pointDown}&date=${params.date}`)
            let res = await $http.get(url)
            listTrip = await res.json()
            listTrip = listTrip.data

            listTrip = listTrip.map(trip => {
                return $helper.tripDTO(trip)
            })
        } catch (e) {
            console.log(e)
        }

        // let listTrip = dummy.listTrip.data.trips
        return { listTrip }
    },
}
</script>

<style scoped>
.listTrip {
    padding-top: 40px;
    padding-bottom: 80px;
}
</style>