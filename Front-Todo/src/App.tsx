import { RouterProvider } from "react-router/dom";
import Routes from "./Routes";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <RouterProvider router={Routes} />
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  )
}

export default App;
