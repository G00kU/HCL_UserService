import { useState } from "react";
import { z } from "zod";
import {
    Mail,
    Lock,
    ArrowRight,
    UserPlus,
} from "lucide-react";

import Button from "../Components/UI/button";
import Card from "../Components/UI/card";
import Input from "../Components/UI/input";


/* -----------------------------------------
   Validation Schema
------------------------------------------ */

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


/* -----------------------------------------
   Login Component
------------------------------------------ */

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    /* -----------------------------------------
       Handle Input Change
    ------------------------------------------ */

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


    /* -----------------------------------------
       Handle Submit
    ------------------------------------------ */

    const handleSubmit = async (event) => {

        event.preventDefault();

        const result = loginSchema.safeParse(formData);


        /* Validation */
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

            /*
                Connect your .NET API here.

                Example:

                const response = await fetch(
                    "https://localhost:7000/api/auth/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(result.data),
                    }
                );

                const data = await response.json();
            */


            await new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );

            console.log("Login data:", result.data);

        } catch (error) {

            console.error(
                "Login failed:",
                error
            );

        } finally {

            setIsLoading(false);

        }
    };


    /* -----------------------------------------
       Register
    ------------------------------------------ */

    const handleRegister = () => {

        console.log("Register clicked");

        // navigate("/register");
    };


    /* -----------------------------------------
       UI
    ------------------------------------------ */

    return (
        <div
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-slate-950
                px-4
                py-8
                sm:px-6
                lg:px-8
            "
        >

            {/* ---------------------------------
                Background Decorations
            ---------------------------------- */}

            <div className="pointer-events-none absolute inset-0">

                {/* Yellow glow */}
                <div
                    className="
                        absolute
                        -left-40
                        -top-40
                        h-96
                        w-96
                        rounded-full
                        bg-[#FFC20E]/20
                        blur-3xl
                    "
                />

                {/* Second yellow glow */}
                <div
                    className="
                        absolute
                        -bottom-40
                        -right-40
                        h-96
                        w-96
                        rounded-full
                        bg-[#FFC20E]/15
                        blur-3xl
                    "
                />

                {/* Center glow */}
                <div
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        h-72
                        w-72
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-[#FFC20E]/10
                        blur-3xl
                    "
                />

            </div>


            {/* ---------------------------------
                Main
            ---------------------------------- */}

            <div
                className="
                    relative
                    mx-auto
                    flex
                    min-h-[calc(100vh-4rem)]
                    w-full
                    max-w-6xl
                    items-center
                    justify-center
                "
            >

                <Card
                    className="
                        w-full
                        max-w-5xl
                        overflow-hidden
                        border-0
                        bg-white
                        p-0
                        shadow-2xl
                    "
                >

                    <div
                        className="
                            grid
                            min-h-[620px]
                            lg:grid-cols-2
                        "
                    >

                        {/* =================================
                            LEFT SIDE
                        ================================== */}

                        <div
                            className="
                                relative
                                hidden
                                overflow-hidden
                                bg-slate-900
                                p-10
                                text-white
                                lg:flex
                                lg:flex-col
                                lg:justify-between
                                lg:p-12
                            "
                        >

                            {/* Decorative circle */}
                            <div
                                className="
                                    absolute
                                    -right-32
                                    -top-32
                                    h-80
                                    w-80
                                    rounded-full
                                    border
                                    border-[#FFC20E]/20
                                "
                            />

                            <div
                                className="
                                    absolute
                                    -bottom-32
                                    -left-32
                                    h-80
                                    w-80
                                    rounded-full
                                    border
                                    border-[#FFC20E]/20
                                "
                            />

                            {/* Yellow glow */}
                            <div
                                className="
                                    absolute
                                    right-20
                                    top-1/2
                                    h-32
                                    w-32
                                    rounded-full
                                    bg-[#FFC20E]/10
                                    blur-2xl
                                "
                            />


                            {/* ---------------------------------
                                Logo
                            ---------------------------------- */}

                            <div className="relative z-10">

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
                                            shadow-lg
                                            shadow-[#FFC20E]/20
                                        "
                                    >
                                        <Lock size={21} />
                                    </div>

                                    <span
                                        className="
                                            text-xl
                                            font-semibold
                                            tracking-tight
                                        "
                                    >
                                        UserService
                                    </span>

                                </div>

                            </div>


                            {/* ---------------------------------
                                Center Content
                            ---------------------------------- */}

                            <div className="relative z-10 max-w-lg">

                                {/* Status */}
                                <div
                                    className="
                                        mb-5
                                        inline-flex
                                        items-center
                                        rounded-full
                                        border
                                        border-[#FFC20E]/30
                                        bg-[#FFC20E]/10
                                        px-4
                                        py-2
                                        text-sm
                                        text-yellow-100
                                        backdrop-blur
                                    "
                                >

                                    <span
                                        className="
                                            mr-2
                                            h-2
                                            w-2
                                            rounded-full
                                            bg-[#FFC20E]
                                        "
                                    />

                                    Secure authentication

                                </div>


                                {/* Heading */}
                                <h2
                                    className="
                                        text-4xl
                                        font-bold
                                        leading-tight
                                        xl:text-5xl
                                    "
                                >
                                    Everything you need,

                                    <span
                                        className="
                                            block
                                            text-[#FFC20E]
                                        "
                                    >
                                        in one secure place.
                                    </span>

                                </h2>


                                {/* Description */}
                                <p
                                    className="
                                        mt-6
                                        max-w-md
                                        text-base
                                        leading-7
                                        text-slate-300
                                    "
                                >
                                    Access your account and manage your
                                    services with a secure and seamless
                                    authentication experience.
                                </p>

                            </div>


                            {/* ---------------------------------
                                Footer
                            ---------------------------------- */}

                            <div
                                className="
                                    relative
                                    z-10
                                    text-sm
                                    text-slate-400
                                "
                            >
                                © 2026 UserService
                            </div>

                        </div>


                        {/* =================================
                            RIGHT SIDE
                        ================================== */}

                        <div
                            className="
                                flex
                                flex-col
                                justify-center
                                p-7
                                sm:p-10
                                lg:p-12
                            "
                        >

                            {/* Mobile Logo */}
                            <div
                                className="
                                    mb-8
                                    flex
                                    items-center
                                    gap-3
                                    lg:hidden
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-[#FFC20E]
                                        text-slate-900
                                    "
                                >
                                    <Lock size={19} />
                                </div>

                                <span
                                    className="
                                        text-xl
                                        font-semibold
                                        text-slate-900
                                    "
                                >
                                    UserService
                                </span>

                            </div>


                            {/* ---------------------------------
                                Heading
                            ---------------------------------- */}

                            <div className="mb-8">

                                <h1
                                    className="
                                        text-3xl
                                        font-bold
                                        tracking-tight
                                        text-slate-900
                                    "
                                >
                                    Welcome back
                                </h1>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        leading-6
                                        text-slate-500
                                    "
                                >
                                    Sign in to continue to your account.
                                </p>

                            </div>


                            {/* ---------------------------------
                                Form
                            ---------------------------------- */}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                {/* Email */}
                                <div>

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
                                        Email address
                                    </label>


                                    <div className="flex items-center gap-3">

                                        <Mail
                                            size={18}
                                            className="
                                                shrink-0
                                                text-slate-400
                                            "
                                        />

                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`
flex - 1
                                                ${errors.email
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                                    : ""
                                                }
`}
                                        />

                                    </div>


                                    {errors.email && (

                                        <p
                                            className="
                                                mt-1.5
                                                text-xs
                                                text-red-500
                                            "
                                        >
                                            {errors.email}
                                        </p>

                                    )}

                                </div>


                                {/* Password */}
                                <div>

                                    <label
                                        htmlFor="password"
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-medium
                                            text-slate-700
                                        "
                                    >
                                        Password
                                    </label>


                                    <div className="flex items-center gap-3">

                                        <Lock
                                            size={18}
                                            className="
                                                shrink-0
                                                text-slate-400
                                            "
                                        />

                                        <div className="relative flex-1">

                                            <Input
                                                id="password"
                                                name="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Enter your password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={`
w - full
pr - 10
                                                    ${errors.password
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                                        : ""
                                                    }
`}
                                            />


                                            {/* Show / Hide Password */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        (previous) =>
                                                            !previous
                                                    )
                                                }
                                                className="
                                                    absolute
                                                    right-2
                                                    top-1/2
                                                    -translate-y-1/2
                                                    rounded-md
                                                    p-1.5
                                                    text-slate-400
                                                    transition
                                                    hover:bg-yellow-50
                                                    hover:text-[#FFC20E]
                                                "
                                                aria-label={
                                                    showPassword
                                                        ? "Hide password"
                                                        : "Show password"
                                                }
                                            >

                                                {showPassword ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                                                        <circle
                                                            cx="12"
                                                            cy="12"
                                                            r="3"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                                        <line
                                                            x1="2"
                                                            x2="22"
                                                            y1="2"
                                                            y2="22"
                                                        />
                                                    </svg>
                                                )}

                                            </button>

                                        </div>

                                    </div>


                                    {errors.password && (

                                        <p
                                            className="
                                                mt-1.5
                                                text-xs
                                                text-red-500
                                            "
                                        >
                                            {errors.password}
                                        </p>

                                    )}

                                </div>


                                {/* Sign In */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="
                                        group
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        bg-[#FFC20E]
                                        py-3
                                        font-semibold
                                        text-slate-900
                                        shadow-lg
                                        shadow-[#FFC20E]/20
                                        hover:bg-[#E6AE00]
                                    "
                                >

                                    {isLoading ? (

                                        <>
                                            <span
                                                className="
                                                    h-4
                                                    w-4
                                                    animate-spin
                                                    rounded-full
                                                    border-2
                                                    border-slate-900/30
                                                    border-t-slate-900
                                                "
                                            />

                                            Signing in...
                                        </>

                                    ) : (

                                        <>
                                            Sign In

                                            <ArrowRight
                                                size={17}
                                                className="
                                                    transition-transform
                                                    group-hover:translate-x-1
                                                "
                                            />
                                        </>

                                    )}

                                </Button>

                            </form>


                            {/* ---------------------------------
                                Divider
                            ---------------------------------- */}

                            <div className="my-7 flex items-center gap-4">

                                <div className="h-px flex-1 bg-slate-200" />

                                <span
                                    className="
                                        text-xs
                                        font-medium
                                        text-slate-400
                                    "
                                >
                                    OR
                                </span>

                                <div className="h-px flex-1 bg-slate-200" />

                            </div>


                            {/* ---------------------------------
                                Register
                            ---------------------------------- */}

                            <Button
                                type="button"
                                onClick={handleRegister}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    border
                                    border-slate-300
                                    bg-white
                                    py-3
                                    text-slate-700
                                    hover:border-[#FFC20E]
                                    hover:bg-[#FFF8DD]
                                    hover:text-slate-900
                                "
                            >

                                <UserPlus size={17} />

                                Create an account

                            </Button>


                            {/* ---------------------------------
                                Terms
                            ---------------------------------- */}

                            <p
                                className="
                                    mt-8
                                    text-center
                                    text-xs
                                    leading-5
                                    text-slate-400
                                "
                            >

                                By continuing, you agree to our{" "}

                                <button
                                    type="button"
                                    className="
                                        font-medium
                                        text-slate-600
                                        hover:text-[#C49500]
                                        hover:underline
                                    "
                                >
                                    Terms of Service
                                </button>

                                {" "}and{" "}

                                <button
                                    type="button"
                                    className="
                                        font-medium
                                        text-slate-600
                                        hover:text-[#C49500]
                                        hover:underline
                                    "
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