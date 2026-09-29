import { useState } from "react";
import { z } from "zod";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    UserPlus,
} from "lucide-react";

import Button from "../Components/button";
import Card from "../Components/card";
import Input from "../Components/input";

const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((previous) => ({
                ...previous,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = loginSchema.safeParse(formData);

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
        setIsLoading(true);

        try {
            // Connect your .NET API here
            //
            // const response = await fetch(
            //   "https://localhost:7000/api/auth/login",
            //   {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(result.data),
            //   }
            // );

            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Login data:", result.data);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = () => {
        console.log("Register clicked");

        // Navigate to register page
        // navigate("/register");
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">

            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

                <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl" />
            </div>

            {/* Main */}
            <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">

                <Card className="w-full max-w-5xl overflow-hidden border-0 bg-white p-0 shadow-2xl">

                    <div className="grid min-h-[620px] lg:grid-cols-2">

                        {/* ================= LEFT ================= */}
                        <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-10 text-white lg:flex lg:flex-col lg:justify-between lg:p-12">

                            {/* Decorative shapes */}
                            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-white/10" />

                            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full border border-white/10" />

                            <div className="absolute right-20 top-1/2 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

                            <div className="relative z-10">

                                {/* Logo */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                                        <Lock size={21} />
                                    </div>

                                    <span className="text-xl font-semibold tracking-tight">
                                        UserService
                                    </span>
                                </div>

                            </div>

                            {/* Center content */}
                            <div className="relative z-10 max-w-lg">

                                <div className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                                    <span className="mr-2 h-2 w-2 rounded-full bg-emerald-300" />
                                    Secure authentication
                                </div>

                                <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
                                    Everything you need,
                                    <span className="block text-blue-100">
                                        in one secure place.
                                    </span>
                                </h2>

                                <p className="mt-6 max-w-md text-base leading-7 text-blue-100">
                                    Access your account and manage your services with a
                                    secure and seamless authentication experience.
                                </p>

                            </div>
                            <div className="relative z-10 text-sm text-blue-100">
                                © 2026 UserService
                            </div>
                        </div>
                        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                            <div className="mb-8 flex items-center gap-3 lg:hidden">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                                    <Lock size={19} />
                                </div>

                                <span className="text-xl font-semibold text-slate-900">
                                    UserService
                                </span>
                            </div>
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                    Welcome back
                                </h1>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Sign in to continue to your account.
                                </p>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Email address
                                    </label>

                                    <div className="flex items-end gap-2">

                                        <Mail
                                            size={18}
                                            className="pointer-events-none  left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`pl - 10 ${errors.email
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                                : ""
                                                } `}
                                        />

                                    </div>

                                    {errors.email && (
                                        <p className="mt-1.5 text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>

                                    <div className="mb-2 flex items-center justify-between">

                                        <label
                                            htmlFor="password"
                                            className="text-sm font-medium text-slate-700"
                                        >
                                            Password
                                        </label>

                                    </div>

                                    <div className="flex items-end gap-2">

                                        <Lock
                                            size={18}
                                            className="pointer-events-none  left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`pl - 10 pr - 10 ${errors.password
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                                : ""
                                                } `}
                                        />



                                    </div>

                                    {errors.password && (
                                        <p className="mt-1.5 text-xs text-red-500">
                                            {errors.password}
                                        </p>
                                    )}

                                </div>

                                {/* Remember me */}
                                <div className="flex items-center gap-2">


                                </div>

                                {/* Sign In */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group flex w-full items-center justify-center gap-2 bg-blue-600 py-3 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In

                                            <ArrowRight
                                                size={17}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </>
                                    )}
                                </Button>
                            </form>
                            <div className="my-7 flex items-center gap-4">

                                <div className="h-px flex-1 bg-slate-200" />

                                <span className="text-xs font-medium text-slate-400">
                                    OR
                                </span>
                                <div className="h-px flex-1 bg-slate-200" />
                            </div>
                            <Button
                                type="button"
                                onClick={handleRegister}
                                className="flex w-full items-center justify-center gap-2 border border-slate-300 bg-white py-3 text-slate-700 hover:bg-slate-50"
                            >
                                <UserPlus size={17} />
                                Create an account
                            </Button>
                            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                                By continuing, you agree to our{" "}
                                <button
                                    type="button"
                                    className="font-medium text-slate-600 hover:underline"
                                >
                                    Terms of Service
                                </button>{" "}
                                and{" "}
                                <button
                                    type="button"
                                    className="font-medium text-slate-600 hover:underline"
                                >
                                    Privacy Policy
                                </button>
                                .
                            </p>

                        </div>

                    </div>

                </Card>

            </div>
        </div>
    );
};

export default Login;