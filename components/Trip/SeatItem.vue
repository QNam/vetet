<template>
    <div class="seatItem cursor-pointer" :title="seat.seaatId" 
        :class="{ 'seatSelected': isSelected,
            'seatBooked': mapTicketInSeat[`${seat.floor}${seat.row}${seat.column}`] }">

        <span class="pointer-events-none" v-if="seat.seatType == 2" v-html="icons.dwheel"></span> 
        <span v-else-if="mapTicketInSeat[`${seat.floor}${seat.row}${seat.column}`]" class="block" v-html="icons.seat"></span>
        <span @click="selectSeat(seat)" v-else class="block"  v-html="icons.seat"></span>
        
    </div>
</template>

<script>
import icons from '../icon'
import { mapState, mapActions } from 'vuex'

export default {
    props: ['seat'],
    data () {
        return {
            icons: icons
        }
    },
    methods: {
        ...mapActions ({
            'calcPrice': 'trip/calcPrice'
        }),
        selectSeat (seat) {
            this.$store.commit('trip/TOGGLE_SEAT_SELECTED', seat)
            this.calcPrice()
        }
    },
    computed: {
        ...mapState({
            seatSelected: state => state.trip.ticketInfo.seatSelected,
            mapTicketInSeat: state => state.trip.mapTicketInSeat, 
        }),

        isSelected() {
            let hasSeat = this.seatSelected.filter(_ => _.seatId == this.seat.seatId)

            return hasSeat[0] ? true : false
        }
    }
}
</script>