import { BrowserRouter } from "react-router-dom"
import { RoutesApp } from "./routes"


export const App = () => {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  )
}