<template>
  <footer>
    <div class="container mx-auto">
      <div class="footer_top flex flex-wrap overflow-hidden">
        <div class="w-1/2 overflow-hidden pr-3">
          <a href="" class="block footer__logo">
            <img src="~/assets/imgs/logo.svg" alt="">
          </a>
            <div class="footer__address">
              <h3 class="text-pink-500 text-xl">CÔNG TY CỔ PHẦN CÔNG NGHỆ ANVUI</h3>
              <p>Giấy chứng nhận ĐKKD số 0107003437 do Sở KH& ĐT TP. Hà Nội cấp lần đầu ngày 23/09/2015.</p>
              <p><span class="text-pink-500">Chi nhánh phía Bắc</span> - Email: info@anvui.vn - Điện thoại: 1900 1911 Ext 1</p>
              <p>Địa chỉ: Toà Ecolife Capital, Số 58 Tố Hữu, Nam Từ Liêm, Hà Nội</p>
              <p><span class="text-pink-500">Chi nhánh Phía Nam</span> - Email: anvuihcm@anvui.vn - Điện thoại : 1900 1911 Ext 2</p>
              <p>Địa chỉ: J65 Lầu 6, Toà nhà Sinh Lợi Plaza, KĐT Trung Sơn, Bình Chánh, Hồ Chí Minh</p>
              <p>Hotline: 024.9999.6666</p>
            </div>
        </div>
        <div class="footer__contact w-1/2 overflow-hidden pl-3">
          <h3>Đăng ký cung cấp vé Tết</h3>
          <div class="flex">
            <input type="text" style="flex-grow: 9;" placeholder="Số điện thoại hoặc email liên hệ">
            <button style="flex-grow: 1;">Đăng ký</button>
          </div>
        </div>
      </div>
      <div class="footer_partner">
        <h3>Đối tác hỗ trợ thanh toán</h3>
        <div class="flex">
          <img src="~assets/imgs/pn/vnpayqr.svg" alt="">
          <!-- <img src="~assets/imgs/pn/zalopay.svg" alt="">
          <img src="~assets/imgs/pn/vinid.svg" alt=""> -->
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p>COPYRIGHT BY ANVUI - 2020</p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer {
  background: #F9FAFC;
}

.footer_top {
  padding: 40px 0px 24px 0px;
}
.footer__bottom {
  padding: 12px 0px;
  background-color: #FFDAE1;
}

.footer__bottom p {
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #FF4868;
}

.footer__logo {
  margin-bottom: 40px;
}

.footer__address {
  margin-bottom: 40px;
}

.footer__address h3 {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #FF4868;
  margin-bottom: 16px;
}

.footer__address p {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #383F47;
  margin-bottom: 8px;
}
.footer_partner {
  margin-bottom: 24px;
}
.footer_partner h3 {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  color: #383F47;
  margin-bottom: 16px;
}

.footer_partner img {
  margin-right: 40px;
}

.footer__contact h3 {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #383F47;
  margin-bottom: 16px;
}

.footer__contact input {
  background: #ECEDF1;
  border-radius: 4px;
  padding: 11px 16px;
  height: 40px;
  /* width: calc(100% - 8px - 100px); */
  margin-right: 8px;
}

.footer__contact input::placeholder {
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #9399A9;
}

.footer__contact button {
  height: 40px;
  white-space: nowrap;
  padding: 8px 24px;
  background: #FFFFFF;
  border: 2px solid #FFDAE1;
  box-sizing: border-box;
  border-radius: 4px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #FF4868;
}
</style>