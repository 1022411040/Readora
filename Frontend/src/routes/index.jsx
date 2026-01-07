import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import UploadEbook from "../pages/Admin/UploadEbook";
import ManageCategories from "../pages/Admin/ManageCategories";
import AdminPermission from "../layout/AdminPermission";
import Register from "../pages/Register";
import CategoryWisebook from "../pages/CategoryWisebook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register/>},
      { path: "category/book", element: <CategoryWisebook/>},
      {
        path: "admin",
        element: <AdminPermission />,
        children: [
          { path: "ebooks/upload", element: <UploadEbook /> },
          { path: "categories", element: <ManageCategories /> }
        ]
      },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

export default router;
