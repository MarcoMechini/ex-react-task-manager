import { useParams } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext"
import { useEffect, useMemo, useState } from "react"


export default function TaskDetail() {
    const { id } = useParams()
    const { tasks, removeTask } = useGlobalContext()

    const [task, setTask] = useState({})

    useEffect(() => {
        console.log('tasks', tasks);
        console.log(id);

        tasks.map(t => {
            if (t.id === parseInt(id)) {
                setTask(t)
            }
        })
    }, [id])


    return (
        <>
            <button onClick={() => console.log(task)}>aaaaaaaaa</button>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.status}</div>
            <div>{task.createdAt}</div>
            <button onClick={() => removeTask(id)}>Elimina Task</button>
        </>
    )
}