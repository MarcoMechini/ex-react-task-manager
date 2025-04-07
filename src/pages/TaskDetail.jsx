import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect, useMemo, useState } from "react";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask, updateTask } = useGlobalContext();

    const [task, setTask] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    useEffect(() => {
        tasks.map(t => {
            if (t.id === parseInt(id)) {
                setTask(t);
            }
        });
    }, [id]);

    const handleRemoveTask = async () => {
        try {
            await removeTask(parseInt(id));
            alert('Task eliminato correttamente');
            navigate("/");

        } catch (error) {
            console.error(error);
            alert(error.message)

        }
    };
    const handleUpdateTask = async (formData) => {
        await updateTask(formData, id);
        alert('Task modificato correttamente');
        setShowUpdate(false)
    };

    return (
        <>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.status}</div>
            <div>{task.createdAt}</div>
            <button onClick={() => setShowDelete(true)}>Elimina Task</button>
            <button onClick={() => setShowUpdate(true)}>Modifica Task</button>
            <Modal
                title={task.title}
                content={task.content}
                show={showDelete}
                onClose={() => setShowDelete(false)}
                onConfirm={handleRemoveTask}
                confirmText='Elimina Task' />
            <EditTaskModal
                show={showUpdate}
                onClose={() => { setShowUpdate(false) }}
                task={task}
                onSave={handleUpdateTask}
            />
        </>
    );
}