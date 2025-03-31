import TaskRow from "../components/TaskRow"
import { useGlobalContext } from "../context/GlobalContext"

export default function TaskListPage() {

    const { tasks } = useGlobalContext()
    console.log(tasks);

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
    )
}