import React from 'react';
import { Image } from 'react-bootstrap';

const promotionContent = {
    paddingTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
};

const flexPromotion = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '13px',
    flex: '0 0 33.33%',
    padding: '0 15px',
    justifyContent: 'center',
};

const promotions = [
    {
        iconUrl: '//theme.hstatic.net/1000061481/1001035882/14/icon_promotion1.png?v=1879',
        altText: 'icon',
        text: (
            <>
                <a href="tel:0987654321">
                    <span>
                        <strong className="text-warning">0987.654.321</strong>
                    </span>
                </a>{' '}
                Hotline đặt hàng (8h30 - 21h) T2 -&gt; CN
            </>
        ),
    },
    {
        iconUrl: '//theme.hstatic.net/1000061481/1001035882/14/icon_promotion2.png?v=1879',
        altText: 'icon',
        text: (
            <>
                Nhận Combo quà tặng khi mua giày{' '}
                <a href="https://www.neymarsport.com/pages/chinh-sach-quy-doi-qua-tang">
                    <strong className="text-warning">XEM CHI TIẾT</strong>
                </a>
            </>
        ),
    },
    {
        iconUrl: '//theme.hstatic.net/1000061481/1001035882/14/icon_promotion3.png?v=1879',
        altText: 'icon',
        text: (
            <>
                Giao hàng siêu tốc TP.HCM, Biên Hoà trong 1-&gt;2h.{' '}
                <a href="https://neymarsport.com/pages/chinh-sach-van-chuyen">
                    <strong className="text-warning">XEM CHI TIẾT</strong>
                </a>
            </>
        ),
    },
    {
        iconUrl: '//theme.hstatic.net/1000061481/1001035882/14/icon_promotion4.png?v=1879',
        altText: 'icon',
        text: (
            <>
                Thanh toán tiện lợi bằng tiền mặt, chuyển khoản, cà thẻ...{' '}
                <a href="https://neymarsport.com/pages/thong-tin-tai-khoan">
                    <strong className="text-warning">XEM CHI TIẾT</strong>
                </a>
            </>
        ),
    },
    {
        iconUrl: '//theme.hstatic.net/1000061481/1001035882/14/icon_promotion5.png?v=1879',
        altText: 'icon',
        text: (
            <>
                Miễn phí vận chuyển cho đơn hàng từ 1.000.000vnd trở lên{' '}
                <a href="https://www.neymarsport.com/pages/chinh-sach-van-chuyen">
                    {' '}
                    <strong className="text-warning">XEM CHI TIẾT</strong>
                </a>
            </>
        ),
    },
    {
        iconUrl: '//theme.hstatic.net/1000061481/1001035882/14/icon_promotion6.png?v=1879',
        altText: 'icon',
        text: (
            <>
                Đổi hàng trong vòng 7-&gt;14 ngày với sản phẩm chưa sử dụng.{' '}
                <a href="https://www.neymarsport.com/pages/huong-dan-doi-hang">
                    <strong className="text-warning">XEM CHI TIẾT</strong>
                </a>
            </>
        ),
    },
];

export const Promotion = () => {
    return (
        <div style={promotionContent}>
            {promotions.map((promo, index) => (
                <div key={index} style={flexPromotion}>
                    <div>
                        <Image
                            width="30"
                            height="30"
                            data-src={promo.iconUrl}
                            src={promo.iconUrl}
                        />
                    </div>
                    <div>{promo.text}</div>
                </div>
            ))}
        </div>
    );
};

