import { Badge, Col, Image } from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";
export const ItemImageDisplay = ({ image, index, removeImage }) => (
    <Col xs={2} sm={2} md={2}>
        <div className="position-relative mb-2"
            style={{ width: "85px", height: "110px" }}>
            <Image
                thumbnail
                src={image}
                style={{ width: "85px", height: "110px", marginBottom: "10px" }}
            />
            <Badge
                className="p-0"
                pill
                bg="secondary"
                text="white"
                style={{
                    position: "absolute",
                    top: "-7px",
                    right: "-7px",
                    cursor: "pointer",
                    zIndex: "1"
                }}
                onClick={() => removeImage(index)}
            >
                <MdOutlineCancel size={20} />
            </Badge>
        </div>
    </Col>
);
