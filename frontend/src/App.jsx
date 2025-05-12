import { Button } from "./components/ui/button";

import './App.css'
import Navbar from "./components/shared/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Singup from "./components/auth/Singup";
import Home from "./components/Home";

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/singup',
    element: <Singup />
  }


])

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
