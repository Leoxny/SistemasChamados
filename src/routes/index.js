import { Routes, Route } from 'react-router-dom'
import { SingInScreen } from '../pages/Login/SingIn'
import { SingUpScreen } from '../pages/Login/SingUp'
import { DashboardScreen } from '../pages/Dashboard'

export const RoutesApp = () => {
    return (
        <Routes>
            <Route path='/' element={<SingInScreen />} />
            <Route path='/register' element={<SingUpScreen />} />
            <Route path='/dashboard' element={<DashboardScreen />} />

        </Routes>
    )
}