import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";

const Sidebar = ({ collapsed, setCollapsed }) => {
    const { logout } = useAuth();
    return (
        <aside
            className={`
                fixed
                left-0
                top-0
                z-40
                h-screen
                border-r
                border-slate-200
                bg-white
                transition-all
                duration-300
                ${collapsed ? "w-20" : "w-64"}
            `}
        >
            {/* Logo */}
            <div
                className="
                    flex
                    h-16
                    items-center
                    justify-between
                    border-b
                    border-slate-200
                    px-4
                "
            >
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                bg-[#FFC20E]
                                font-bold
                                text-slate-900
                            "
                        >
                            A
                        </div>

                        <span
                            className="
                                text-lg
                                font-bold
                                text-slate-900
                            "
                        >
                            Admin
                        </span>
                    </div>
                )}

                {collapsed && (
                    <div
                        className="
                            mx-auto
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-[#FFC20E]
                            font-bold
                            text-slate-900
                        "
                    >
                        A
                    </div>
                )}
            </div>
            <nav className="space-y-1 p-3">
                <NavItem
                    icon={<Users size={19} />}
                    label="Users"
                    collapsed={collapsed}
                    active
                />
            </nav>
            <div
                className="
                    absolute
                    bottom-0
                    w-full
                    border-t
                    border-slate-200
                    p-3
                "
            >
                {/* Logout */}
                <button
                    type="button"
                    className={`
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-lg
                        px-3
                        py-2.5
                        text-sm
                        text-slate-600
                        transition
                        hover:bg-red-50
                        hover:text-red-600
                        ${collapsed ? "justify-center" : ""}
                    `}
                    onClick={() => {
                        logout();
                    }}
                >
                    <LogOut size={19} />

                    {!collapsed && (
                        <span>Logout</span>
                    )}
                </button>

                {/* Collapse */}
                <button
                    type="button"
                    onClick={() => setCollapsed(!collapsed)}
                    className="
                        mt-2
                        flex
                        w-full
                        items-center
                        justify-center
                        rounded-lg
                        p-2
                        text-slate-400
                        transition
                        hover:bg-[#FFF4CC]
                        hover:text-[#C49500]
                    "
                >
                    {collapsed ? (
                        <ChevronRight size={18} />
                    ) : (
                        <ChevronLeft size={18} />
                    )}
                </button>
            </div>
        </aside>
    );
};

const NavItem = ({
    icon,
    label,
    collapsed,
    active = false,
}) => {
    return (
        <button
            type="button"
            className={`
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-2.5
                text-sm
                font-medium
                transition
                ${collapsed ? "justify-center" : ""}
                ${active
                    ? "bg-[#FFF4CC] text-slate-900"
                    : "text-slate-600 hover:bg-[#FFF8DD] hover:text-slate-900"
                }
            `}
        >
            <span
                className={
                    active
                        ? "text-[#C49500]"
                        : "text-slate-500"
                }
            >
                {icon}
            </span>

            {!collapsed && (
                <span>{label}</span>
            )}
        </button>
    );
};

export default Sidebar;