import { Routes, Route } from 'react-router-dom'
import { SingInScreen } from '../pages/Login/SingIn'
import { SingUpScreen } from '../pages/Login/SingUp'
import { DashboardScreen } from '../pages/Dashboard'
import { Private } from './Private'
import { ProfileScreen } from '../pages/Profile'
import { CustomersScreen } from '../pages/Customers'
import { NewScreen } from '../pages/New'

export const RoutesApp = () => {
    return (
        <Routes>
            <Route path='/' element={<SingInScreen />} />
            <Route path='/register' element={<SingUpScreen />} />
            <Route path='/dashboard' element={<Private> <DashboardScreen /> </Private>} />
            <Route path='/profile' element={<Private> <ProfileScreen /> </Private>} />
            <Route path='/customers' element={<Private> <CustomersScreen /> </Private>} />
            <Route path='/new' element={<Private> <NewScreen /> </Private>} />
            <Route path='/new/:id' element={<Private> <NewScreen /> </Private>} />
        </Routes>
    )
}