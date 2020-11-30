<template>
  <div>
      <trip-item v-for="(trip, key) in listTrip" :key="key" :trip="trip" />
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