import { X } from "lucide-react";
import FormControl from "../Components/User/FormControl";


const RegisterUserModal = ({ open, onClose, onSuccess }) => {
    // return null
    if (!open) {
        return null;
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                className="
                    relative
                    z-10
                    max-h-[90vh]
                    w-[95%]
                    max-w-3xl
                    overflow-y-auto
                    rounded-2xl
                    bg-white
                    shadow-2xl
                "
            >

                <button
                    type="button"
                    onClick={onClose}
                    className="
                        absolute
                        right-5
                        top-5
                        z-20
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        text-slate-500
                        transition
                        hover:bg-slate-100
                        hover:text-slate-900
                    "
                >
                    <X size={20} />
                </button>
                <FormControl
                    mode="register"
                    onSuccess={onSuccess}
                    onCancel={onClose}
                />

            </div>
        </div>
    );
};

export default RegisterUserModal;