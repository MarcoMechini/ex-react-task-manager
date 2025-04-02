import { useRef, useState } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
    if (!show) return null;

    const formRef = useRef();

    const [formData, setFormData] = useState({
        title: task?.title || "",
        description: task?.description || "",
        status: task?.status || "To do"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal
            title="Modifica Task"
            show={show}
            onClose={onClose}
            onConfirm={() => formRef.current.requestSubmit()}
            confirmText="Salva"
            content={
                <form ref={formRef} onSubmit={handleSubmit}>
                    <label>Nome Task</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Descrizione</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Stato</label>
                    <select name="status" value={formData.status} onChange={handleInputChange}>
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </form>
            }
        />
    );
}
