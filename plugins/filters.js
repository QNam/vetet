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