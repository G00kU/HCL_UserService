import {
    Bell,
    Search,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";

const Topbar = ({ }) => {
    const { user } = useAuth();
    return (
        <header
            className="
                fixed
                left-0
                right-0
                top-0
                z-30
                h-16
                border-b
                border-slate-200
                bg-white
            "
        >
            <div className="flex h-full items-center justify-between px-4 lg:px-6">
                <div>
                    <h1 className="text-lg font-semibold text-slate-900">

                    </h1>
                </div>


                {/* Right Section */}
                <div className="flex items-center gap-2">

                    {/* Search */}
                    <button
                        type="button"
                        className="
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-yellow-50
                            hover:text-[#FFC20E]
                        "
                    >
                        <Search size={19} />
                    </button>


                    {/* Notification */}
                    <button
                        type="button"
                        className="
                            relative
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-yellow-50
                            hover:text-[#FFC20E]
                        "
                    >
                        <Bell size={19} />

                        <span
                            className="
                                absolute
                                right-1.5
                                top-1.5
                                h-2
                                w-2
                                rounded-full
                                bg-[#FFC20E]
                            "
                        />
                    </button>


                    {/* Profile */}
                    <div
                        className="
                            ml-2
                            flex
                            items-center
                            gap-2
                            border-l
                            border-slate-200
                            pl-3
                        "
                    >
                        {/* Avatar */}
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-[#FFC20E]
                                text-sm
                                font-bold
                                text-slate-900
                            "
                        >
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>


                        {/* User Info */}
                        <div className="hidden sm:block">
                            <p className="text-sm font-medium text-slate-900">
                                {user?.name}
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </header>
    );
};

export default Topbar;