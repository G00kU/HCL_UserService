import FormControl from "../../Components/User/FormControl";

const EditUser = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-3xl">
                <FormControl mode="edit" />
            </div>
        </div>
    );
};

export default EditUser;