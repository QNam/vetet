<template>
    <section class="routeHot">
        <div class="container mx-auto">
        <div class="flex flex-wrap overflow-hidden">
            <div class="w-full">
            <div class="block__header">
                <h2>Các tuyến nổi bật</h2>
                <a href="">Xem tất cả</a>
            </div>
            </div>
            <div class="lg:pr-4 w-1/2 overflow-hidden md:pr-0 md:w-full lg:w-1/2 xl:w-1/2">
            <route-item class="mb-4" v-for="item in 6" :key ="item" />
            </div>
            <div class="lg:pl-4 w-1/2 overflow-hidden md:pl-0 md:w-full lg:w-1/2 xl:w-1/2">
            <route-item class="mb-4" v-for="item in 6" :key ="item" />
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