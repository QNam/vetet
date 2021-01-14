import { http } from '@nuxt/http'

async function genQRCode (params) {
    let body = {
        'companyId': 123456,//params['companyId'],
        'packageName': 'web',
        'ticketIds': '123-123',//params['ticketIds'].join('-'),
    }

    const url = 'https://ticket-new-dot-dobody-anvui.appspot.com/vnpay/';
    let res = await http.post(url,body)
    let payment = await res.json()

    console.log(payment)
}

export {
    genQRCode
}