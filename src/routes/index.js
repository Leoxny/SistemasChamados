import { Routes, Route } from 'react-router-dom'
import { SingInScreen } from '../pages/Login/SingIn'
import { SingUpScreen } from '../pages/Login/SingUp'
import { DashboardScreen } from '../pages/Dashboard'
import { Private } from './Private'
import { ProfileScreen } from '../pages/Profile'

export const RoutesApp = () => {
    return (
        <Routes>
            <Route path='/' element={<SingInScreen />} />
            <Route path='/register' element={<SingUpScreen />} />
            <Route path='/dashboard' element={<Private> <DashboardScreen /> </Private>} />
            <Route path='/profile' element={<Private> <ProfileScreen /> </Private>} />
        </Routes>
    )
}