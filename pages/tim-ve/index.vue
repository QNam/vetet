<template>
  <div>
    <component v-bind:is="component"></component>
  </div>
</template>

<script>
import SearTripIndexMobile from '../../_pages/mobile/tim-ve/index'
import SearTripIndexDefault from '../../_pages/default/tim-ve/index'

export default {
  layout: (ctx) => ctx.isMobile ? 'mobile' : 'default',
  transition: 'slide-bottom',
  components: {
    SearTripIndexMobile,
    SearTripIndexDefault
  },
  beforeCreate() {
    this.component = SearTripIndexDefault
    if (this.$device.isMobile) {
      this.component = SearTripIndexMobile
    }
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
        if(!store.state.trip.filterTrip.routeId && query.route_id) {
            store.commit('trip/SET_FILTER_TRIP', {routeId: query.route_id})
        }
        if(!store.state.trip.filterTrip.date && query.date) {
            store.commit('trip/SET_FILTER_TRIP', {date: query.date})
        }
        await store.dispatch('trip/getTrip')
    },

    destroyed() {
      this.$store.commit('trip/SET_EMPTY_LIST_TRIP')
    }
}
</script>
