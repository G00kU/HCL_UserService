
import { useState } from "react";
import { z } from "zod";
import {
    User,
    Calendar,
    MapPin,
    Building2,
    Hash,
    UserPlus,
} from "lucide-react";

import Button from "../Components/button";
import Input from "../Components/input";

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

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [errors, setErrors] = useState({});

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = userSchema.safeParse({
            ...formData,
            age: formData.age === "" ? undefined : Number(formData.age),
        });

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

        setErrors({});

        console.log("User:", result.data);

        // API call here
    };

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                {/* Card Header */}
                <div className="border-b border-slate-200 px-6 py-5 sm:px-8">

                    <h2 className="text-lg font-semibold text-slate-900">
                        User Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Please enter the user's details below.
                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="px-6 py-7 sm:px-8"
                >

                    <div className="grid gap-6 sm:grid-cols-2">

                        <div className="sm:col-span-2">

                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Full Name
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <div className="flex items-end gap-2">

                                <User
                                    size={18}
                                    className="pointer-events-none left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`pl - 10 ${errors.name
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : ""
                                        } `}
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

                        {/* Age */}
                        <div>

                            <label
                                htmlFor="age"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Age
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <div className="flex items-end gap-2">

                                <Calendar
                                    size={18}
                                    className="pointer-events-none left-3 top-1/2 -translate-y-1/2 text-slate-400"
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
                                    className={`pl - 10 ${errors.age
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : ""
                                        } `}
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
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Pincode
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <div className="flex items-end gap-2">

                                <Hash
                                    size={18}
                                    className="pointer-events-none left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <Input
                                    id="pincode"
                                    name="pincode"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="Enter pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    className={`pl - 10 ${errors.pincode
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : ""
                                        } `}
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
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                City
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <div className="flex items-end gap-2 ">

                                <MapPin
                                    size={18}
                                    className="pointer-events-none left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <Input
                                    id="city"
                                    name="city"
                                    type="text"
                                    placeholder="Enter city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={`pl - 10 ${errors.city
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : ""
                                        } `}
                                />

                            </div>

                            {errors.city && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.city}
                                </p>
                            )}
                        </div>
                        <div>

                            <label
                                htmlFor="state"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                State
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <div className="flex items-end gap-2">

                                <Building2
                                    size={18}
                                    className="pointer-events-none left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <Input
                                    id="state"
                                    name="state"
                                    type="text"
                                    placeholder="Enter state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className={`pl - 10 ${errors.state
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : ""
                                        } `}
                                />

                            </div>

                            {errors.state && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.state}
                                </p>
                            )}

                        </div>

                    </div>

                    {/* Footer */}
                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

                        <Button
                            type="button"
                            className="border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                        >
                            <UserPlus size={17} />
                            Create User
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateUser;