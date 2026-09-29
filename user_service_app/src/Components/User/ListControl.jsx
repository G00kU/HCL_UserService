import { useMemo, useState } from "react";
import {
    Search,
    Pencil,
    Trash2,
    User,
    Users,
    MapPin,
    Plus
} from "lucide-react";

const ListControl = ({
    users = [],
    onEdit,
    onDelete,
    onAdd
}) => {
    const [search, setSearch] = useState("");

    const filteredUsers = useMemo(() => {
        const value = search.toLowerCase().trim();

        if (!value) {
            return users;
        }

        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(value) ||
                user.city.toLowerCase().includes(value) ||
                user.state.toLowerCase().includes(value) ||
                user.pincode.includes(value)
        );
    }, [users, search]);

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <div
                    className="
                        mb-6
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >
                    <div>
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-[#FFC20E]
                                    text-slate-900
                                    shadow-sm
                                "
                            >
                                <Users size={21} />
                            </div>

                            <div>
                                <h1
                                    className="
                                        text-2xl
                                        font-bold
                                        tracking-tight
                                        text-slate-900
                                    "
                                >
                                    Users
                                </h1>

                                <p className="text-sm text-slate-500">
                                    Manage and view all users
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-2
                            shadow-sm
                        "
                    >
                        <Users
                            size={17}
                            className="text-[#C49500]"
                        />

                        <span className="text-sm font-medium text-slate-700">
                            {users.length}
                        </span>

                        <span className="text-sm text-slate-400">
                            {users.length === 1
                                ? "User"
                                : "Users"}
                        </span>
                        <button
                            type="button"
                            onClick={() => onAdd?.()}
                            className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-[#FFC20E]
            px-4
            py-2
            text-sm
            font-semibold
            text-slate-900
            shadow-sm
            transition
            hover:bg-[#E6AE00]
            focus:outline-none
            focus:ring-4
            focus:ring-[#FFC20E]/20
        "
                        >
                            <Plus size={18} />

                            <span>
                                Add User
                            </span>
                        </button>
                    </div>

                </div>
                <div
                    className="
                        mb-4
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                        shadow-sm
                    "
                >
                    <div className="relative max-w-md">
                        <Search
                            size={18}
                            className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                        />

                        <input
                            type="text"
                            placeholder="Search users, city or pincode..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="
                                h-10
                                w-full
                                rounded-lg
                                border
                                border-slate-200
                                bg-slate-50
                                pl-10
                                pr-4
                                text-sm
                                text-slate-900
                                outline-none
                                transition
                                placeholder:text-slate-400
                                focus:border-[#FFC20E]
                                focus:bg-white
                                focus:ring-4
                                focus:ring-[#FFC20E]/10
                            "
                        />
                    </div>
                </div>
                <div
                    className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        shadow-sm
                    "
                >
                    <div
                        className="
                            hidden
                            border-b
                            border-slate-200
                            bg-slate-50
                            px-6
                            py-3
                            md:grid
                            md:grid-cols-12
                            md:gap-4
                        "
                    >
                        <div
                            className="
                                col-span-4
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-slate-500
                            "
                        >
                            User
                        </div>

                        <div
                            className="
                                col-span-1
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-slate-500
                            "
                        >
                            Age
                        </div>

                        <div
                            className="
                                col-span-2
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-slate-500
                            "
                        >
                            City
                        </div>

                        <div
                            className="
                                col-span-3
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-slate-500
                            "
                        >
                            Location
                        </div>

                        <div
                            className="
                                col-span-2
                                text-right
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-slate-500
                            "
                        >
                            Actions
                        </div>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className="
                                    group
                                    px-4
                                    py-4
                                    transition
                                    hover:bg-slate-50
                                    sm:px-6
                                "
                            >
                                <div
                                    className="
                                        hidden
                                        items-center
                                        md:grid
                                        md:grid-cols-12
                                        md:gap-4
                                    "
                                >
                                    <div
                                        className="
                                            col-span-4
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >
                                        <div
                                            className="
                                                flex
                                                h-10
                                                w-10
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-[#FFF4CC]
                                                text-sm
                                                font-semibold
                                                text-[#C49500]
                                            "
                                        >
                                            {user.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div className="min-w-0">
                                            <p
                                                className="
                                                    truncate
                                                    font-semibold
                                                    text-slate-900
                                                "
                                            >
                                                {user.name}
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                Pincode: {user.pincode}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="
                                            col-span-1
                                            text-sm
                                            text-slate-600
                                        "
                                    >
                                        {user.age}
                                    </div>
                                    <div
                                        className="
                                            col-span-2
                                            text-sm
                                            font-medium
                                            text-slate-700
                                        "
                                    >
                                        {user.city}
                                    </div>
                                    <div
                                        className="
                                            col-span-3
                                            flex
                                            items-center
                                            gap-2
                                        "
                                    >
                                        <MapPin
                                            size={15}
                                            className="text-[#C49500]"
                                        />

                                        <span className="text-sm text-slate-600">
                                            {user.state}
                                        </span>
                                    </div>
                                    <div
                                        className="
                                            col-span-2
                                            flex
                                            justify-end
                                            gap-1
                                        "
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onEdit?.(user)
                                            }
                                            className="
                                                rounded-lg
                                                p-2
                                                text-slate-400
                                                transition
                                                hover:bg-[#FFF4CC]
                                                hover:text-[#C49500]
                                            "
                                            title="Edit user"
                                        >
                                            <Pencil size={17} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onDelete?.(user)
                                            }
                                            className="
                                                rounded-lg
                                                p-2
                                                text-slate-400
                                                transition
                                                hover:bg-red-50
                                                hover:text-red-600
                                            "
                                            title="Delete user"
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        md:hidden
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-11
                                            w-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#FFF4CC]
                                            font-semibold
                                            text-[#C49500]
                                        "
                                    >
                                        {user.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                    <div
                                        className="
                                            min-w-0
                                            flex-1
                                        "
                                    >
                                        <p
                                            className="
                                                truncate
                                                font-semibold
                                                text-slate-900
                                            "
                                        >
                                            {user.name}
                                        </p>

                                        <p
                                            className="
                                                mt-0.5
                                                text-xs
                                                text-slate-500
                                            "
                                        >
                                            {user.age} years ·{" "}
                                            {user.city}
                                        </p>

                                        <p
                                            className="
                                                mt-0.5
                                                text-xs
                                                text-slate-400
                                            "
                                        >
                                            {user.state} ·{" "}
                                            {user.pincode}
                                        </p>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onEdit?.(user)
                                            }
                                            className="
                                                rounded-lg
                                                p-2
                                                text-slate-400
                                                transition
                                                hover:bg-[#FFF4CC]
                                                hover:text-[#C49500]
                                            "
                                            title="Edit user"
                                        >
                                            <Pencil size={17} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onDelete?.(user)
                                            }
                                            className="
                                                rounded-lg
                                                p-2
                                                text-slate-400
                                                transition
                                                hover:bg-red-50
                                                hover:text-red-600
                                            "
                                            title="Delete user"
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredUsers.length === 0 && (
                            <div className="px-6 py-16 text-center">

                                <div
                                    className="
                                        mx-auto
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#FFF4CC]
                                        text-[#C49500]
                                    "
                                >
                                    <User size={24} />
                                </div>

                                <h3
                                    className="
                                        mt-4
                                        font-semibold
                                        text-slate-900
                                    "
                                >
                                    No users found
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    {search
                                        ? "Try adjusting your search."
                                        : "Users will appear here once they are added."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                {filteredUsers.length > 0 && (
                    <div
                        className="
                            mt-3
                            flex
                            items-center
                            justify-between
                            px-1
                            text-xs
                            text-slate-400
                        "
                    >
                        <span>
                            Showing {filteredUsers.length} of{" "}
                            {users.length} users
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListControl;
