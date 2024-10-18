import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Forgotpassword from "../pages/Forgotpassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUser from "../pages/AllUser";
import AllProduct from "../pages/AllProduct";
import CategoryProduct from "../pages/CategoryProduct";
import AddSlider from "../pages/AddSlider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <Forgotpassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product-Category/:categoryName",
        element: <CategoryProduct />,
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUser />,
          },
          {
            path: "all-Products",
            element: <AllProduct />,
          },
          {
            path: "slider",
            element: <AddSlider />,
          },
        ],
      },
    ],
  },
]);

export default router;
