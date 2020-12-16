<template>
  <div class="tripInfo">
    <div class="tripInfo__sum">
        <div class="tripInfo__sum__content pr-1">
            <h3>{{ tripSelected.startTimeText }} - {{ tripSelected.startDateText }}</h3>
            <p>{{ tripSelected.pointUp.name }} <span v-html="icons.arrowr"></span> {{ tripSelected.pointDown.name }}</p>
        </div>
    </div>    
    <div class="tripInfo__time">
        <h3>GIỜ KHỞI HÀNH</h3>
        <p>{{ tripSelected.startTimeText }} ({{ tripSelected.vehicleTypeText }})</p>
    </div>
    <div class="tripInfo__point">
        <h3>ĐIỂM LÊN XE</h3>
        <template v-if="!ticketInfo.paymentCompleted"> 
            <el-select v-if="allowPADAtWayPointUp" 
                        :value="pickAndDrop.pointUp" 
                        @change="$store.commit('trip/SET_PICK_DROP_TYPE', { pointUp: $event })"
                        class="block w-full" 
                        placeholder="Điểm đón">
                <el-option label="Tại bến" :value="1"></el-option>
                <el-option label="Dọc đường" :value="2"></el-option>
            </el-select>
            <el-input v-if="pickAndDrop.pointUp == 2" 
                    :value="ticketInfo.pointUpAddress" 
                    @change="$store.commit('trip/SET_TICKET_INFO', { pointUpAddress: $event })" 
                    class="mb-3" 
                    type="textarea" :rows="2" placeholder="Địa chỉ"> </el-input>

            <el-select v-if="pickAndDrop.pointUp == 1" 
                    class="block w-full" 
                    :value="ticketInfo.pointUp" 
                    @change="changePointUp($event)" 
                    value-key="id" 
                    placeholder="Chọn điểm lên xe">
                <template v-if="tripSelected.pointUp.listTransshipmentPoint.length > 0">
                    <el-option v-for="(tsPoint, tsKey) in tripSelected.pointUp.listTransshipmentPoint" 
                        :key="tsKey"
                        :label="tsPoint.name"
                        :value="tsPoint"></el-option>
                </template>
                <template v-else> 
                    <el-option :value="tripSelected.pointUp" :label="tripSelected.pointUp.name"></el-option>
                </template>
            </el-select>
        </template>
        <template v-else>
            <h6>{{ pickAndDrop.pointUp == 2 ? ticketInfo.pointUpAddress :  tripSelected.pointUp.name }}</h6>
        </template>
    </div>

    <div class="tripInfo__point">
        <h3>ĐIỂM XUỐNG XE</h3>
        <template v-if="!ticketInfo.paymentCompleted">
            <el-select v-if="allowPADAtWayPointDown" 
                    :value="pickAndDrop.pointDown" 
                    @change="$store.commit('trip/SET_PICK_DROP_TYPE', { pointDown: $event })"
                    class="block w-full" 
                    placeholder="Điểm đón">
                <el-option label="Tại bến" :value="1"></el-option>
                <el-option label="Dọc đường" :value="2"></el-option>
            </el-select>

            <el-input v-if="pickAndDrop.pointDown == 2" 
                    :value="ticketInfo.pointDownAddress" 
                    @change="$store.commit('trip/SET_TICKET_INFO', { pointDownAddress: $event })"  
                    type="textarea" 
                    :rows="2"
                    placeholder="Địa chỉ"></el-input>

            <el-select v-if="pickAndDrop.pointDown == 1" 
                    class="block w-full" 
                    :value="ticketInfo.pointDown"
                    @change="changePointDown($event)"
                    value-key="id" 
                    placeholder="Chọn điểm xuống xe">
                <template v-if="tripSelected.pointDown.listTransshipmentPoint.length > 0">
                    <el-option v-for="(tsPoint, tsKey) in tripSelected.pointDown.listTransshipmentPoint" 
                        :key="tsKey"
                        :label="tsPoint.name"
                        :value="tsPoint"></el-option>
                </template>
                <template v-else> 
                    <el-option :value="tripSelected.pointDown" :label="tripSelected.pointDown.name"></el-option>
                </template>
            </el-select>
        </template>
        <template v-else>
            <h6>{{ pickAndDrop.pointDown == 2 ? ticketInfo.pointDownAddress :  tripSelected.pointDown.name }}</h6>
        </template>
    </div>
  </div>
</template>

<script>
import icons from '../icon'
import { mapState } from 'vuex'

export default {
    data () {
        return {
            icons: icons,
            PADPointUpType: 1,
            PADPointDownType: 1,
        }
    },

    mounted () {
        if( this.tripSelected.pointUp.listTransshipmentPoint.length == 0 ) {
            this.$store.commit('trip/SET_TICKET_INFO', { pointUp: this.tripSelected.pointUp })
        }

        if( this.tripSelected.pointDown.listTransshipmentPoint.length == 0 ) {
            this.$store.commit('trip/SET_TICKET_INFO',  { pointDown: this.tripSelected.pointDown })
        }
    },

    computed: {
        ...mapState({
            tripSelected: state => state.trip.tripSelected,
            ticketInfo: state => state.trip.ticketInfo,
            pickAndDrop: state => state.trip.pickAndDrop, 
        }),

        allowPADAtWayPointUp () {
            // return true
            if(!this.tripSelected.pointUp.allowPickingAndDroppingAtWayByPlatform) return false
            return this.tripSelected.pointUp.allowPickingAndDroppingAtWayByPlatform.indexOf(2) >= 0
        },

        allowPADAtWayPointDown () {
            // return true
            if(!this.tripSelected.pointDown.allowPickingAndDroppingAtWayByPlatform) return false
            return this.tripSelected.pointDown.allowPickingAndDroppingAtWayByPlatform.indexOf(2) >= 0
        }
    },

    methods: {
        changePointUp(point) {
            this.$store.commit('trip/SET_TICKET_INFO', { pointUp: point })
            this.$store.dispatch('trip/calcPrice')
        },

        changePointDown(point) {
            this.$store.commit('trip/SET_TICKET_INFO', { pointDown: point })
            this.$store.dispatch('trip/calcPrice')
        }
    }
}
</script>

<style scoped>
/* .tripInfo {

} */
.tripInfo {
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    padding-bottom: 16px;
}
.tripInfo__time {
    padding: 0px 16px;
}

.tripInfo__sum {
    padding: 16px 0px;
    background: rgba(255, 218, 225, 0.4);
    border-radius: 4px 4px 0px 0px;
    margin-bottom: 16px;
}

.tripInfo__sum__content {
    padding-left: 24px;
    border-left: 4px solid #FF4868;
}

.tripInfo__sum__content h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: #383F47;
    margin-bottom: 8px;
}

.tripInfo__sum__content p {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #646D84;
    display: flex;
    align-items: center;
}

.tripInfo__sum__content p span {
    margin: 0px 18px;
}
.tripInfo__time {
    margin-bottom: 33px;
}
.tripInfo__point {
    margin-top: 33px;
    padding: 0px 16px;
}
.tripInfo__point h3,
.tripInfo__time h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #FF4868;
    margin-bottom: 16px;
}

.tripInfo__time p {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #383F47;
}

</style>