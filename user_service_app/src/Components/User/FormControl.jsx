import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import {
    User,
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

/* -----------------------------------------
   Validation Schema
------------------------------------------ */

const userSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters"),

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
    age: "",
    city: "",
    state: "",
    pincode: "",
};

const FormControl = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    /* -----------------------------------------
       Load User For Edit
    ------------------------------------------ */

    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        const loadUser = async () => {
            try {
                setLoading(true);

                /*
                    Replace this with your actual API.

                    Example:

                    const response = await fetch(
                        `https://localhost:5001/api/users/${id}`
                    );

const user = await response.json();
                */

                // Temporary sample data
                const user = {
                    name: "Gokul",
                    age: 28,
                    city: "Chennai",
                    state: "Tamil Nadu",
                    pincode: "600001",
                };

                setFormData({
                    name: user.name ?? "",
                    age: user.age ?? "",
                    city: user.city ?? "",
                    state: user.state ?? "",
                    pincode: user.pincode ?? "",
                });
            } catch (error) {
                console.error("Failed to load user:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [id, isEditMode]);

    /* -----------------------------------------
       Handle Input Change
    ------------------------------------------ */

    const handleChange = (e) => {
        const { name, value } = e.target;

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

    /* -----------------------------------------
       Handle Submit
    ------------------------------------------ */

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = userSchema.safeParse({
            ...formData,

            age:
                formData.age === ""
                    ? undefined
                    : Number(formData.age),
        });

        /* -----------------------------------------
           Validation Failed
        ------------------------------------------ */

        if (!result.success) {
            const validationErrors = {};

            result.error.issues.forEach((issue) => {
                const field = issue.path[0];

                if (!validationErrors[field]) {
                    validationErrors[field] = issue.message;
                }
            });

            setErrors(validationErrors);

            return;
        }

        /* -----------------------------------------
           Validation Successful
        ------------------------------------------ */

        setErrors({});

        try {
            setSubmitting(true);

            if (isEditMode) {
                /*
                    UPDATE USER
    
                    Example:
    
                    await fetch(
                        `https://localhost:5001/api/users/${id}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(result.data),
                        }
                    );
                */

                console.log(
                    "Updating user:",
                    id,
                    result.data
                );
            } else {
                /*
                    CREATE USER
    
                    Example:
    
                    await fetch(
                        "https://localhost:5001/api/users",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(result.data),
                        }
                    );
                */

                console.log(
                    "Creating user:",
                    result.data
                );
            }

            /* -----------------------------------------
               Navigate Back To User List
            ------------------------------------------ */

            navigate("/user");
        } catch (error) {
            console.error("Submit failed:", error);
        } finally {
            setSubmitting(false);
        }
    };

    /* -----------------------------------------
       Loading State
    ------------------------------------------ */

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

    /* -----------------------------------------
       UI
    ------------------------------------------ */

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
            {/* ---------------------------------
                Header
            ---------------------------------- */}

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
                            {isEditMode
                                ? "Edit User"
                                : "Create User"}
                        </h2>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-500
                            "
                        >
                            {isEditMode
                                ? "Update the user's information below."
                                : "Please enter the user's details below."}
                        </p>
                    </div>
                </div>
            </div>

            {/* ---------------------------------
                Form
            ---------------------------------- */}

            <form
                onSubmit={handleSubmit}
                className="px-6 py-7 sm:px-8"
            >
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* ---------------------------------
                        Name
                    ---------------------------------- */}

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

                        {errors.name ? (
                            <p className="mt-1.5 text-xs text-red-500">
                                {errors.name}
                            </p>
                        ) : (
                            <p className="mt-1.5 text-xs text-slate-400">
                                2 to 100 characters
                            </p>
                        )}
                    </div>

                    {/* ---------------------------------
                        Age
                    ---------------------------------- */}

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

                    {/* ---------------------------------
                        Pincode
                    ---------------------------------- */}

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

                    {/* ---------------------------------
                        City
                    ---------------------------------- */}

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

                    {/* ---------------------------------
                        State
                    ---------------------------------- */}

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

                {/* ---------------------------------
                    Buttons
                ---------------------------------- */}

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
                    {/* Cancel */}
                    <Button
                        type="button"
                        onClick={() => navigate("/user")}
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

                    {/* Submit */}
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

                                {isEditMode
                                    ? "Updating..."
                                    : "Creating..."}
                            </>
                        ) : (
                            <>
                                {isEditMode ? (
                                    <Pencil size={17} />
                                ) : (
                                    <UserPlus size={17} />
                                )}

                                {isEditMode
                                    ? "Update User"
                                    : "Create User"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormControl;
