import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login";
import UserList from "./Pages/UserList";
import Create from "./Components/User/FormControl";
import AppLayout from "./Components/Layout/AppLayout";
// import Edit from "./User/Edit";

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
                            element={<Create />}
                        />
                        <Route
                            path="edit/:id"
                            element={<Create />}
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