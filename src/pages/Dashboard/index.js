import { useContext } from 'react'
import './style.css'
import { AuthContext } from '../../context/auth'

export const DashboardScreen = () => {

    const { logout } = useContext(AuthContext)

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div>
            <h1>Pagina dash</h1>
            <button onClick={handleLogout}>Sair da conta</button>
        </div>
    )
}