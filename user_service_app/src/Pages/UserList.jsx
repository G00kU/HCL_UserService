import { useEffect, useState } from "react";
import ListControl from "../Components/User/ListControl";
// import List from "../../components/users/List";

const UserList = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        setUsers([
            {
                id: 1,
                name: "Gokul",
                age: 28,
                city: "Chennai",
                state: "Tamil Nadu",
                pincode: "600001",
            },
            {
                id: 2,
                name: "Arun Kumar",
                age: 30,
                city: "Coimbatore",
                state: "Tamil Nadu",
                pincode: "641001",
            },
            {
                id: 3,
                name: "Rahul",
                age: 26,
                city: "Bangalore",
                state: "Karnataka",
                pincode: "560001",
            },
            {
                id: 4,
                name: "Vijay",
                age: 32,
                city: "Madurai",
                state: "Tamil Nadu",
                pincode: "625001",
            },
        ]);
    }, []);

    const handleEdit = (user) => {
        console.log("Edit:", user);
    };

    const handleDelete = (user) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${user.name}?`
        );

        if (!confirmDelete) return;

        setUsers((currentUsers) =>
            currentUsers.filter(
                (item) => item.id !== user.id
            )
        );
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <ListControl
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default UserList;