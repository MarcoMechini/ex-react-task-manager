import { memo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
const TaskRow = memo(({ props }) => {
    const navigate = useNavigate()

    return (
        <tr>
            <td onClick={() => navigate(`/task/${props.id}`)}>{props.title}</td>
            <td style={{
                backgroundColor: (props.status === 'Done')
                    ? 'green' : (props.status === 'Doing') ? 'yellow' : 'red'
            }}>
                {props.status}
            </td>
            <td>{props.createdAt}</td>
        </tr>
    )

})

export default TaskRow