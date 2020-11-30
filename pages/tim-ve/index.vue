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
    head: {
        title: "Vé xe từ Hà Nội đi Sài Gòn"
    },
    async asyncData({ query, store, $http, $helper }) {
        let filterTripParam = store.state.trip.filterTrip

        let body = {
            "date": query.date,
			"sortSelections": [{
				"fieldName": "startTime",
				"ascDirection": true
            }],
			"startPoint": 'P0Jb1ue2eopww9z',
			"endPoint": 'P0Jb1ue2fb4oWsB',
			"startTimeLimit": 0,
			"endTimeLimit": 86400000,
			// "routeId": "R09c1qh0NmlMNcD",
			"companyId": 'TC08Z1qHHZBxlNLt',
			"count": 100,
			"timeZone": 7,
			"page": 0,
			// "searchPointOption": 1,
			"source": 1,
			"platform": 2
        }

        $http.setHeader('DOBODY6969', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2IjowLCJkIjp7InVpZCI6IkFETTExMDk3Nzg4NTI0MTQ2MjIiLCJmdWxsTmFtZSI6IkFkbWluIHdlYiIsImF2YXRhciI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9kb2JvZHktZ29ub3cuYXBwc3BvdC5jb20vZGVmYXVsdC9pbWdwc2hfZnVsbHNpemUucG5nIn0sImlhdCI6MTQ5MjQ5MjA3NX0.PLipjLQLBZ-vfIWOFw1QAcGLPAXxAjpy4pRTPUozBpw')
        let res = await $http.post('https://ticket-new-dot-dobody-anvui.appspot.com/planfortrip/searchForCustomer',body)
        let listTrip = await res.json()
        listTrip = listTrip.results.trips

        // let listTrip = dummy.listTrip.data.trips

        listTrip = listTrip.map(trip => {
            let startTime = $helper.msToTime(trip.startTimeReality)
            trip.startTimeText = `${startTime.hourString}:${startTime.minuteString}`
            trip.vehicleTypeText = $helper.toVehicleTypeText(trip.vehicleType)
            trip.startDateText = $helper.toDateString(trip.startDateReality, "/")

            return trip
        })
        
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