<template>
  <section class="mPolicy">
    <div class="container mx-auto">
    <div class="block__header">
        <h2>Chính sách mua và cung cấp vé Tết</h2>
    </div>
    <div class="mPolicy__content">
        <el-select v-model="policySelected" placeholder="Select">
        <el-option label="Chính sách mua vé" value="tab1"></el-option>
        <el-option label="Chính sách thu thập và bảo mật thông tin khách hàng" value="tab2"></el-option>
        <el-option label="Chính sách bảo mật thông tin thanh toán" value="tab3"></el-option>
    </el-select>
        <el-tabs v-model="policySelected" type="card">
          <el-tab-pane label="Chính sách mua vé" name="tab1">
            <p>- Không được phép hoàn, huỷ, đổi vé.</p>
            <p>- Thời gian mua vé hợp lệ là trước khi xe xuất bến ít nhất 24 giờ.</p>
            <p>- Thời gian thanh toán hợp lệ là tối đa 8 phút kể từ khi đặt giữ chỗ.</p>
          </el-tab-pane>
          <el-tab-pane label="Chính sách thu thập và bảo mật thông tin khách hàng" name="tab2">
            <p>Chúng tôi cam kết bảo mật những thông tin do Khách hàng cung cấp trong quá trình truy cập website vetet.vn. Quý khách vui lòng đọc những điều khoản dưới đây để hiểu rõ hơn những cam kết mà chúng tôi thực hiện.</p>
            <p><b>1. Mục đích thu thập thông tin cá nhân</b></p>
            <p>Chúng tôi sử dụng các thông tin về họ tên, số điện thoại, email do Quý Khách hàng cung cấp cho hoạt động cung cấp dịch vụ trên Website Vetet.vn, giải đáp thắc mắc và cung cấp thông tin về dịch vụ của chúng tôi trong trường hợp Quý khách hàng có yêu cầu.</p>
            <br>
            <p><b>2. Phạm vi sử dụng thông tin</b></p>
            <p>• Chúng tôi thu thập và sử dụng thông tin cá nhân Khách hàng vơus mục đích phù hợp và hoàn toàn tuân thủ nội dung của Chính sách thu thập và bảo mật thông tin khách hàng.</p>
            <p>• Chúng tôi chỉ chia sẻ thông tin thu thập được trong trường hợp cần thiết và quy định pháp luật cho các cơ quan, tổ chức, cá nhân sau:</p>
            <p>• Bên thứ ba có dịch vụ tích hợp với website Vetet.vn hoặc bên thứ ba mà chúng tôi tin tưởng sẽ hoàn thành các mục tiêu đề ra trong việc thu thập thông tin khách hàng;</p>
            <p>• Đơn vị nghiên cứu thị trường;</p>
            <p>• Cơ quan nhà nước có thẩm quyền.</p>
            <br>
            <p><b>3. Thời gian lưu trữ thông tin</b></p>
            <p>Không có thời hạn ngoại trừ trường hợp Quý Khách Hàng gửi yêu cầu huỷ bỏ tới chúng tôi bằng cách gửi thư trực tiếp tới địa chỉ công ty hoặc gọi điện, gửi email đến địa chỉ được thể hiện trên website này.</p>
            <br>
            <p><b>4. Địa chỉ đơn vị thu thập và quản lý thông tin cá nhân</b></p>
            <p>Công ty Cổ phần Công nghệ AN VUI</p>
            <p>• Địa chỉ:</p>
            <p>• Điện thoại:</p>
            <p>• Email: info@anvui.vn</p>
            <br>
            <p><b>5. Cam kết bảo mật thông tin của Khách hàng</b></p>
            <p>Chúng tôi luôn nỗ lực để giữ an toàn thông tin cá nhân của khách hàng, chúng tôi đã và đang thực hiện nhiều biện pháp an toàn, bao gồm: Bảo đảm an toàn trong môi trường vận hành; Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân khách hàng, chúng tôi sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng để điều tra xử lý kịp thời và thông báo cho khách hàng được biết; Các thông tin thanh toán: được bảo mật theo tiêu chuẩn thanh toán.</p>
            <p>Chúng tôi không sử dụng, không chuyển giao, cung cấp hoặc tiết lộ cho bên thứ 3 về thông tin cá nhân của Khách hàng khi chưa có sự đồng ý của khách hàng ngoại trừ các trường hợp được quy định tại quy định này hoặc quy định của pháp luật.</p>
            <p>Chính sách bảo mật có thể thay đổi theo thời gian hoặc tình hình thực tế. Chúng tôi có quyền sửa đổi chính sách này bất cứ lúc nào và không cần thông báo trước.</p>
          </el-tab-pane>
          <el-tab-pane label="Chính sách bảo mật thông tin thanh toán" name="tab3">
            <p>Hệ thống thanh toán trên Vetet.vn được kết nối với Đối Tác Cổng Thanh Toán đã được Ngân hàng nhà nước Việt Nam thẩm định về độ an toàn bảo mật và cấp phép hoạt động hợp pháp tại Việt Nam – VNPay. Chúng tôi cam kết các tiêu chuẩn bảo mật thanh toán của Vetet.vn đảm bảo tuân thủ theo các tiêu chuẩn bảo mật của VNPAY, nhằm tôn trọng và bảo vệ quyền lợi của Quý Khách Hàng.</p>
            <br>
            <p>Chính sách bảo mật thanh toán đảm bảo tuân thủ các tiêu chuẩn bảo mật của Đối Tác Cổng Thanh Toán bao gồm:</p>
            <p>• Tiêu chuẩn bảo mật PCI DSS 3.2.1 level 1 - cấp độ cao nhất về tiêu chuẩn  tiêu chuẩn bắt buộc đối với tất cả tổ chức, doanh nghiệp có liên quan đến nghiệp vụ xử lý, truyền tải và lưu trữ dữ liệu thẻ thanh toán, có giá trị trên toàn cầu do Hội đồng Tiêu chuẩn Bảo mật - SSC (Security Standards Council) thiết lập dành cho hoạt động thanh toán thẻ.</p>
            <p>• Mật khẩu sử dụng một lần (OTP) được gửi qua SMS để đảm bảo việc truy cập tài khoản được xác thực hoặc mã hóa 3D của thẻ Visa và MasterCard (được xác nhận bởi Visa và MasterCard về tính bảo mật).</p>
            <p>• Các nguyên tắc và quy định bảo mật thông tin trong ngành tài chính ngân hàng theo quy định của Ngân hàng nhà nước Việt Nam.</p>
          </el-tab-pane>
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

.mPolicy .block__header {
    margin-bottom: 16px;
}
.mPolicy .block__header h2{
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #383F47;
}

.mPolicy .block__header {
  margin-bottom: 32px;
}
.mPolicy {
    padding: 0px 16px;
  /* margin-top: 80px; */
  /* margin-bottom: 80px; */
}
.mPolicy__content p{
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: #383F47;
  /* margin-bottom: 40px; */
}
</style>

<style>
.mPolicy .el-tabs__header{
    display: none;
}

.mPolicy .el-select {
    width: 100%;
    margin-bottom: 16px;
    border-color: #ECEDF1;
}

.mPolicy .el-select input {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #383F47;
}

.mPolicy .el-select .el-select__caret::before {
    color: #FF4868;
}
</style>