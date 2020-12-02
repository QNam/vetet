<template>
    <div>
        <template v-if="listTrip.length > 0">
            <trip-item v-for="(trip, key) in listTrip" :key="key" :trip="trip" />
        </template>
        <template v-else>
            <h2 class="text-center" style="font-size: 32px">Không tìm thấy chuyến !</h2>
        </template>
    </div>
</template>

<script>
import TripItem from './TripItem'

export default {
    props: ['listTrip'],
    components: {
        "trip-item": TripItem
    }
}
</script>

<style scoped>

</style>