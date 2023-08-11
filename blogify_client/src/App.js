import "./App.css";
import "./style.scss";
import Navbar from "./components/Navbar";
import BlogView from "./pages/BlogView";
import PublicBlogs from "./pages/PublicBlogs";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";
import PrivateBlogs from './pages/PrivateBlogs'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Footer from "./components/Footer";
import Account from "./pages/Account";

import { AuthContextProvider } from "./context/authContext";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/privateBlogs/:id",
        element: <PrivateBlogs />,
      },
      {
        path: "/blog/:id",
        element: <BlogView />,
      },
      {
        path: "/create",
        element: <CreateBlog />,
      },
      {
        path: "/write",
        element: <CreateBlog />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <div className="app">
        <div className="containerr">
          <RouterProvider router={router} />
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default App;
