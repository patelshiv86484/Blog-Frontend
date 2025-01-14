import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import { AuthLayout,Login } from './components/index.js'
import Home from './pages/home.jsx'
import AddPost from "./pages/Addpost";
import Signup from './pages/signup.jsx'
import EditPost from "./pages/editPost.jsx";
import Post from "./pages/post.jsx";
import AllPosts from "./pages/Allposts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />, 
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* provider for redux tool-kit and RouterProvider for react-router-dom in substitution to <App /> */}
   < Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)