import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
                Nhận Combo quà tặng khi mua 2 bộ{' '}
                <Link>
                    <strong className="text-warning">XEM CHI TIẾT</strong>
                </Link>
            </>
        ),
    },
    {
        iconUrl: '//theme.hstatic.net/1000061481/1001035882/14/icon_promotion3.png?v=1879',
        altText: 'icon',
        text: (
            <>
                Giao hàng siêu tốc TP.HCM, Biên Hoà trong 1-&gt;2h.{' '}
                <Link>
                    <strong className="text-warning">XEM CHI TIẾT</strong>
                </Link>
            </>
        ),
    },
    {
        iconUrl: '//theme.hstatic.net/1000061481/1001035882/14/icon_promotion4.png?v=1879',
        altText: 'icon',
        text: (
            <>
                Thanh toán tiện lợi bằng tiền mặt (COD), chuyển khoản, Paypal...{' '}
                <Link>
                    <strong className="text-warning">XEM CHI TIẾT</strong>
                </Link>
            </>
        ),
    },
    {
        iconUrl: '//theme.hstatic.net/1000061481/1001035882/14/icon_promotion5.png?v=1879',
        altText: 'icon',
        text: (
            <>
                Miễn phí vận chuyển cho tất cả các đơn hàng từ 1.000d trở lên{' '}
                <Link>
                    <strong className="text-warning">XEM CHI TIẾT</strong>
                </Link>
            </>
        ),
    },
    {
        iconUrl: '//theme.hstatic.net/1000061481/1001035882/14/icon_promotion6.png?v=1879',
        altText: 'icon',
        text: (
            <>
                Đổi hàng trong vòng 20-&gt;30 ngày với sản phẩm chưa sử dụng.{' '}
                <Link>
                    <strong className="text-warning">XEM CHI TIẾT</strong>
                </Link>
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

