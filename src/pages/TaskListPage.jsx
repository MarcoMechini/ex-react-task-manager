import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import TaskRow from "../components/TaskRow";
import { useGlobalContext } from "../context/GlobalContext";

export default function TaskListPage() {
    const { tasks } = useGlobalContext();
    const searchQuery = useRef('');
    // Stato per memorizzare il valore di ricerca con debounce
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);

    const handleSort = (e) => {
        const currOrder = e.target.dataset.value;
        if (sortBy === currOrder) {
            setSortOrder(sortOrder * -1);
        } else {
            setSortBy(currOrder);
            setSortOrder(1);
        }
    };

    // Funzione debounce: ritarda l'esecuzione della callback fino a quando
    // non è trascorso il tempo specificato dall'ultima chiamata
    const debounce = (callback, delay) => {
        let timer;
        return (value) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(value);
            }, delay);
        };
    };

    // Memoizza la funzione debounce per evitare di ricrearla ad ogni render
    const handleDebounce = useCallback(
        debounce((query) => {
            setDebouncedQuery(query);
        }, 500),
        []
    );

    // Effetto per aggiornare il valore di ricerca con debounce
    useEffect(() => {
        handleDebounce(searchQuery.current.value);
    }, [searchQuery.current.value, handleDebounce]);

    const orderedTask = useMemo(() => {
        let result = [...tasks];

        // Filtra le attività in base alla query di ricerca (case insensitive)
        if (debouncedQuery) {
            result = result.filter((t) =>
                t.title.toLowerCase().includes(debouncedQuery.toLowerCase())
            );
        }

        if (sortBy === "title") {
            result.sort((a, b) =>
                sortOrder === 1
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            );
        } else if (sortBy === "status") {
            const statusOrder = { "To do": 0, Doing: 1, Done: 2 };
            result.sort((a, b) =>
                sortOrder === 1
                    ? statusOrder[a.status] - statusOrder[b.status]
                    : statusOrder[b.status] - statusOrder[a.status]
            );
        } else if (sortBy === "createdAt") {
            result.sort((a, b) =>
                sortOrder === 1
                    ? new Date(a.createdAt) - new Date(b.createdAt)
                    : new Date(b.createdAt) - new Date(a.createdAt)
            );
        }

        return result;
    }, [tasks, sortBy, sortOrder, debouncedQuery]);

    if (!tasks) {
        return <div>Caricamento...</div>;
    }

    return (
        <>
            <input
                type="text"
                ref={searchQuery}
                placeholder="Cerca per titolo..."
                onChange={() => handleDebounce(searchQuery.current.value)}
            />

            <table>
                <thead>
                    <tr>
                        <th data-value="title" onClick={handleSort}>Nome</th>
                        <th data-value="status" onClick={handleSort}>Stato</th>
                        <th data-value="createdAt" onClick={handleSort}>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {orderedTask.map((t) => (
                        <TaskRow key={t.id} props={t} />
                    ))}
                </tbody>
            </table>
        </>
    );
}
