import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import useAuth from "../../Hooks/useAuth";

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2
                    className="h-6 w-6 animate-spin text-slate-500"
                    aria-label="Checking login session"
                />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/Login" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
            <Topbar />
            <main
                className={`
min-h-screen
pt-16
transition-all
duration-300
                    ${collapsed ? "ml-20" : "ml-64"}
`}
            >
                <div className="p-6">
                    <Outlet />
                </div>
            </main>

        </div>
    );
};

export default AppLayout;