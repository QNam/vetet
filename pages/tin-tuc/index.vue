<template>
  <div>
      abababa
      <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    transition: 'slide-bottom',
    // computed: {
    //     ...mapState({
    //         filterTrip: state => state.trip.filterTrip,
    //     }),
    // },

    async asyncData ({store}) {
        return { filterTrip: store.state.trip.filterTrip }
    }
}
</script>

<style>

</style>