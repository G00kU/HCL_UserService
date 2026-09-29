import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { z } from "zod";

import {
    User,
    Mail,
    Calendar,
    MapPin,
    Building2,
    Hash,
    UserPlus,
    Pencil,
    Loader2,
} from "lucide-react";

import Button from "../UI/button";
import Input from "../UI/input";
import UserService from "../../Services/User";
import { useToast } from "../UI/Toast";



const userSchema = z.object({

    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters"),

    email: z
        .string()
        .trim()
        .email("Enter a valid email"),

    age: z
        .number({
            error: "Age is required",
        })
        .int("Age must be an integer")
        .min(0, "Age must be between 0 and 120")
        .max(120, "Age must be between 0 and 120"),

    city: z
        .string()
        .trim()
        .min(1, "City is required"),

    state: z
        .string()
        .trim()
        .min(1, "State is required"),

    pincode: z
        .string()
        .trim()
        .min(4, "Pincode must be at least 4 characters")
        .max(10, "Pincode cannot exceed 10 characters"),
});
const initialFormData = {
    name: "",
    email: "",
    age: "",
    city: "",
    state: "",
    pincode: "",
};
const FormControl = ({
    mode = "create",
    onSuccess,
    onCancel
}) => {
    const toast = useToast();

    const {
        id,
    } = useParams();

    const navigate = useNavigate();

    const isEditMode = mode === "edit";
    const isRegisterMode = mode === "register";
    const isCreateMode = mode === "add";


    const [formData, setFormData] = useState(
        initialFormData
    );

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(
        isEditMode
    );

    const [submitting, setSubmitting] =
        useState(false);
    const getTitle = () => {
        if (isRegisterMode) {
            return "Register";
        }
        if (isEditMode) {
            return "Edit User";
        }
        return "Create User";
    };


    const getDescription = () => {
        if (isRegisterMode) {
            return "Create your account by entering your details.";
        }
        if (isEditMode) {
            return "Update the user's information below.";
        }
        return "Please enter the user's details below.";
    };
    useEffect(() => {

        if (!isEditMode || !id) {
            setLoading(false);
            return;
        }


        const loadUser = async () => {

            try {

                setLoading(true);

                const user =
                    await UserService.getUserById(id);


                setFormData({
                    name: user.name ?? "",
                    email: user.email ?? "",
                    age: user.age ?? "",
                    city: user.city ?? "",
                    state: user.state ?? "",
                    pincode: user.pincode ?? "",
                });

            } catch (error) {

                console.error(
                    "Failed to load user:",
                    error
                );

                const message =
                    error?.response?.data?.message ||
                    "Failed to load user";

                setErrors({
                    submit: message,
                });

            } finally {

                setLoading(false);
            }
        };


        loadUser();

    }, [id, isEditMode]);
    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));


        if (errors[name]) {

            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result =
            userSchema.safeParse({
                ...formData,
                age:
                    formData.age === ""
                        ? undefined
                        : Number(formData.age),
            });
        if (!result.success) {

            const validationErrors = {};


            result.error.issues.forEach(
                (issue) => {

                    const field =
                        issue.path[0];


                    if (
                        !validationErrors[field]
                    ) {
                        validationErrors[field] =
                            issue.message;
                    }
                }
            );


            setErrors(validationErrors);

            return;
        }
        setErrors({});
        try {
            setSubmitting(true);
            if (isRegisterMode) {
                const res = await UserService.createUser(
                    result.data
                );
                toast.success(
                    `User Resgistered Successfully : Email :${res?.email} Password :${res?.name + res?.age}`, 10000
                );
                if (onSuccess)
                    onSuccess();
                navigate("/login");
                return;
            }
            if (isEditMode) {
                const res = await UserService.updateUser(
                    id,
                    result.data
                );
                toast.success(
                    "User Updated Successfully: " +
                    res?.name
                );
                if (onSuccess)
                    onSuccess();

                navigate("/user");
                return;
            }
            if (isCreateMode) {
                debugger
                const res = await UserService.createUser(
                    result.data
                );
                toast.success(
                    "User Created Successfully: " +
                    res?.name
                );
                if (onSuccess)
                    onSuccess();
                navigate("/user");
                return;
            }

        } catch (error) {
            toast.error(
                "Failed: " +
                error.response.data.message
            );
            console.error(
                "Submit failed:",
                error
            );
        } finally {
            setSubmitting(false);
        }
    };
    if (loading) {

        return (
            <div className="flex min-h-[400px] items-center justify-center">

                <div className="flex items-center gap-3 text-slate-500">

                    <Loader2
                        size={22}
                        className="animate-spin text-[#FFC20E]"
                    />

                    <span>
                        Loading user...
                    </span>

                </div>

            </div>
        );
    }
    return (

        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
            "
        >
            <div
                className="
                    border-b
                    border-slate-200
                    px-6
                    py-5
                    sm:px-8
                "
            >

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#FFF4CC]
                            text-[#C49500]
                        "
                    >

                        {isEditMode ? (
                            <Pencil size={20} />
                        ) : (
                            <UserPlus size={20} />
                        )}

                    </div>


                    <div>

                        <h2
                            className="
                                text-lg
                                font-semibold
                                text-slate-900
                            "
                        >
                            {getTitle()}
                        </h2>


                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-500
                            "
                        >
                            {getDescription()}
                        </p>

                    </div>

                </div>

            </div>


            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="px-6 py-7 sm:px-8"
            >

                <div className="grid gap-6 sm:grid-cols-2">


                    {/* Name */}

                    <div className="sm:col-span-2">

                        <label
                            htmlFor="name"
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-700
                            "
                        >
                            Full Name

                            <span className="ml-1 text-red-500">
                                *
                            </span>

                        </label>


                        <div className="flex items-center gap-3">

                            <User
                                size={18}
                                className="shrink-0 text-slate-400"
                            />

                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter full name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`
                                    flex-1
                                    ${errors.name
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : "focus:border-[#FFC20E] focus:ring-[#FFC20E]/20"
                                    }
                                `}
                            />

                        </div>


                        {errors.name && (
                            <p className="mt-1.5 text-xs text-red-500">
                                {errors.name}
                            </p>
                        )}

                    </div>


                    {/* Email */}

                    <div className="sm:col-span-2">

                        <label
                            htmlFor="email"
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-700
                            "
                        >
                            Email

                            <span className="ml-1 text-red-500">
                                *
                            </span>

                        </label>


                        <div className="flex items-center gap-3">

                            <Mail
                                size={18}
                                className="shrink-0 text-slate-400"
                            />

                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter email address"
                                value={formData.email}
                                onChange={handleChange}
                                className={`
                                    flex-1
                                    ${errors.email
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : "focus:border-[#FFC20E] focus:ring-[#FFC20E]/20"
                                    }
                                `}
                            />

                        </div>


                        {errors.email && (
                            <p className="mt-1.5 text-xs text-red-500">
                                {errors.email}
                            </p>
                        )}

                    </div>


                    {/* Age */}

                    <div>

                        <label
                            htmlFor="age"
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-700
                            "
                        >
                            Age

                            <span className="ml-1 text-red-500">
                                *
                            </span>

                        </label>


                        <div className="flex items-center gap-3">

                            <Calendar
                                size={18}
                                className="shrink-0 text-slate-400"
                            />

                            <Input
                                id="age"
                                name="age"
                                type="number"
                                min="0"
                                max="120"
                                placeholder="Enter age"
                                value={formData.age}
                                onChange={handleChange}
                                className={`
                                    flex-1
                                    ${errors.age
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : "focus:border-[#FFC20E] focus:ring-[#FFC20E]/20"
                                    }
                                `}
                            />

                        </div>


                        {errors.age && (
                            <p className="mt-1.5 text-xs text-red-500">
                                {errors.age}
                            </p>
                        )}

                    </div>


                    {/* Pincode */}

                    <div>

                        <label
                            htmlFor="pincode"
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-700
                            "
                        >
                            Pincode

                            <span className="ml-1 text-red-500">
                                *
                            </span>

                        </label>


                        <div className="flex items-center gap-3">

                            <Hash
                                size={18}
                                className="shrink-0 text-slate-400"
                            />

                            <Input
                                id="pincode"
                                name="pincode"
                                type="text"
                                inputMode="numeric"
                                placeholder="Enter pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className={`
                                    flex-1
                                    ${errors.pincode
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : "focus:border-[#FFC20E] focus:ring-[#FFC20E]/20"
                                    }
                                `}
                            />

                        </div>


                        {errors.pincode && (
                            <p className="mt-1.5 text-xs text-red-500">
                                {errors.pincode}
                            </p>
                        )}

                    </div>


                    {/* City */}

                    <div>

                        <label
                            htmlFor="city"
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-700
                            "
                        >
                            City

                            <span className="ml-1 text-red-500">
                                *
                            </span>

                        </label>


                        <div className="flex items-center gap-3">

                            <MapPin
                                size={18}
                                className="shrink-0 text-slate-400"
                            />

                            <Input
                                id="city"
                                name="city"
                                type="text"
                                placeholder="Enter city"
                                value={formData.city}
                                onChange={handleChange}
                                className={`
                                    flex-1
                                    ${errors.city
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : "focus:border-[#FFC20E] focus:ring-[#FFC20E]/20"
                                    }
                                `}
                            />

                        </div>


                        {errors.city && (
                            <p className="mt-1.5 text-xs text-red-500">
                                {errors.city}
                            </p>
                        )}

                    </div>


                    {/* State */}

                    <div>

                        <label
                            htmlFor="state"
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-700
                            "
                        >
                            State

                            <span className="ml-1 text-red-500">
                                *
                            </span>

                        </label>


                        <div className="flex items-center gap-3">

                            <Building2
                                size={18}
                                className="shrink-0 text-slate-400"
                            />

                            <Input
                                id="state"
                                name="state"
                                type="text"
                                placeholder="Enter state"
                                value={formData.state}
                                onChange={handleChange}
                                className={`
                                    flex-1
                                    ${errors.state
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : "focus:border-[#FFC20E] focus:ring-[#FFC20E]/20"
                                    }
                                `}
                            />

                        </div>


                        {errors.state && (
                            <p className="mt-1.5 text-xs text-red-500">
                                {errors.state}
                            </p>
                        )}

                    </div>

                </div>


                {/* API Error */}

                {errors.submit && (

                    <div
                        className="
                            mt-6
                            rounded-lg
                            border
                            border-red-200
                            bg-red-50
                            px-4
                            py-3
                            text-sm
                            text-red-600
                        "
                    >
                        {errors.submit}
                    </div>

                )}


                {/* Buttons */}

                <div
                    className="
                        mt-8
                        flex
                        flex-col-reverse
                        gap-3
                        border-t
                        border-slate-200
                        pt-6
                        sm:flex-row
                        sm:justify-end
                    "
                >

                    <Button
                        type="button"
                        onClick={() => {
                            if (onCancel)
                                onCancel();
                            navigate(
                                isRegisterMode
                                    ? "/login"
                                    : "/user"
                            )
                        }
                        }
                        disabled={submitting}
                        className="
                            border
                            border-slate-300
                            bg-white
                            text-slate-700
                            hover:bg-slate-50
                        "
                    >
                        Cancel
                    </Button>


                    <Button
                        type="submit"
                        disabled={submitting}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            bg-[#FFC20E]
                            text-slate-900
                            shadow-sm
                            shadow-[#FFC20E]/20
                            hover:bg-[#E6AE00]
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >

                        {submitting ? (

                            <>
                                <Loader2
                                    size={17}
                                    className="animate-spin"
                                />

                                {isRegisterMode
                                    ? "Registering..."
                                    : isEditMode
                                        ? "Updating..."
                                        : "Creating..."
                                }
                            </>

                        ) : (

                            <>

                                {isEditMode ? (
                                    <Pencil size={17} />
                                ) : (
                                    <UserPlus size={17} />
                                )}

                                {isRegisterMode
                                    ? "Register"
                                    : isEditMode
                                        ? "Update User"
                                        : "Create User"
                                }

                            </>

                        )}

                    </Button>

                </div>

            </form>

        </div>
    );
};

export default FormControl;