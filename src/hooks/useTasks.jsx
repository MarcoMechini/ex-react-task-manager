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
    const [flag, setFlag] = useState(false);

    const flagToggle = () => {
        setFlag(!flag)
    }

    useEffect(() => {
        (async () => {
            try {
                const reponse = await fetchData(`${api}/tasks`);
                setTasks(reponse);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [flag]);

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
            flagToggle()
            return jsonData

        } catch (error) {
            console.log('errore', error);
            alert(error);
        }
    }

    async function removeTask(id) {
        try {
            const fetchData = await fetch(`${api}/tasks/${id}`, { method: 'DELETE' });
            const jsonData = await fetchData.json();
            if (!jsonData.success) {
                throw new Error(fetchData.status);
            }
            flagToggle()
            alert('Task eliminato correttamente');
        } catch (error) {
            console.log('errore', error);
            alert(error);
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

            flagToggle()
            alert('Task modificato correttamente');
            //modifica la task nello stato globale            
        } catch (error) {
            console.log('errore', error);
            alert(error);
        }
    }

    return [tasks, addTask, removeTask, updateTask];
}