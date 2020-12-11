<template>
    <footer>
        <div class="footer__top">
            <nuxt-link to="/" class="logo__bottom block"><img src="~/assets/imgs/logo.svg" alt=""></nuxt-link>
            <div class="footer__intro">
                <h2>CÔNG TY CỔ PHẦN CÔNG NGHỆ ANVUI</h2>
                <p>Giấy chứng nhận ĐKKD số 0107003437 do Sở KH& ĐT TP. Hà Nội cấp lần đầu ngày 23/09/2015.</p>
                <p><b>Chi nhánh phía Bắc</b> - Email: info@anvui.vn - Điện thoại: 1900 1911 Ext 1</p>
                <p>Địa chỉ: Toà Ecolife Capital, Số 58 Tố Hữu, Nam Từ Liêm, Hà Nội</p>
                <p> <b>Chi nhánh Phía Nam</b> - Email: anvuihcm@anvui.vn - Điện thoại : 1900 1911 Ext 2</p>
                <p>Địa chỉ: J65 Lầu 6, Toà nhà Sinh Lợi Plaza, KĐT Trung Sơn, Bình Chánh, Hồ Chí Minh</p>
                <p>Hotline: 024.9999.6666</p>
            </div>
            <div class="footer__contact">
                <h3>Đăng ký cung cấp vé Tết</h3>
                <div class="flex">
                    <input type="text" style="flex-grow: 9;" placeholder="Điện thoại hoặc email liên hệ">
                    <button style="flex-grow: 1;">Đăng ký</button>
                </div>
            </div>
            <div class="footer_partner">
                <h3>Đối tác</h3>
                <div class="flex">
                    <img src="~assets/imgs/pn/vnpayqr.svg" alt="">
                    <img src="~assets/imgs/pn/zalopay.svg" alt="">
                    <img src="~assets/imgs/pn/vinid.svg" alt="">
                </div>
            </div>
        </div>
        <div class="footer__bottom">
            <p>COPYRIGHT BY <a href="https://anvui.vn/">ANVUI</a> - 2020</p>
        </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
.footer__top .logo__bottom {
    margin-bottom: 16px;
}
.footer__top {
    background: #F9FAFC;
    padding: 24px 16px;
}

.footer__intro {
    margin-bottom: 16px;
}

.footer__intro>h2 {
color: #FF4868;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 16px;
}

.footer__intro>p {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #383F47;
    margin-bottom: 16px;
}

.footer__intro>p b {
    color: #FF4868;
    font-weight: normal;
}

.footer__contact {
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid #ECEDF1;
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
    height: 40px;
    padding: 12px 16px;
    background: #ECEDF1;
    border-radius: 4px;
    margin-right: 8px;
}

.footer__contact input::placeholder {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #9399A9;
}

.footer__contact button {
    height: 40px;
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

.footer_partner img {
    margin-right: 16px;
}
.footer_partner h3{
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    color: #383F47;
    margin-bottom: 16px;
}

.footer_partner img {
    height: 32px;
    width: auto;
}
.footer__bottom {
    padding: 8px;
    background: #FFDAE1;
}

.footer__bottom p {
    text-align: center;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #FF4868;
}
</style>