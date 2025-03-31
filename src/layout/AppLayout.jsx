import { Outlet } from 'react-router-dom'
import AppNavbar from '../components/appNavbar'

export default function AppLayout() {
    return (
        <>
            <AppNavbar></AppNavbar>
            <Outlet />
        </>
    )
}