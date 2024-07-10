import { Button } from "react-bootstrap"

export const ButtonAction = ({ content = "Ok", color, handleOperations }) => {
    return (
        <Button variant={color} onClick={handleOperations} className="me-2">{content}</Button>
    )
}