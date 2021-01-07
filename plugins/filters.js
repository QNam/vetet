import Vue from 'vue'

function number (num) {
    let result = num;
    try {
        result =num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }catch (e) {
    }
    return result;
}


Vue.filter('number', number)

Vue.filter('truncate', function (text, stop, clamp) {
    return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

Vue.filter('msToTime', function (ms, separator = ":") {
    let time = ms / 3600000
    let hour = Number(Math.floor( time ))
    let hourString = hour < 10 ? "0" + hour : "" + hour;

    let minute = time - hour;
    minute = Number(Math.round(minute * 60))
    let minuteString = (minute < 10) ? "0" + minute : "" + minute;

    return `${hourString}:${minuteString}`
})

Vue.filter('toDateString', function (str, separator = "/") {
    if( typeof str === 'undefined' || str == null ){
        return str;
    }

    if(str.toString().length !== 8) { return str }

    str = str.toString();
    var str1 = str.substr(0, 4);
    var str2 = str.substr(4,2);
    var str3 = str.substr(6,2);

    return str3 + separator + str2 + separator + str1;
})