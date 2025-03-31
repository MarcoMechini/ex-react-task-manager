import { NavLink } from "react-router-dom"

export default function AppNavbar() {

    const menu = [
        {
            path: '/',
            name: 'TaskList'
        },
        {
            path: '/AddTask',
            name: 'AddTask'
        }
    ]


    return (<>
        <header style={{ backgroundColor: 'red' }}>
            <nav>
                {menu.map((curlink, i) =>
                    <NavLink key={i} to={curlink.path}>
                        {curlink.name}
                    </NavLink>)}
            </nav>
        </header>
    </>)
}