import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import api from "../services/api";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);
            setMessage("");

            const response = await api.post(
                "/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            // Registration successful
            setMessage(
                response.data.message ||
                "Registration successful. Please check your email to verify your account."
            );

            // Clear form
            setName("");
            setEmail("");
            setPassword("");

        }
        catch (error) {

            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Unable to register. Please try again."
            );

        }
        finally {

            setLoading(false);

        }

    };


    return (

        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-5">

            {/* Background Glows */}

            <div className="absolute -left-32 top-10 h-96 w-96 animate-pulse rounded-full bg-cyan-500/20 blur-[120px]" />

            <div className="absolute -right-32 bottom-10 h-96 w-96 animate-pulse rounded-full bg-violet-600/20 blur-[120px]" />

            <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />


            {/* Register Card */}

            <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/80 p-6 shadow-[0_20px_80px_rgba(59,130,246,0.25)] backdrop-blur-xl">

                {/* Logo */}

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 shadow-[0_0_40px_rgba(59,130,246,0.4)]">

                    <BrainCircuit
                        size={34}
                        className="text-white"
                    />

                </div>


                {/* Heading */}

                <h1 className="text-center text-4xl font-black tracking-tight">

                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">

                        Create Account

                    </span>

                </h1>

                <p className="mt-2 text-center text-sm text-slate-400">

                    Start your placement preparation journey.

                </p>


                {/* Success / Error Message */}

                {message && (

                    <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-center text-sm text-blue-300">

                        {message}

                    </div>

                )}


                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-4"
                >

                    {/* Name */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Full Name

                        </label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-5 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20"
                        />

                    </div>


                    {/* Email */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Email

                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-5 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20"
                        />

                    </div>


                    {/* Password */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Password

                        </label>

                        <input
                            type="password"
                            placeholder="Minimum 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={8}
                            required
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-5 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20"
                        />

                    </div>


                    {/* Register Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 py-3 font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(59,130,246,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        {loading
                            ? "Creating Account..."
                            : "Create Account"
                        }

                    </button>

                </form>


                {/* Login */}

                <p className="mt-5 text-center text-sm text-slate-400">

                    Already have an account?{" "}

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="font-semibold text-cyan-400 transition hover:text-cyan-300"
                    >

                        Login

                    </button>

                </p>

            </div>

        </div>

    );

}

export default Register;