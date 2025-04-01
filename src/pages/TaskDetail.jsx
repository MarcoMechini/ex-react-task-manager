import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect, useMemo, useState } from "react";

export default function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask } = useGlobalContext();

    const [task, setTask] = useState({});

    useEffect(() => {
        tasks.map(t => {
            if (t.id === parseInt(id)) {
                setTask(t);
            }
        });
    }, [id]);

    const handleRemoveTask = () => {
        removeTask(id);
        navigate('/');
    };

    return (
        <>
            <button onClick={() => console.log(task)}>aaaaaaaaa</button>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.status}</div>
            <div>{task.createdAt}</div>
            <button onClick={handleRemoveTask}>Elimina Task</button>
        </>
    );
}