import React, { useState } from "react";
import { Nav } from "react-bootstrap";

export const ProductPresentation = ({ product }) => {
    const [activeTab, setActiveTab] = useState("description");

    const renderContent = () => {
        switch (activeTab) {
            case "description":
                return (
                    <>
                        <h2>Mô tả sản phẩm</h2>
                        <p>{product.shortDescription}</p>
                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </>
                );
            case "purchase-guide":
                return (
                    <div>
                        <h2 className="text-center mb-4 fw-bold">Hướng Dẫn Mua Hàng</h2>
                        <p>Chào mừng bạn đến với hướng dẫn mua hàng của chúng tôi. Dưới đây là các bước đơn giản để hoàn tất việc mua sắm:</p>
                        <ul>
                            <li><strong>Chọn sản phẩm:</strong> Duyệt qua danh mục sản phẩm và chọn sản phẩm bạn yêu thích.</li>
                            <li><strong>Thêm vào giỏ hàng:</strong> Nhấn vào nút "Thêm vào giỏ hàng" để lưu sản phẩm cho lần thanh toán.</li>
                            <li><strong>Thanh toán:</strong> Điền thông tin giao hàng, lựa chọn phương thức thanh toán và hoàn tất đơn hàng.</li>
                        </ul>
                        <p className="mt-3">Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ đội ngũ hỗ trợ của chúng tôi. Chúc bạn có trải nghiệm mua sắm tuyệt vời!</p>
                    </div>
                );
            case "policy":
                return (
                    <div>
                        <h2 className="text-center mb-4 fw-bold">Chính Sách Mua Hàng</h2>
                        <p>Chúng tôi cam kết mang đến cho bạn chính sách mua hàng tốt nhất với các điều khoản sau:</p>
                        <ul>
                            <li><strong>Đổi trả dễ dàng:</strong> Bạn có thể đổi trả sản phẩm trong vòng 30 ngày kể từ ngày mua.</li>
                            <li><strong>Bảo hành dài hạn:</strong> Mọi sản phẩm đều được bảo hành lên đến 1 năm với điều kiện đi kèm.</li>
                            <li><strong>Hỗ trợ khách hàng 24/7:</strong> Đội ngũ chăm sóc khách hàng luôn sẵn sàng giải đáp mọi thắc mắc của bạn.</li>
                        </ul>
                        <p className="mt-3">Vui lòng đọc kỹ các điều khoản trên để có trải nghiệm mua sắm thuận lợi và an tâm hơn.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Nav
                variant="underline"
                defaultActiveKey="description"
                onSelect={(selectedKey) => setActiveTab(selectedKey)} >
                <Nav.Item>
                    <Nav.Link
                        eventKey="description"
                        className="text-secondary">
                        Mô tả sản phẩm
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="purchase-guide"
                        className="text-secondary">
                        Hướng dẫn mua hàng
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="policy"
                        className="text-secondary">
                        Chính sách bảo hành
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <div className="my-4 ps-0">
                {renderContent()}
            </div>
        </>
    );
};
