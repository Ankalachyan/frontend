import { createBrowserRouter } from "react-router-dom";
import About from './pages/About';
import Profile from './pages/Profile';
import Register from "./pages/Register";
import ProtectedLayout from "./components/ProtectedLayout";
import GuestsLayout from "./components/GuestLayout";
import Login from "./pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestsLayout />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },

    {
        path: "/", 
        element: <ProtectedLayout/>,
        children : [
            {
                path : "/about",
                element: <About/>,

            },
            {
                path : "/profile",
                element : <Profile/>
            }
        ]
    }
])
export default router;