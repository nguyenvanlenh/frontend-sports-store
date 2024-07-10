import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';

export const ProductPresentation = () => {
    const [activeTab, setActiveTab] = useState('description');

    const renderContent = () => {
        switch (activeTab) {
            case 'description':
                return (
                    <div>
                        <h2>Mô tả sản phẩm</h2>
                        <p>Nội dung mô tả sản phẩm ở đây.</p>
                        <p>Sản phẩm này là một chiếc áo bóng đá chính hãng Liverpool sân nhà mùa giải 2024/25.</p>
                    </div>
                );
            case 'purchase-guide':
                return (
                    <div>
                        <h2>Hướng dẫn mua hàng</h2>
                        <p>Nội dung hướng dẫn mua hàng ở đây.</p>
                        <ul>
                            <li>Chọn sản phẩm bạn muốn mua.</li>
                            <li>Thêm sản phẩm vào giỏ hàng.</li>
                            <li>Thực hiện thanh toán.</li>
                        </ul>
                    </div>
                );
            case 'policy':
                return (
                    <div>
                        <h2>Chính sách mua hàng</h2>
                        <p>Nội dung chính sách mua hàng ở đây.</p>
                        <ul>
                            <li>Chính sách đổi trả trong vòng 30 ngày.</li>
                            <li>Bảo hành sản phẩm trong vòng 1 năm.</li>
                            <li>Hỗ trợ khách hàng 24/7.</li>
                        </ul>
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
                        Chính sách mua hàng
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <div className="mt-3">
                {renderContent()}
            </div>
        </>
    );
};
