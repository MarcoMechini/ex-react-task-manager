import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const api = import.meta.env.VITE_API_URL

async function fetchData(apiUrl) {
    const fetchData = await fetch(apiUrl)
    const jsonData = await fetchData.json()
    return jsonData
}

export default function useTask() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const reponse = await fetchData(`${api}/tasks`);
                setTasks(reponse);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

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
            const jsonData = await fetchData.json()
            if (!jsonData.success) {
                throw new Error(jsonData.message);
            }
            alert('salvataggio effettuato')
            setTasks(prev => [...prev, jsonData.task])
        } catch (error) {
            console.log('errore', error);
            alert(error);
        }
    }

    async function removeTask(id) {
        const fetchData = await fetch(`${api}/tasks/${id}`, { method: 'DELETE' });
        const jsonData = await fetchData.json();
        if (!jsonData.success) {
            throw new Error(jsonData.message);
        }
        setTasks(prev => prev.filter(p => p.id !== id))
    }

    async function removeMultipleTasks(ids) {
        const deleteRequests = ids.map(id =>
            fetch(`${api}/tasks/${id}`, { method: 'DELETE' })
                .then(res => res.json())
        )

        const results = await Prosime.allSettled(deleteRequests)

        const fullfilledDeletions = [];
        const rejectedDeletions = [];

        results.forEach((result, index) => {
            const taskId = ids[index];
            if (result.status === "fulfilled" && result.value.success) {
                fullfilledDeletions.push(taskId)
            } else {
                rejectedDeletions.push(taskId)
            }
        });

        if (fullfilledDeletions.length > 0) {
            setTasks(prev =>
                prev.filter(t => !fullfilledDeletions.includes(t.id)))
        }

        if (rejectedDeletions.length > 0) {
            throw new Error("Errore nell'eliminazione delle task con id: ", rejectedDeletions.join(", "));
        }

    }


    async function updateTask(form, id) {


        const requestOption = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: form.title,
                description: form.description,
                status: form.status
            }),
        }

        try {
            const fetchData = await fetch(`${api}/tasks/${id}`, requestOption);
            const jsonData = await fetchData.json();
            if (!jsonData.success) {
                throw new Error(fetchData.status);
            }
            setTasks(prev => prev.map(p => p.id === jsonData.task.id ? jsonData.task : p))

        } catch (error) {
            console.log('errore', error);
            alert(error);
        }
    }

    return [tasks, addTask, removeTask, updateTask, removeMultipleTasks];
}