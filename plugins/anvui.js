import enums from '../ulti/enum'
// import http from '@nuxt/http'

Date.prototype.toAVDateString = function() {
    var target = this;
    let date = this.getDate() < 10 ? "0" + this.getDate() : "" + this.getDate()
    let month = this.getMonth() + 1 < 10 ? "0" + (this.getMonth() + 1) : "" + (this.getMonth() + 1)
    let year = this.getFullYear()
    return `${year}${month}${date}`
};

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


function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
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
        removeVietnameseTones,
        // getTrip
    })
}