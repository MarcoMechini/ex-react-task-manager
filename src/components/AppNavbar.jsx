import { NavLink } from "react-router-dom";

export default function AppNavbar() {
    const menu = [
        { path: '/', name: 'TaskList' },
        { path: '/AddTask', name: 'AddTask' }
    ];

    return (
        <header className="app-navbar">
            <nav className="app-navbar-nav">
                {menu.map((link, i) => (
                    <NavLink
                        key={i}
                        to={link.path}
                        className={({ isActive }) =>
                            isActive ? 'nav-link active' : 'nav-link'
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}
            </nav>
        </header>
    );
}
