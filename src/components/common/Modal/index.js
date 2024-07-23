import { Button, Modal } from "react-bootstrap";

export const ConfirmModal = ({ show, confirm, onClose, handleOperations }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{confirm}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Không
                </Button>
                <Button variant="danger" onClick={handleOperations}>
                    Có
                </Button>
            </Modal.Footer>
        </Modal>
    );
};