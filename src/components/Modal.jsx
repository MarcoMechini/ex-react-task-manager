export default function Modal({ title, content, show, onClose, onConfirm, confirmText }) {
    if (!show) return null;

    return (
        <div className="overlay">
            <div className="modal">
                <h4 className="modal-title">{title}</h4>
                <p className="modal-content">{content}</p>
                <div className="button-container">
                    <button className="cancel-button" onClick={onClose}>Chiudi</button>
                    <button className="confirm-button" onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>
    );
}
