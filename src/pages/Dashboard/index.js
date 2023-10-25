import { useContext } from 'react'
import './style.css'
import { AuthContext } from '../../context/auth'
import { Header } from '../../components/Header'

export const DashboardScreen = () => {

    const { logout } = useContext(AuthContext)

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div>
            <Header />
            <h1>Pagina dash</h1>
            <button onClick={handleLogout}>Sair da conta</button>
        </div>
    )
}