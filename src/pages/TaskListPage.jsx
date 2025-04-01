import TaskRow from "../components/TaskRow";
import { useGlobalContext } from "../context/GlobalContext";

export default function TaskListPage() {
    const { tasks } = useGlobalContext();

    if (!tasks) {
        return <div>Caricamento...</div>; // Gestione del caricamento o errore
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(t =>
                        <TaskRow key={t.id} props={t}></TaskRow>
                    )}
                </tbody>
            </table>
        </>
    );
}