export const state = () => ({
    filterTrip: {
        pointUp: null,
        pointDown: null,
        date: null
    },
    tripSelected: null,
    mapTicketInSeat: {},
    pickAndDrop: {
        pointUp: 1,
        pointDown: 1,
    },
    ticketInfo: {
        pointUp: null,
        pointDown: null,
        pointUpAddress: null,
        pointDownAddress: null,
        seatSelected: [],
        userName: null,
        userPhone: null,
        userEmail: null,
        userAddress: null,
        userNote: null,
        paymentType: 'vnpay',
        totalPrice: 0
    }
})

export const mutations = {
    SET_PICK_DROP_TYPE (state, payload) {
        if(typeof payload.pointUp != 'undefined') {
            state.pickAndDrop.pointUp = payload.pointUp
        }

        if(typeof payload.pointDown != 'undefined') {
            state.pickAndDrop.pointDown = payload.pointDown
        }
    },

    SET_FILTER_TRIP (state, payload) {
        if(typeof payload.pointUp != 'undefined') {
            state.filterTrip.pointUp = payload.pointUp
            if(process.browser) { 
                localStorage.setItem("filterTrip.pointUp", state.filterTrip.pointUp);
            }
        }
        if(typeof payload.pointDown != 'undefined') {
            state.filterTrip.pointDown = payload.pointDown
            if(process.browser) { 
                localStorage.setItem("filterTrip.pointDown", state.filterTrip.pointDown);
            }
        }
        if(typeof payload.date != 'undefined') {
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
        if (typeof payload.pointUpAddress != 'undefined') {
            state.ticketInfo.pointUpAddress = payload.pointUpAddress
        }
        if (typeof payload.pointDownAddress != 'undefined') {
            state.ticketInfo.pointDownAddress = payload.pointDownAddress
        }
        if (typeof payload.paymentType != 'undefined') {
            state.ticketInfo.paymentType = payload.paymentType
        }
        if (typeof payload.totalPrice != 'undefined') {
            state.ticketInfo.totalPrice = payload.totalPrice
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

export const actions = {
    validateCalcPrice ({state}) {
        if( state.ticketInfo.pointUp == "" || state.ticketInfo.pointUp == null ) {
            return false
        }

        if( state.ticketInfo.pointDown == "" || state.ticketInfo.pointDown == null  ) {
            return false
        }

        if( state.ticketInfo.seatSelected.length <= 0  ) {
            return false
        }

        return true
    },

    async calcPrice ({commit, state, dispatch}) {
        let isValidate = await dispatch('validateCalcPrice')
        if(!isValidate) { 
            commit('SET_TICKET_INFO', {totalPrice: 0}) 
            return
        }

        let PUtransshipmentId = null
        let PUtransshipmentPrice = 0
        if ( typeof state.ticketInfo.pointUp.listTransshipmentPoint == 'undefined' ) {
            PUtransshipmentId = state.ticketInfo.pointUp.id
            PUtransshipmentPrice = state.ticketInfo.pointUp.transshipmentPrice
        }

        let PDtransshipmentId = null
        let PDtransshipmentPrice = 0
        if ( typeof state.ticketInfo.pointDown.listTransshipmentPoint == 'undefined' ) {
            PDtransshipmentId = state.ticketInfo.pointDown.id
            PDtransshipmentPrice = state.ticketInfo.pointDown.transshipmentPrice
        }

        let body = {
            'tripId': state.tripSelected.tripId,
            'informationsBySeats': []
        }

        body.informationsBySeats = state.ticketInfo.seatSelected.map(seat => {
            return {
                'seatId': seat.seatId,
                'pointUp': {
                    'id': state.tripSelected.pointUp.id,
                    'transshipmentId': PUtransshipmentId,
                    'transshipmentPrice': PUtransshipmentPrice,
                },
                'pointDown': {
                    'id': state.tripSelected.pointDown.id,
                    'transshipmentId': PDtransshipmentId,
                    'transshipmentPrice': PDtransshipmentPrice,
                }
            }
        })

        try {
            this.$http.setHeader('DOBODY6969', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2IjowLCJkIjp7InVpZCI6IkFETTExMDk3Nzg4NTI0MTQ2MjIiLCJmdWxsTmFtZSI6IkFkbWluIHdlYiIsImF2YXRhciI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9kb2JvZHktZ29ub3cuYXBwc3BvdC5jb20vZGVmYXVsdC9pbWdwc2hfZnVsbHNpemUucG5nIn0sImlhdCI6MTQ5MjQ5MjA3NX0.PLipjLQLBZ-vfIWOFw1QAcGLPAXxAjpy4pRTPUozBpw')
            let url = encodeURI(`https://api.anvui.vn/v1/sanve/get-price-ticket`)
            let res = await this.$http.post(url, body)
            let priceData = await res.json()
            priceData = priceData.results.listTicket
            
            let totalPrice = 0 

            Object.values(priceData).forEach(value => {
                totalPrice += value
            })
            
            commit('SET_TICKET_INFO', {totalPrice: totalPrice})
        } catch (e) {
            console.log(e)
        }
    }
}
