import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListControl from "../../Components/User/ListControl";
import UserService from "../../Services/User";
import { useToast } from "../../Components/UI/Toast";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await UserService.getUsers();
                setUsers(response);
            } catch (error) {
                console.error("Failed to load users:", error);
                setError(
                    error.response?.data?.message ||
                    "Failed to load users"
                );
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleEdit = (user) => {
        navigate(`/user/edit/${user.id}`);
    };
    const handleAdd = () => {
        navigate(`/user/add`);
    }

    const handleDelete = async (user) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${user.name}?`
        );
        if (!confirmDelete) return;
        try {
            await UserService.deleteUser(user.id);
            setUsers((currentUsers) =>
                currentUsers.filter(
                    (item) => item.id !== user.id
                )
            );
            debugger;
            toast.success(
                "User Deleted Successfully"
            );
        } catch (error) {
            toast.error(
                "Operation failed: " +
                error.response.data.message
            );
            console.error("Delete failed:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-slate-600">
                    Loading users...
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-red-500">
                    {error}
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-slate-50">
            <ListControl
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleAdd}
            />
        </div>
    );
};

export default UserList;
