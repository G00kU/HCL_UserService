import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login";
import AppLayout from "./Components/Layout/AppLayout";
import UserList from "./Pages/User/UserList";
import EditUser from "./Pages/User/EditUser";
import AddUser from "./Pages/User/AddUser";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/Login" replace />}
                />
                <Route
                    path="/Login"
                    element={<Login />}
                />
                <Route element={<AppLayout />}>
                    <Route path="/user">
                        <Route
                            index
                            element={<UserList />}
                        />
                        <Route
                            path="add"
                            element={<AddUser />}
                        />
                        <Route
                            path="edit/:id"
                            element={<EditUser />}
                        />
                    </Route>
                </Route>
                <Route
                    path="*"
                    element={<Navigate to="/Login" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;