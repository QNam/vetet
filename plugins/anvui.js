import enums from '../ulti/enum'

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

export default ({ app }, inject) => {
    inject('helper', {
        msToTime,
        toVehicleTypeText,
        toDateString
    })
}