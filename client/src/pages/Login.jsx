import { useState } from "react";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/api/auth/login",
                {
                    email,
                    password
                }
            );
            console.log("Login response:", response.data);
            dispatch(loginSuccess(response.data));
            console.log(response.data);

            navigate("/dashboard");

        }
        catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
            else {
                alert("Server Error");
            }
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-5">
            {/* Background Glow */}
            <div className="absolute -left-32 top-10 h-96 w-96 animate-pulse rounded-full bg-cyan-500/20 blur-[120px]" />
            <div className="absolute -right-32 bottom-10 h-96 w-96 animate-pulse rounded-full bg-violet-600/20 blur-[120px]" />
            <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />
            {/* Login Card */}
            <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/80 p-6 shadow-[0_20px_80px_rgba(59,130,246,0.25)] backdrop-blur-xl transition-all duration-500 hover:scale-[1.02]">
                {/* Logo */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 shadow-[0_0_50px_rgba(59,130,246,0.45)]">
                    <span className="text-4xl">
                        🤖
                    </span>
                </div>
                {/* Heading */}
                <h1 className="text-center text-4xl font-black leading-tight tracking-tight">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                        AI Placement Coach

                    </span>

                </h1>

                <p className="mt-3 text-center text-slate-400">

                    Welcome back! Login to continue your placement journey.

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    {/* Email */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-300">

                            Email

                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-5 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:scale-[1.02] focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20"
                        />

                    </div>

                    {/* Password */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-300">

                            Password

                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-5 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:scale-[1.02] focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20"
                        />

                    </div>

                    {/* Login Button */}

                    <button
                        type="submit"
                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 py-3 text-lg font-bold text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(59,130,246,0.45)] active:scale-95"
                    >

                        <span className="relative z-10">

                            Login

                        </span>

                        <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />

                    </button>

                </form>


                {/* Create Account Link */}

                <p className="mt-6 text-center text-sm text-slate-400">

                    Don't have an account?{" "}

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="font-semibold text-cyan-400 transition-colors duration-300 hover:text-cyan-300"
                    >
                        Create Account
                    </button>

                </p>

            </div>

        </div>

    );

}

export default Login;