import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../Components/RootLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import ProtectedPage from "../Auth/ProtectedPage";
import ErrorHandler from "../Components/Errors/ErrorHandler";
import Todos from "../Pages/Todos";

const userDataString = localStorage.getItem("loggedUserData");
const userData = userDataString ? JSON.parse(userDataString) : null;
const Routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
            <Route index element={
                <ProtectedPage isAllowed={userData?.jwt} redirected="/login">
                    <Home />
                </ProtectedPage>
            } />
            <Route path="todos" element={
                <ProtectedPage isAllowed={userData?.jwt} redirected="/login">
                    <Todos />
                </ProtectedPage>
            }
            />
            <Route path="register" element={
                <ProtectedPage isAllowed={!userData?.jwt} redirected="/">
                    <Register />
                </ProtectedPage>
            } />
            <Route path="login" element={
                <ProtectedPage isAllowed={!userData?.jwt} redirected="/">
                    <Login />
                </ProtectedPage>
            } />
        </Route>
    )
)

export default Routes;