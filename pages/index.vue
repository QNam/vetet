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
    let head = {
      title: "Vé xe Tết được mở bán để phục vụ bà con đón tết AN VUI!",
      meta: [
        { name: 'description', content: 'Định kỳ hàng năm Hệ thống bán vé xe tết sẽ được mở để phục vụ đồng bào xa quê, khách du lịch có thể lựa chọn được vé xe bình ổn giá. Đúng chỗ ngồi an toàn và tiện lợi để bà con về quê đón tết. Công ty AN VUI phối hợp cùng với hơn 100 hãng xe trong cả nước mở bán phục vụ bà con' },
        { name: 'keyword', content: 'Vé tết,Vé xe tết,Vé xe khách,Đặt vé tết,Đặt vé xe tết'},
        { name: 'og:image', content: 'https://vetet.vn/_nuxt/img/banner.7477906.jpg' },
        { name: 'og:title', content: 'Vé xe Tết được mở bán để phục vụ bà con đón tết AN VUI!' },
        { name: 'og:description', content: 'Định kỳ hàng năm Hệ thống bán vé xe tết sẽ được mở để phục vụ đồng bào xa quê, khách du lịch có thể lựa chọn được vé xe bình ổn giá. Đúng chỗ ngồi an toàn và tiện lợi để bà con về quê đón tết. Công ty AN VUI phối hợp cùng với hơn 100 hãng xe trong cả nước mở bán phục vụ bà con' },
      ]
    }

    if(this.$device.isMobile) {
      head.meta.push({ name: 'viewport', content: 'width=device-width, maximum-scale=1, initial-scale=1' })
    }
    return head
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