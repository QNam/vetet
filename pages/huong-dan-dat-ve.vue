<template>
    <section class="guildBooking">
        <div class="container mx-auto">
            <iframe src="https://drive.google.com/file/d/1SdaVl2bpm2tv3AgGCOxAsDJoF3nXv2Ry/preview?resourcekey=null" width="100%" height="650px"></iframe>
        </div>
        <p class="text-center mt-3">
            <i>Hướng dẫn đặt vé tết tại <a href="vetet.vn">vetet.vn</a></i>
        </p>
    </section>
</template>

<script>
export default {
    layout: (ctx) => ctx.isMobile ? 'mobile' : 'default',
    transition: 'slide-bottom',
}
</script>

<style scoped>
.guildBooking {
    padding: 80px 0px;
}
</style>