<template>
  <section class="policy">
    <div class="container mx-auto">
    <div class="block__header">
        <h2>Chính sách mua và cung cấp vé Tết</h2>
    </div>
    <div class="policy__content">
        <el-tabs v-model="policySelected" type="card">
        <el-tab-pane label="Chính sách mua vé" name="tab1">
            <p>1. Tất cả những điều khoản về việc sử dụng VemaybayVietNam.com để đặt, thanh toán nhanh vé máy bay và các dịch vụ khác (”Điều khoản sử dụng VemaybayVietNam.com và/hoặc "Điều khoản sử dụng”) được đăng tải trên trên website VemaybayVietNam.com và được cung cấp bởi đội ngũ hỗ trợ của VemaybayVietNam.com.</p>
            <p>2. Các quản trị viên của website VemaybayVietNam.com và trung tâm hỗ trợ VemaybayVietNam.com thuộc Công ty TNHH PN Việt Nam, Địa chỉ: 8 Trần Quốc Tuấn, Phường 1, Gò Vấp. Thông tin chi tiết về Công ty có trong mục "Liên hệ” trên website VemaybayVietNam.com</p>
            <p>3. VemaybayVietNam.com cung cấp dịch vụ vé máy bay cho khách hàng với tư cách là đại lý cấp 1 đã được Hiệp hội vận tải hàng không quốc tế (IATA) công nhận và có hợp đồng đại lý với các hãng hàng không thuộc IATA (Hãng hàng không truyền thống). Đối với dịch vụ vé máy bay trên các Hãng hàng không giá rẻ (LCC) và không phải là thành viên của IATA, VemaybayVietNam.com cung cấp dịch vụ cho khách hàng với tư cách là người đại diện cho khách hàng trong việc ký hợp đồng mua vé với các LCC.</p>
            <p>4. VemaybayVietNam.com là đại diện cho các Hãng hàng không thuộc IATA trong việc bán vé máy bay cho khách hàng. Trách nhiệm của VemaybayVietNam.com là thay mặt các Hãng hàng không ký hợp đồng vận chuyển với khách hàng.</p>
        </el-tab-pane>
        <el-tab-pane label="Chính sách cung cấp vé" name="tab2">Config</el-tab-pane>
        </el-tabs>
    </div>
    </div>
</section>
</template>

<script>
export default {
    data () {
        return {
            policySelected: 'tab1'
        }
    }
}
</script>

<style scoped>
.policy .block__header {
  margin-bottom: 32px;
}
.policy {
  margin-top: 80px;
  margin-bottom: 80px;
}
.policy__content p{
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: #383F47;
  margin-bottom: 40px;
}
</style>