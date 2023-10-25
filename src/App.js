import { BrowserRouter } from "react-router-dom"
import { RoutesApp } from "./routes"
import { AuthProvider } from "./context/auth"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3000}/>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  )
}