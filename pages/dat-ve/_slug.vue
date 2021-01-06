<template>
  <div>
    <component v-bind:is="component" :tripCollectionFS="tripCollectionFS"></component>
  </div>
</template>

<script>
import BookingIndexMobile from '../../_pages/mobile/dat-ve/_slug'
import BookingIndexDefault from '../../_pages/default/dat-ve/_slug'
import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

export default {
    layout: (ctx) => ctx.isMobile ? 'mobile' : 'default',
    transition: 'slide-bottom',
    components: {
        BookingIndexMobile,
        BookingIndexDefault
    },
    
    head () {
        let head = {
            title: "Đặt vé tết",
            meta: []
        }

        if(this.$device.isMobile) {
            head.meta.push({ name: 'viewport', content: 'width=device-width, minimum-scale=1, initial-scale=1' })
        }

        return head
    },

    data () {
        return {
            tripCollectionFS: null,
        }
    },

    mounted () {
        this.initConfigFireBase()
    },

    beforeCreate() {
        this.component = BookingIndexDefault
        if (this.$device.isMobile) {
            this.component = BookingIndexMobile
        }
    },

    async asyncData({ query, store, $http, $helper, error }) {
        const tripId = query.tripId

        if(!store.state.trip.tripSelected) {
            try {
                $http.setHeader('DOBODY6969', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkIjp7InVpZCI6IkFETTBKWTF1Y3FkM0JZTWoxIiwiZnVsbE5hbWUiOiJBZG1pbiBWZSBUZXQifSwidiI6MCwiaWF0IjoxNjA1ODU4NDc5fQ.k5r8MbJZGNQSyNe42ZNa3cCoMblWXSUyLpHgNMkTXXY')
                let res = await $http.get(`https://ticket-new-dot-dobody-anvui.appspot.com/trip/view?id=${tripId}`)
                let trip = await res.json()
                trip =  $helper.tripDTO(trip.results.trip)
                store.commit('trip/SET_TRIP_SELECTED', trip)
            } catch (e) {
                error({ statusCode: 500, message: 'Có lỗi xảy ra vui lòng thử lại sau !' })
            }
        }
    },

    methods: {
        initConfigFireBase () {
            const config = {
                apiKey: "AIzaSyBWI3rqm3ZqMQHBxFJxG_ma7Vm8h3CFeP4",
                authDomain: "anvui-firestore.firebaseapp.com",
                databaseURL: "https://anvui-firestore.firebaseio.com",
                projectId: "anvui-firestore",
                storageBucket: "anvui-firestore.appspot.com",
                messagingSenderId: "978123247240",
                appId: "1:978123247240:web:957b7e55b784e9d1d6593d"
            }

            if (!firebase.apps.length) {
                firebase.initializeApp(config)
            }
            let firestore = firebase.firestore()
            if(!firebase.auth.currentUser){
                firebase.auth().signInWithEmailAndPassword('quocnam@anvui.vn', 'nam@anvui@1')
                .then((firebaseUser) => {
                    console.log('connected');
                    this.tripCollection = firestore.collection(`trip`)
                })
                .catch(function (error) {
                    console.log(error)
                    console.log('connect error');
                });
            } else {
                this.tripCollection = firestore.collection('trip')
            }
        },
    },

    destroyed () {
        this.$store.commit('trip/SET_DEFAULT_TICKET_INFO')
    },
}
</script>
