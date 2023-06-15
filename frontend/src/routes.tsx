import { createBrowserRouter } from "react-router-dom";
import Home from "./Screens/Home";
import Form from "./Screens/Form";
import Brand from "./Screens/Brand";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Form />,
      },
      {
        path: ":brand",
        element: <Brand />,
      },
    ],
  },
]);
