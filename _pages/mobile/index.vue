<template>
<main>
    <div class="mBanner__wrap">
        <banner />
    </div>
    <div>
        <promotion />
    </div>
    <div class="mRouteHot__wrap">
        <route-hot />
    </div>
    <div class="mPartner__wrap">
        <partner />
    </div>
    <div class="mPolicy__wrap">
        <policy />
    </div>
</main>
</template>

<script>
import MBaner from '../../components/mobile/MBaner'
import MPromotion from '../../components/mobile/block/mPromotion'
import MRouteHot from '../../components/mobile/block/mRouteHot'
import MPartner from '../../components/mobile/block/mPartner'
import MPolicy from '../../components/mobile/block/mPolicy'

export default {
    components: {
        banner: MBaner,
        promotion: MPromotion,
        'route-hot': MRouteHot,
        partner: MPartner,
        policy: MPolicy
    },
    data () {
        return {
            
        }
    }
}
</script>

<style scoped>
.mBanner__wrap {
    margin-bottom: 24px;
}

.mRouteHot__wrap {
    margin-bottom: 40px;
}

.mPartner__wrap {
    margin-bottom: 40px;
}

.mPolicy__wrap {
    margin-bottom: 24px;
}
</style>