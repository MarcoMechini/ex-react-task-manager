import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const api = import.meta.env.VITE_API_URL

async function fetchData(apiUrl) {
    const fetchData = await fetch(apiUrl)
    const jsonData = await fetchData.json()
    return jsonData
}

export default function useTask() {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        (async () => {
            const reponse = await fetchData(`${api}/tasks`)
            setTasks(reponse)
        })()
    }, [])

    function addTask() { }
    function removeTask() { }
    function updateTask() { }

    return [tasks, addTask, removeTask, updateTask]
}