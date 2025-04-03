import { useMemo, useState } from "react";
import TaskRow from "../components/TaskRow";
import { useGlobalContext } from "../context/GlobalContext";

export default function TaskListPage() {
    const { tasks } = useGlobalContext();

    const [sortBy, setSortBy] = useState('status')
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

    const orderedTask = useMemo(() => {
        switch (sortBy) {
            case 'title':

                return tasks.sort((a, b) => (sortOrder) ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title))

            case 'status':

                const option = {
                    'To do': 0,
                    'Doing': 1,
                    'Done': 2
                }

                return tasks.sort((a, b) => (sortOrder) ? option[a.status] - option[b.status] : option[b.status] - option[a.status])
                break;

            case 'createdAt':
                return tasks.sort((a, b) => (sortOrder) ?
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() :
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;

            default:
                break;
        }

    }, [tasks, sortBy, sortOrder])

    if (!tasks) {
        return <div>Caricamento...</div>; // Gestione del caricamento o errore
    }

    return (
        <>
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