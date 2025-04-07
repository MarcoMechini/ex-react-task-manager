import ReactDOM from "react-dom"

export default function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="overlay">
            <div className="modal">
                <h4 className="modal-title">{title}</h4>
                <div className="modal-content">{content}</div>
                <div className="button-container">
                    <button className="cancel-button" onClick={onClose}>Chiudi</button>
                    <button className="confirm-button" onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    )
}
