<template>
<div class="mformSearTrip">
    <div class="msearchTrip__input" @click="pointUpDrawer = true">
        <span class="block searchTrip__icon cursor-pointer mr-12px" v-html="icons.bus"></span>
        <el-input :value="filterTrip.pointUp" class="pointer-events-none" placeholder="Nơi đi"></el-input>
    </div>

    <div class="msearchTrip__input contents-betwwen" @click="pointDownDrawer = true">
        <span class="block searchTrip__icon cursor-pointer mr-12px" v-html="icons.location"></span>
        <el-input :value="filterTrip.pointDown" class="pointer-events-none" placeholder="Nơi đến"></el-input>
        <span class="block searchTrip__icon ml-20px cursor-pointer" @click.stop="switchPoint" v-html="icons.switch"></span>
    </div>

    <div class="msearchTrip__input">
        <span class="block searchTrip__icon cursor-pointer mr-12px" v-html="icons.calendar"></span>
        <el-date-picker
            ref="date"
            :picker-options="datePickerOptions"
            :value="filterTrip.date" 
            @input="$store.commit('trip/SET_FILTER_TRIP', {date: $event})"
            type="date"
            format="dd-MM-yyyy"
            value-format="yyyyMMdd"
            placeholder="Chọn ngày">
        </el-date-picker>
    </div>
    <div class="msearchTrip__submit">
        <button @click="setFilterTrip">VỀ NHÀ ĂN TẾT!</button>
    </div>
    
    <el-drawer class="searchTripDrawer" size="100%" @open="onOpenPointUpDrawer" :visible.sync="pointUpDrawer" :with-header="false">
        <div class="searchTripDrawer__content">
            <div class="searchTripDrawer__header">
                <span @click="pointUpDrawer = false" class="cursor-pointer"><i class="el-icon-back"></i></span>
                <h3>Điểm lên</h3>
                <span class="invisible">aaa</span>
            </div>

            <div class="searchTripDrawer__body">
                <div class="searchTripDrawer__input">
                    <span class="block" v-html="icons.bus"></span>
                    <input type="text" :value="filterTrip.pointUp" @input="changePointUp()" >
                </div>
                <div class="searchTripDrawer_mention">
                    <div class="searchTripDrawer_mention__header">
                        <h4>Tỉnh - Thành phố</h4>
                    </div>
                    <div class="searchTripDrawer_mention__content">
                        <p v-for="(province, key) in mentionsProvinces" :key="key" @click="selectPointUpMention(province)">{{ province.provinceName }}</p>  
                    </div>
                </div>
            </div>
        </div>
    </el-drawer>

    <el-drawer class="searchTripDrawer" @open="onOpenPointDownDrawer" size="100%" :visible.sync="pointDownDrawer" :with-header="false">
        <div class="searchTripDrawer__content">
            <div class="searchTripDrawer__header">
                <span @click="pointDownDrawer = false" class="cursor-pointer"><i class="el-icon-back"></i></span>
                <h3>Điểm xuống</h3>
                <span class="invisible">aaa</span>
            </div>

            <div class="searchTripDrawer__body">
                <div class="searchTripDrawer__input">
                    <span class="block" v-html="icons.location"></span>
                    <input type="text" :value="filterTrip.pointDown" @input="changePointDown()" >
                </div>
                <div class="searchTripDrawer_mention">
                    <div class="searchTripDrawer_mention__header">
                        <h4>Tỉnh - Thành phố</h4>
                    </div>
                    <div class="searchTripDrawer_mention__content">
                        <p v-for="(province, key) in mentionsProvinces" :key="key" @click="selectPointDownMention(province)">{{ province.provinceName }}</p>  
                    </div>
                </div>
            </div>
        </div>
    </el-drawer>
</div>
</template>

<script>
import icons from '../icon.js'
import provinces from '../province.js'
import { mapState } from 'vuex'

export default {
    data () {
        return {
            pointDownDrawer: false,
            pointUpDrawer: false,
            mentionsProvinces: [],
            icons,
            provinces,
            filterTripHistory: {},
            datePickerOptions: {
                disabledDate (date) {
                    let today = new Date()
                    let yesterday = new Date()
                    let tomorrow = new Date()
                    yesterday.setDate( today.getDate() - 1 ) 
                    tomorrow.setDate( today.getDate() + 1 ) 
                    return date < today
                }
            },
        }
    },

    computed: {
        ...mapState({
        filterTrip: state => state.trip.filterTrip
        })
    },

    mounted () {
        this.mentionsProvinces = this.provinces
        const dateObj = new Date()
        const date = dateObj.getDate() + 1 < 10 ? "0" + (dateObj.getDate() - -1) : "" + (dateObj.getDate() - -1)
        const month = (dateObj.getMonth() + 1) < 10 ? "0" + (dateObj.getMonth() + 1) : "" + (dateObj.getMonth() + 1)

        this.$store.commit('trip/SET_FILTER_TRIP', {date: `${dateObj.getFullYear()}${month}${date}`})

        try {
            const pointUpHistory = localStorage.getItem("filterTrip.pointUp")
            const pointDownHistory = localStorage.getItem("filterTrip.pointDown")

            // console.log(filterTripHistory)
            if(!this.filterTrip.pointUp && pointUpHistory) {
                this.$store.commit('trip/SET_FILTER_TRIP', {pointUp: pointUpHistory})
            }
            if(!this.filterTrip.pointDown && pointDownHistory) {
                this.$store.commit('trip/SET_FILTER_TRIP', {pointDown: pointDownHistory})
            }

            this.filterTripHistory.pointUp = pointUpHistory
            this.filterTripHistory.pointDown = pointDownHistory

        } catch (error) {
        }
    },
    methods: {
        onOpenPointUpDrawer () {
            this.mentionsProvinces = this.getMention(this.filterTrip.pointUp)
        },

        onOpenPointDownDrawer () {
            this.mentionsProvinces = this.getMention(this.filterTrip.pointDown)
        },

        changePointUp () {
            this.$store.commit('trip/SET_FILTER_TRIP', {pointUp: event.target.value})
            this.mentionsProvinces = this.getMention(event.target.value)
        },

        changePointDown () {
            this.$store.commit('trip/SET_FILTER_TRIP', {pointDown: event.target.value})
            this.mentionsProvinces = this.getMention(event.target.value)
        },

        selectPointUpMention (province) {
            this.$store.commit('trip/SET_FILTER_TRIP', {pointUp: province.provinceName})
            this.pointUpDrawer = false
        },

        selectPointDownMention (province) {
            this.$store.commit('trip/SET_FILTER_TRIP', {pointDown: province.provinceName})
            this.pointDownDrawer = false
        },

        getMention (query) {
            if(query.length == 0) {
                return this.provinces
            }
            query = this.$helper.removeVietnameseTones(query.toLowerCase())
            let mentions = this.provinces.filter( _ => {
                let provinceName = this.$helper.removeVietnameseTones(_.provinceName.toLowerCase() )
                return provinceName.includes(query)
            })

            return mentions
        },

        switchPoint () {
            let pointUp = this.filterTrip.pointUp
            let pointDown = this.filterTrip.pointDown

            this.$store.commit('trip/SET_FILTER_TRIP', {pointDown: pointUp})
            this.$store.commit('trip/SET_FILTER_TRIP', {pointUp: pointDown})
        },

        validate () {
            if(!this.filterTrip.pointUp) {
                this.$notify.warning({
                message: 'Vui lòng chọn điểm lên !'
                })

                return false
            }

            if(!this.filterTrip.pointDown) {
                this.$notify.warning({
                message: 'Vui lòng chọn điểm xuống !'
                })

                return false
            }

            return true
        },

        setFilterTrip () {
            if(!this.validate()) return
            let query = {
                pointUp: this.filterTrip.pointUp,
                pointDown: this.filterTrip.pointDown,
                date: this.filterTrip.date,
            }

            this.$router.push({path: "/tim-ve", query}) 
        }
    }
}
</script>

<style>
.searchTripDrawer .el-drawer__body {
    overflow-y: auto;
}
</style>

<style scoped>
.mr-12px {
    margin-right: 12px;
}

.searchTripDrawer__header {
    padding: 16px 16px;
}
.searchTripDrawer__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.searchTripDrawer__header span {
    font-size: 18px;
}
.searchTripDrawer__header h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #383F47;
}

.searchTripDrawer__body {
    padding: 0px 0px;
}
.searchTripDrawer__input {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ECEDF1;
    padding: 0px 16px;
}
.searchTripDrawer__input>span{

}
.searchTripDrawer__input>input {
    border: none;
    padding: 8px 16px;
    width: 100%;
    font-size: 22px;
    outline: none;
    font-weight: 500;
}
.searchTripDrawer_mention {
    padding: 16px;
}

.searchTripDrawer_mention__header h4 {
    font-size: 16px;
    font-weight: 500;
    color: #DCDFE6;
}
.searchTripDrawer_mention__content {
    margin-top: 8px;
    max-height: calc(100vh - 130px);
    overflow-y: auto;
}

.searchTripDrawer_mention__content p {
    margin-bottom: 12px;
    font-size: 16px;
}
</style>