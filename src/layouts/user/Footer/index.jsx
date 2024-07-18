import { Col, Container, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./style.scss"
import { IoLogoInstagram, IoLogoFacebook, IoLogoYoutube, IoLogoTiktok } from "react-icons/io5";
export const Footer = () => {
    return (
        <div id="footer-user" className="pt-5 pb-3 mt-5">
            <Container>
                <Row xs={12} lg={12} className='ml-row'>
                    <Col sm={12} md={3} className="p-0">
                        <Stack gap={9}>
                            <div className="title-footer">Sporter</div>
                            <div className="year">© 2024</div>
                            <Stack className='icons' direction="horizontal">
                                <Link><IoLogoInstagram /></Link>
                                <Link><IoLogoFacebook /></Link>
                                <Link><IoLogoYoutube /></Link>
                                <Link><IoLogoTiktok /></Link>
                            </Stack>

                        </Stack>
                    </Col>
                    <Col sm={6} md={3} className="p-0">
                        <Stack gap={9}>
                            <div className="sub-title">Tài nguyên</div>
                            <div className="text-link"><Link>Sản phẩm</Link></div>
                            <div className="text-link"><Link>Blog</Link></div>
                            <div className="text-link"><Link>Nhà cung cấp</Link></div>
                            <div className="text-link"><Link>Chứng nhận</Link></div>
                        </Stack>
                    </Col>
                    <Col sm={6} md={3} className="p-0">
                        <Stack gap={9}>
                            <div className="sub-title">Hỗ trợ</div>
                            <div className="text-link"><Link>Hướng dẫn sử dụng</Link></div>
                            <div className="text-link"><Link>Hướng dẫn mua hàng</Link></div>
                            <div className="text-link"><Link>Chăm sóc khách hàng</Link></div>
                            <div className="text-link"><Link>Phản hồi khiếu nại</Link></div>
                        </Stack>
                    </Col>
                    <Col sm={6} md={3} className="p-0">
                        <Stack gap={9}>
                            <div className="sub-title">Sporter</div>
                            <div className="text-link"><Link>Về chúng tôi</Link></div>
                            <div className="text-link"><Link>Liên hệ</Link></div>
                            <div className="text-link"><Link>Điều khoản bảo mật</Link></div>
                            <div className="text-link"><Link>Điều khoản sử dụng</Link></div>
                        </Stack>
                    </Col>
                </Row>
                <Row className="ml-row">
                    <Stack gap={9} className="p-0">
                        <div className="sub-title">Thông tin doanh nghiệp</div>
                        <div className="text">Công ty TNHH Công Nghệ A Plus</div>
                        <div className="text">Giấy chứng nhận Đăng ký doanh nghiệp số: 0109675459 do Sở Kế hoạch và Đầu tư thành phố Hà Nội cấp ngày 17/06/2021.</div>
                        <div className="text">Điện thoại liên hệ/Hotline: 096 369 5525</div>
                        <div className="text">Email: nonglam@gmail.com.</div>
                    </Stack>
                </Row>
                <Row className='copyright justify-content-md-center'>
                    @ 2024 - Bản quyền của Công ty TNHH Công Nghệ Watermelon.
                </Row>
            </Container>
        </div>
    )
}