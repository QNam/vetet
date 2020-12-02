import enums from '../ulti/enum'
// import http from '@nuxt/http'

function msToTime(ms) {
    let time = ms / 3600000
    let hour = Number(Math.floor( time ))
    let hourString = hour < 10 ? "0" + hour : "" + hour;

    let minute = time - hour;
    minute = Number(Math.round(minute * 60))
    let minuteString = (minute < 10) ? "0" + minute : "" + minute;

    return {
        hour,
        hourString,
        minute,
        minuteString
    }
}

function toVehicleTypeText (vehicleType) {
    return enums.vehicleType[vehicleType] ? enums.vehicleType[vehicleType] : ""
}

function toDateString (str, split = "-", type) {
    if(typeof str==='undefined' || str.toString().length!==8||str===''||str===null){
        return str;
    }
    str = str.toString();
    var str1 = str.substr(0, 4);
    var str2 = str.substr(4,2);
    var str3 = str.substr(6,2);
    if(type){
        let rs = '';
        switch (type) {
            case 'dayName' :
                let day = new Date(str2 + '/' + str3 + '/' + str1).getDay();
                if(day == 0){
                    rs = "Chủ nhật";
                }else{
                    rs = 'Thứ '+(day+1);
                }
                break;

            default : break
        }
        return rs;
    }
    return str3 + split + str2 + split + str1;
}

function tripDTO (trip) {
    let startTime = msToTime(trip.startTimeReality)
    trip.startTimeText = `${startTime.hourString}:${startTime.minuteString}`
    trip.vehicleTypeText = toVehicleTypeText(trip.vehicleType)
    if(trip.startDateReality) {
        trip.startDateText = toDateString(trip.startDateReality, "/")
    } else {
        if(trip.date) {
            trip.startDateText = toDateString(trip.date, "/")
        } else {
            trip.startDateText = ""
        }
    }
    

    return trip
}
// async function getTrip (params) {
//     http.setHeader('DOBODY6969', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2IjowLCJkIjp7InVpZCI6IkFETTExMDk3Nzg4NTI0MTQ2MjIiLCJmdWxsTmFtZSI6IkFkbWluIHdlYiIsImF2YXRhciI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9kb2JvZHktZ29ub3cuYXBwc3BvdC5jb20vZGVmYXVsdC9pbWdwc2hfZnVsbHNpemUucG5nIn0sImlhdCI6MTQ5MjQ5MjA3NX0.PLipjLQLBZ-vfIWOFw1QAcGLPAXxAjpy4pRTPUozBpw')
//     let res = await http.get(`https://ticket-new-dot-dobody-anvui.appspot.com/trip/view?id=${params.tripId}`)
//     let trip = await res.json()
//     trip = trip.results.trip

//     return trip
// }

export default ({ app, $http }, inject) => {
    inject('helper', {
        msToTime,
        toVehicleTypeText,
        toDateString,
        tripDTO,
        // getTrip
    })
}