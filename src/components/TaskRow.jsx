import { memo, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
const TaskRow = memo(({ props }) => {
    const navigate = useNavigate()

    return (
        <tr>
            {/* <td onClick={() => navigate(`/task/${props.id}`)} style={{ cursor: 'pointer' }}>{props.title}</td> */}
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