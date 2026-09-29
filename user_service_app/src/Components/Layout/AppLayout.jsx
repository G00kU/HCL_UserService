import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Sidebar */}
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            {/* Topbar */}
            <Topbar />

            {/* Page Content */}
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