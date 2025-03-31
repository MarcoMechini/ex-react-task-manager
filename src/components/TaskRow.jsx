import { memo, useEffect } from "react"

const TaskRow = memo(({ props }) => {

    return (
        <tr>
            <td>{props.title}</td>
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