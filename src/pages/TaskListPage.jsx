import { useMemo, useState } from "react";
import TaskRow from "../components/TaskRow";
import { useGlobalContext } from "../context/GlobalContext";
import { useCallback } from "react";

export default function TaskListPage() {
    const { tasks } = useGlobalContext();

    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState(1)

    const handleSort = e => {
        const currOrder = e.target.dataset.value;
        if (sortBy === currOrder) {
            setSortOrder(!sortOrder)
        } else {
            setSortBy(currOrder)
            setSortOrder(1)
        }
    }

    function debounce(callback, delay) {
        let timer;
        return (value) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(value)
            }, delay)
        }
    }




    const orderedTask = useMemo(() => {
        // Cloniamo l'array per non mutare quello originale
        let result = [...tasks];


        // Filtro per la search query (case insensitive)

        if (searchQuery) {
            result = result.filter(t =>
                t.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }


        // Ordinamento in base al sortBy e sortOrder
        if (sortBy === 'title') {
            result.sort((a, b) =>
                sortOrder
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            );
        } else if (sortBy === 'status') {
            const option = {
                'To do': 0,
                'Doing': 1,
                'Done': 2
            };

            result.sort((a, b) =>
                sortOrder
                    ? option[a.status] - option[b.status]
                    : option[b.status] - option[a.status]
            );
        } else if (sortBy === 'createdAt') {
            result.sort((a, b) =>
                sortOrder
                    ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        }

        return result;
    }, [tasks, sortBy, sortOrder, searchQuery]);


    if (!tasks) {
        return <div>Caricamento...</div>; // Gestione del caricamento o errore
    }

    return (
        <>

            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <table>
                <thead>
                    <tr>
                        <th data-value='title' onClick={handleSort}>Nome</th>
                        <th data-value='status' onClick={handleSort}>Stato</th>
                        <th data-value='createdAt' onClick={handleSort}>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {orderedTask.map(t =>
                        <TaskRow key={t.id} props={t}></TaskRow>
                    )}
                </tbody>
            </table>
        </>
    );
}