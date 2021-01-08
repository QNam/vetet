<template>
    <section class="newsPage">
    <div class="container mx-auto">
        <h3 class="newsPage__title">Tin tức</h3>
        <client-only>
            <div class="newsPage__new">
            <carousel v-bind="carouselOption">
                <slide class="news-item" v-for="(news, key) in listNews" :key="key">
                    <div>
                        <div class="flex flex-wrap" style="margin-right: -15px; margin-left: -15px;">
                            <div class="md:w-full" style="padding: 0px 15px">
                                <div class="news-item__thumb" style="margin-bottom: 13px">
                                    <!-- <a href="https://anvui.vn/tin-tuc/ceo-an-vui-phan-ba-manh-tra-loi-phong-van-cua-tap-chi-kinh-te-viet-nam-171.html" :title="news.title"> -->
                                        <img :src="news.img" class="img-fluid" :title="news.title" :alt="news.title">
                                    <!-- </a> -->
                                </div>
                            </div>
                            <div class="w-full" style="padding: 0px 15px">
                                <h2 class="news-item__title"><a href="https://anvui.vn/tin-tuc/ceo-an-vui-phan-ba-manh-tra-loi-phong-van-cua-tap-chi-kinh-te-viet-nam-171.html" :title="news.title">{{ news.title }}</a></h2>
                                <div class="news-item__desc">
                                    {{ news.meta_description | truncate(150) }}
                                </div>
                                <p class="news-item__date">Ngày đăng: {{ news.time }}</p>
                            </div>    
                        </div>
                    </div>
                </slide>
            </carousel>
            </div>
        </client-only>

        <transition-group  name="slide-bottom" mode="out-in">
        <template v-for="(news, key) in listNews">
            <div class="news-item" :key="key">
                <div class="flex flex-wrap" style="margin-right: -15px; margin-left: -15px;">
                    <div class="md:w-3/12 sm:w-full" style="padding: 0px 15px">
                        <div class="news-item__thumb">
                            <a href="https://anvui.vn/tin-tuc/ceo-an-vui-phan-ba-manh-tra-loi-phong-van-cua-tap-chi-kinh-te-viet-nam-171.html" :title="news.title">
                                <img :src="news.img" class="img-fluid" :title="news.title" :alt="news.title">
                            </a>
                        </div>
                    </div>
                    <div class="md:w-9/12 sm:w-full" style="padding: 0px 15px">
                        <h2 class="news-item__title"><a href="https://anvui.vn/tin-tuc/ceo-an-vui-phan-ba-manh-tra-loi-phong-van-cua-tap-chi-kinh-te-viet-nam-171.html" :title="news.title">{{ news.title }}</a></h2>
                        <div class="news-item__desc">
                            {{ news.meta_description }}
                        </div>
                        <p class="news-item__date">Ngày đăng: {{ news.time }}</p>
                    </div>    
                </div>
            </div>
        </template>    
        </transition-group>
        <div class="newsPage__pagination">
            <p class="cursor-pointer" @click="getNewsMore" :class="{'loading__dot': loadingMore, 'pointer-events-none': loadingMore}">
                {{ loadingMore ? "Đang tải" : "Xem thêm"  }}
            </p>
        </div>
    </div>
    </section>
</template>

<script>
import icons from '../../components/icon'

export default {
    transition: 'slide-bottom',
    layout: (ctx) => ctx.isMobile ? 'mobile' : 'default',
    head() {
        let head = {
            title: `Tin tức`,
            meta: []
        }

        if(this.$device.isMobile) {
            head.meta.push({ name: 'viewport', content: 'width=device-width, maximum-scale=1, initial-scale=1' })
        }
        return head
    },

    data () {
        return {
            icons,
            page: 0,
            limit: 10,
            listNews: [],
            loadingMore: false,
            carouselOption: {
                loop: true,
                perPage: 3,
                paginationEnabled: false,
                navigationEnabled: true,
                navigationNextLabel: icons.next,
                navigationPrevLabel: icons.prev,
            }
        }
    },

    async asyncData (context) {
        let listNews = [];
        try {
            let res = await context.$http.get(`https://anvui.vn/apinews?p=0&limit=10`)
            listNews = await res.json()
        } catch (error) {
            // console.log(e)
            context.error({ statusCode: 500, message: 'Có lỗi xảy ra vui lòng thử lại sau !' })
        }

        return {listNews: listNews}
    },

    mounted () {
        // this.getNews()
    },

    methods: {
        async getNewsMore () {
            this.page = 2
            this.loadingMore = true
            await this.getNews()
            this.loadingMore = false
        },

        async getNews () {
            let res = await this.$http.get(`https://anvui.vn/apinews?p=${this.page}&limit=${this.limit}`)
            let listNews = await res.json()

            this.listNews.push(...listNews)
        }
    }
}
</script>

<style>

</style>
<style scoped>
.newsPage__new {
    margin-bottom: 40px;
}
.newsPage__pagination p {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #FF4868;
}
.newsPage {
    padding: 40px 0px 80px 0px;
}
.newsPage .newsPage__title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    color: #383F47;
    margin-bottom: 24px;
}
.img-fluid {
    max-width: 100%;
    height: auto;
}

.news-item {
    margin-bottom: 40px;
    
}

.news-item__thumb a {
    display: block;
}
.news-item__title a{
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
    line-height: 28px;
    color: #464D5D;
    transition: .3s ease-in-out;
}

.news-item__title a {
    color: #232731;
    transition: .5s ease-in-out;
}

.news-item__title a:hover{
    color: #084388
}

.news-item__desc {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
    color: #464D5D;
}

.news-item__date {
    font-style: normal;
    font-size: 16px;
    line-height: 28px;
    color: #084388;
}

.news-details {
    padding: 40px 0px 0px 0px;
}

.news-details .container {
    border-bottom: 1px dashed #464D5D;
}

.news-details__title {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #464D5D;
    margin-bottom: 16px;
}
.news-details__content .image.image_resized {
    max-width: 100%!important;
}
.news-details__content img {
    max-width: 100%;
    height: auto;
}
.news-details__content p {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #232731;
}
.news-details__content {
    padding: 40px 0px;
}

.news-details__date {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #5C9CFE;

}
.news-related {
    padding: 24px 0px 100px 0px;
}
.news-related a {
    display: block;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 32px;
    color: #232731;
    margin-bottom: 10px;
    transition: .3s ease-in-out;
}

.news-related a:hover {
    text-decoration: underline;
    color: #084388;
}
.news-related__title {
    margin-bottom: 24px;
}
</style>