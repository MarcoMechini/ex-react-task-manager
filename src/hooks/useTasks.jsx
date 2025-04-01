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
            try {
                const reponse = await fetchData(`${api}/tasks`)
                setTasks(reponse)
            } catch (error) {
                console.error(error.message);
            }
        })()
    }, [])

    async function addTask(title, description, status) {

        //creo un oggetto dove passo il tipo di chiamata da effettuare l'headers per sapere cosa aspettarsi e l'oggetto che voglio passare dopo averlo trasformato in una stringa
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                status
            }),
        };

        try {
            const fetchData = await fetch(`${api}/tasks`, options)
            if (!fetchData.ok) {
                throw new Error(fetchData.status);
            }
            const jsonData = await fetchData.json()
            alert('salvataggio effettuato')
            return jsonData

        } catch (error) {
            console.log('errore', error);
            alert(error);
        }
    }
    function removeTask() { }
    function updateTask() { }

    return [tasks, addTask, removeTask, updateTask]
}