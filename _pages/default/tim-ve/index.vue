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

import TripFilter from '../../../components/Trip/TripFilter'
import TripList from '../../../components/Trip/TripList' 

export default {
    components: {
        "trip-filter": TripFilter,
        "trip-list": TripList,
    },
}
</script>

<style scoped>
.listTrip {
    padding-top: 40px;
    padding-bottom: 80px;
}
</style>