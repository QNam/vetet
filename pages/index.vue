<template>
  <div>
    <component v-bind:is="component"></component>
  </div>
</template>

<script>
import IndexMobile from '../_pages/mobile/index'
import IndexDefault from '../_pages/default/index'

export default {
  layout: (ctx) => ctx.isMobile ? 'mobile' : 'default',
  transition: 'slide-bottom',
  head() {
    return {
      title: "Vé tết"
    }
  },
  components: {
    // Index: () => {
    //   return import('../_pages/' + 'mobile' + '/index')
    // },
    IndexMobile,
    IndexDefault
  },
  beforeCreate() {
    this.component = IndexDefault
    if (this.$device.isMobile) {
      this.component = IndexMobile
    }
  }
}
</script>