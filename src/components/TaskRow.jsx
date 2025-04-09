import { memo } from "react"
import { Link } from "react-router-dom"
const TaskRow = memo(({ props, checked, onToggle }) => {


    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(props.id)}
                />
            </td>
            <td><Link to={`/task/${props.id}`}>{props.title}</Link></td>
            <td style={{
                backgroundColor: (props.status === 'Done')
                    ? 'green' : (props.status === 'Doing') ? 'yellow' : 'red'
            }}>
                {props.status}
            </td>
            <td>{new Date(props.createdAt).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
        </tr>
    )
})

export default TaskRow