export const state = () => ({
    filterTrip: {
        pointUp: null,
        pointDown: null,
        date: null
    },
    tripSelected: null,
    mapTicketInSeat: {},
    ticketInfo: {
        pointUp: null,
        pointDown: null,
        seatSelected: [],
        userName: null,
        userPhone: null,
        userEmail: null,
        userAddress: null,
        userNote: null,
        paymentType: 'vnpay'
    }
})

export const mutations = {
    SET_FILTER_TRIP (state, payload) {
        if(payload.pointUp) {
            state.filterTrip.pointUp = payload.pointUp
        }
        if(payload.pointDown) {
            state.filterTrip.pointDown = payload.pointDown
        }
        if(payload.date) {
            state.filterTrip.date = payload.date
        }
    },

    SET_MAP_TICKET_IN_SEAT (state, payload) {
        state.mapTicketInSeat = payload
    },

    SET_TRIP_SELECTED (state, payload) {
        state.tripSelected = payload
    },

    SET_DEFAULT_TICKET_INFO (state) {
        // state.tripSelected = null
        // state.mapTicketInSeat = null
        state.ticketInfo.pointUp = null
        state.ticketInfo.pointDown = null
        state.ticketInfo.seatSelected = []
    },

    SET_TICKET_INFO (state, payload) {
        if (payload.pointUp) {
            state.ticketInfo.pointUp = payload.pointUp
        }
        if (payload.pointDown) {
            state.ticketInfo.pointDown = payload.pointDown
        }

        if (typeof payload.userName != 'undefined') {
            state.ticketInfo.userName = payload.userName
        }
        if (typeof payload.userPhone != 'undefined') {
            state.ticketInfo.userPhone = payload.userPhone
        }
        if (typeof payload.userEmail != 'undefined') {
            state.ticketInfo.userEmail = payload.userEmail
        }
        if (typeof payload.userNote != 'undefined') {
            state.ticketInfo.userNote = payload.userNote
        }
        if (typeof payload.paymentType != 'undefined') {
            state.ticketInfo.paymentType = payload.paymentType
        }
    },
    
    TOGGLE_SEAT_SELECTED (state, payload) {
        let hasSeat = state.ticketInfo.seatSelected.filter( _ => _.seatId == payload.seatId )

        if(hasSeat[0]) {
            state.ticketInfo.seatSelected = state.ticketInfo.seatSelected.filter(_ => _.seatId != payload.seatId)
        } else {
            state.ticketInfo.seatSelected.push(payload)
        }
    }
}