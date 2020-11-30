<template>
  <div class="tripInfo">
    <div class="tripInfo__sum">
        <div class="tripInfo__sum__content">
            <h3>17:00 - 12/11/2020</h3>
            <p>{{ tripSelected.pointUp.name }} <span v-html="icons.arrowr"></span> {{ tripSelected.pointDown.name }}</p>
        </div>
    </div>    
    <div class="tripInfo__time">
        <h3>GIỜ KHỞI HÀNH</h3>
        <p>17:00 (Giường)</p>
    </div>
    <div class="tripInfo__point">
        <h3>ĐIỂM LÊN XE</h3>
        <template> 
            <el-select v-if="allowPADAtWayPointUp" v-model="PADPointUpType" class="block w-full" placeholder="Điểm đón">
                <el-option label="Tại bến" :value="1"></el-option>
                <el-option label="Dọc đường" :value="2"></el-option>
            </el-select>
            <el-input placeholder="Địa chỉ" class="mb-3" v-if="PADPointUpType == 2" type="textarea" :rows="2"> </el-input>

            <el-select v-if="PADPointUpType == 1" class="block w-full" v-model="ticketInfo.pointUp" placeholder="Điểm đón">
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
    </div>

    <div class="tripInfo__point">
        <h3>ĐIỂM XUỐNG XE</h3>
        <template>
            <el-select v-if="allowPADAtWayPointDown" v-model="PADPointDownType" class="block w-full" placeholder="Điểm đón">
                <el-option label="Tại bến" :value="1"></el-option>
                <el-option label="Dọc đường" :value="2"></el-option>
            </el-select>
            <el-input placeholder="Địa chỉ" v-if="PADPointDownType == 2" type="textarea" :rows="2"> </el-input>

            <el-select v-if="PADPointDownType == 1" class="block w-full" v-model="ticketInfo.pointDown" placeholder="Điểm trả">
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
    </div>
  </div>
</template>

<script>
import icons from '../icon'
import dummy from '../../ulti/dummy'
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
            ticketInfo: state => state.trip.ticketInfo
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
    }
}
</script>

<style>
.tripInfo__point .el-select {
    margin-bottom: 16px;
}
.tripInfo__point .el-input__inner {
    background: #FFFFFF;
    height: 40px;
    border: 1px solid #ECEDF1;
    box-sizing: border-box;
    border-radius: 4px;
}

.tripInfo__point .el-input__inner::placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #383F47;
}
</style>
<style scoped>
/* .tripInfo {

} */

.tripInfo__sum {
    padding: 16px 0px;
    background: #FFDAE1;
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
    margin-bottom: 33px;
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