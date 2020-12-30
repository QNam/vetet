<template>
  <div class="seatMap w-full" v-loading="loading">
    <!-- <h3>Tầng 1</h3> -->
    <div class="seatMap__content flex flex-wrap overflow-hidden justify-center" v-if="seatMapData">
        <div class="seatMap__item mb-4" :class="{'w-1/2': seatMapData.length > 1}" v-for="(floor, fkey) in seatMapData" :key="fkey">
            <h3>Tầng {{ fkey }}</h3>
            <table>
                <tbody>
                <tr v-for="(row, rkey) in floor" :key="rkey">
                    <td v-for="(seat, ckey) in row" :key="ckey">
                        <template v-if="seat">
                            <seat-item :seat="seat" />
                        </template>
                        <span v-else class="opacity-0 invisible pointer-events-none" v-html="icons.seat"></span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
import icons from '../icon'
import { mapState } from 'vuex'
import SeatItem from './SeatItem'
import dummy from '../../ulti/dummy'

export default {
    components: {
        'seat-item' :SeatItem
    },
    data () {
        return {
            icons: icons,
            loading: true,
        }
    },
    mounted () {
        this.getTicketOfTrip()
    },
    computed: {
        ...mapState({
            tripSelected: state => state.trip.tripSelected,
            ticketInfo: state => state.trip.ticketInfo
        }),

        seatMapData () {
            if (!this.tripSelected) {
                return
            }

            let seatMap = this.tripSelected.seatMap
            let seatData = {};

            [...Array(seatMap.numberOfFloors).keys()].forEach(floor => {
                seatData[floor+1] = {};
                [...Array(seatMap.numberOfRows).keys()].forEach(row => {
                    seatData[floor+1][row+1] = {};
                    [...Array(seatMap.numberOfColumns).keys()].forEach(column => {
                        seatData[floor+1][row+1][column+1] = null
                    });
                });
            });

            seatMap.seatList.forEach(seat => {
                seat.seatTicket = false
                seatData[seat.floor][seat.row][seat.column] = seat
            })  

            return seatData
        }
    },

    methods: {
        async getTicketOfTrip () {
            this.loading = true
            const body = {
                tripId: this.tripSelected.tripId,
                pointUpId: this.tripSelected.pointUp.id,
                pointDownId: this.tripSelected.pointDown.id
            }

            this.$http.setHeader('DOBODY6969', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2IjowLCJkIjp7InVpZCI6IkFETTExMDk3Nzg4NTI0MTQ2MjIiLCJmdWxsTmFtZSI6IkFkbWluIHdlYiIsImF2YXRhciI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9kb2JvZHktZ29ub3cuYXBwc3BvdC5jb20vZGVmYXVsdC9pbWdwc2hfZnVsbHNpemUucG5nIn0sImlhdCI6MTQ5MjQ5MjA3NX0.PLipjLQLBZ-vfIWOFw1QAcGLPAXxAjpy4pRTPUozBpw')
            let res = await this.$http.post('https://ticket-new-dot-dobody-anvui.appspot.com/ticket/getForCustomer', body)
            let listTicket = await res.json()

            let mapTicketInSeat = {}
            listTicket.results.tickets.forEach(value => {
                mapTicketInSeat[`${value.seat.floor}${value.seat.row}${value.seat.column}`] = value
            }) 

            this.$store.commit('trip/SET_MAP_TICKET_IN_SEAT', mapTicketInSeat)
            this.loading = false
        }
    }
}
</script>

<style scoped>
.seatMap h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    text-transform: uppercase;
    color: #383F47;
    margin-bottom: 20px;
}

.seatMap__content table{
    margin-left: -17.5px;
}
.seatMap__content td {
    padding: 17.5px;
}

.seatMap__content {
    margin-left: -15px;
    margin-right: -15px;
}

. mb-4 {
    padding-right: 15px;
    padding-left: 15px;
}

</style>