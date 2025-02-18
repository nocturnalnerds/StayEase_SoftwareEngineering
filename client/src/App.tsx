import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/general/AppLayout";
import Home from "./components/homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
