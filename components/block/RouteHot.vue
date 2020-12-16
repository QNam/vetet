<template>
    <section class="routeHot" v-if="listRoute.length > 0">
        <div class="container mx-auto">
        <div class="flex flex-wrap overflow-hidden">
            <div class="w-full">
            <div class="block__header">
                <h2>Các tuyến nổi bật</h2>
                <!-- <a href="">Xem tất cả</a> -->
            </div>
            </div>
            <div class="lg:pr-4 w-1/2 overflow-hidden md:pr-0 md:w-full lg:w-1/2 xl:w-1/2">
            <route-item class="mb-4" :route="route" v-for="(route, key) in listRoute.slice(0,6)" :key ="key" />
            </div>
            <div class="lg:pl-4 w-1/2 overflow-hidden md:pl-0 md:w-full lg:w-1/2 xl:w-1/2">
            <route-item class="mb-4" :route="route" v-for="(route, key) in listRoute.slice(6,12)" :key ="key" />
            </div>
        </div>
        </div>
    </section>
</template>

<script>
import RouteItem from './RouteItem'

export default {
    components: {
        "route-item": RouteItem
    },

    mounted () {
        // this.getRouteHot()
    },

    data () {
        return {
            listRoute: []
        }
    },

    async fetch() {
        let res = await this.$http.get(encodeURI('https://apiv2.sanve.com.vn/api/route/list?api_token=quynv.test&count=12&name=Hà Nội') )
        let listRouteAsJson = await res.json()
        let listRoute = listRouteAsJson.data.data

        this.listRoute = listRoute
    },

    methods: {
        
    }
}
</script>

<style scoped>
.routeHot {
    margin-top: 57px;
}

.routeHot .block__header {
    margin-bottom: 32px;
}
</style>