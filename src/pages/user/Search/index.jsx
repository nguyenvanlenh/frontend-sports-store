import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, InputGroup } from 'react-bootstrap';
export const Search = () => {
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Nhập từ khoá bạn muốn tìm kiếm: tên đề thi ..."
                />
                <Button className="btn-search">
                    Tìm kiếm
                </Button>
            </InputGroup>
        </div>
    )
}