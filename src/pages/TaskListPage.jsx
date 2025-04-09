import { useMemo, useState, useCallback } from "react";
import TaskRow from "../components/TaskRow";
import { useGlobalContext } from "../context/GlobalContext";

const debounce = (callback, delay) => {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
};

export default function TaskListPage() {
    const { tasks, removeMultipleTasks } = useGlobalContext();
    const [searchQuery, setSearchQuery] = useState();
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);

    const toggleSelection = taskId => {
        setSelectedTaskIds(prev =>
            prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
        );
    };

    const handleDeleteSelected = async () => {
        try {
            await removeMultipleTasks(selectedTaskIds);
            alert("Task eliminate con successo");
            setSelectedTaskIds([]);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleSort = (e) => {
        const currOrder = e.target.dataset.value;
        if (sortBy === currOrder) {
            setSortOrder(sortOrder * -1);
        } else {
            setSortBy(currOrder);
            setSortOrder(1);
        }
    };

    const handleDebounce = useCallback(debounce(setSearchQuery, 500), []);

    const orderedTask = useMemo(() => {
        let result = [...tasks];

        if (searchQuery) {
            result = result.filter((t) =>
                t.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sortBy === "title") {
            result.sort((a, b) =>
                sortOrder === 1
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            );
        } else if (sortBy === "status") {
            const statusOrder = { "To do": 0, "Doing": 1, "Done": 2 };
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
    }, [tasks, sortBy, sortOrder, searchQuery]);

    if (!tasks) {
        return <div className="loading">Caricamento...</div>;
    }

    return (
        <div className="task-list-container">
            <input
                className="search-input"
                type="text"
                placeholder="Cerca per titolo..."
                onChange={e => handleDebounce(e.target.value)}
            />

            {selectedTaskIds.length > 0 && (
                <button className="delete-button" onClick={handleDeleteSelected}>
                    Elimina Selezionate
                </button>
            )}

            <table className="task-table">
                <thead>
                    <tr>
                        <th></th>
                        <th data-value="title" onClick={handleSort}>Nome</th>
                        <th data-value="status" onClick={handleSort}>Stato</th>
                        <th data-value="createdAt" onClick={handleSort}>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {orderedTask.map((t) => (
                        <TaskRow
                            key={t.id}
                            props={t}
                            checked={selectedTaskIds.includes(t.id)}
                            onToggle={toggleSelection}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
