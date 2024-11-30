import { createBrowserRouter } from "react-router-dom";
import CreateUser from "../components/CreateUser";
import Root from "../Root/Root";
import AllUser from "../components/Alluser";
import UpdateUser from "../components/UpdateUser";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <CreateUser />
            },
            {
                path: 'alluser',
                element: <AllUser />,
                loader: () => fetch('http://localhost:5001/users')
            },
            {
                path: 'updateuser/:id',
                element: <UpdateUser />,
                loader: ({ params }) => fetch(`http://localhost:5001/user/${params.id}`)
            }
        ]
    }
])
export default router;