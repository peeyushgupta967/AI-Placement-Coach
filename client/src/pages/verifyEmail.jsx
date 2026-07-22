import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, XCircle, LoaderCircle, BrainCircuit } from "lucide-react";
import api from "../services/api";

function VerifyEmail() {

    const { token } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState(
        "We're verifying your email address..."
    );

    useEffect(() => {

        const verifyEmail = async () => {

            try {

                const response = await api.get(
                    `/api/auth/verify-email/${token}`
                );

                setStatus("success");

                setMessage(
                    response.data.message ||
                    "Your email has been verified successfully!"
                );

            }
            catch (error) {

                console.error(error);

                setStatus("error");

                setMessage(
                    error.response?.data?.message ||
                    "Email verification failed. The link may be invalid or expired."
                );

            }

        };

        if (token) {
            verifyEmail();
        }
        else {
            setStatus("error");
            setMessage("Invalid verification link.");
        }

    }, [token]);


    return (

        <div className="
            relative
            flex
            min-h-screen
            items-center
            justify-center
            overflow-hidden
            bg-slate-950
            px-4
        ">

            {/* Background Glows */}

            <div className="
                absolute
                -left-32
                top-10
                h-96
                w-96
                animate-pulse
                rounded-full
                bg-cyan-500/20
                blur-[120px]
            " />

            <div className="
                absolute
                -right-32
                bottom-10
                h-96
                w-96
                animate-pulse
                rounded-full
                bg-violet-600/20
                blur-[120px]
            " />

            <div className="
                absolute
                left-1/2
                top-1/3
                h-80
                w-80
                -translate-x-1/2
                rounded-full
                bg-blue-500/10
                blur-[100px]
            " />


            {/* Verification Card */}

            <div className="
                relative
                z-10
                w-full
                max-w-md
                rounded-3xl
                border
                border-slate-700
                bg-slate-900/80
                p-8
                text-center
                shadow-[0_20px_80px_rgba(59,130,246,0.25)]
                backdrop-blur-xl
            ">

                {/* Logo */}

                <div className="
                    mx-auto
                    mb-8
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-500
                    via-blue-600
                    to-violet-600
                    shadow-[0_0_40px_rgba(59,130,246,0.4)]
                ">

                    <BrainCircuit
                        size={34}
                        className="text-white"
                    />

                </div>


                {/* Loading */}

                {status === "loading" && (

                    <>

                        <LoaderCircle
                            size={65}
                            className="
                                mx-auto
                                animate-spin
                                text-blue-500
                            "
                        />

                        <h1 className="
                            mt-7
                            text-3xl
                            font-bold
                            text-white
                        ">
                            Verifying Email
                        </h1>

                        <p className="
                            mt-4
                            leading-relaxed
                            text-slate-400
                        ">
                            {message}
                        </p>

                    </>

                )}


                {/* Success */}

                {status === "success" && (

                    <>

                        <CheckCircle2
                            size={70}
                            className="
                                mx-auto
                                text-emerald-400
                            "
                        />

                        <h1 className="
                            mt-6
                            text-3xl
                            font-bold
                            text-white
                        ">
                            Email Verified!
                        </h1>

                        <p className="
                            mt-4
                            leading-relaxed
                            text-slate-400
                        ">
                            {message}
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            className="
                                mt-8
                                w-full
                                rounded-xl
                                bg-gradient-to-r
                                from-cyan-500
                                via-blue-600
                                to-violet-600
                                py-3
                                font-bold
                                text-white
                                transition-all
                                duration-300
                                hover:scale-[1.02]
                                hover:shadow-[0_0_35px_rgba(59,130,246,0.4)]
                                active:scale-95
                            "
                        >
                            Continue to Login
                        </button>

                    </>

                )}


                {/* Error */}

                {status === "error" && (

                    <>

                        <XCircle
                            size={70}
                            className="
                                mx-auto
                                text-red-400
                            "
                        />

                        <h1 className="
                            mt-6
                            text-3xl
                            font-bold
                            text-white
                        ">
                            Verification Failed
                        </h1>

                        <p className="
                            mt-4
                            leading-relaxed
                            text-slate-400
                        ">
                            {message}
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            className="
                                mt-8
                                w-full
                                rounded-xl
                                border
                                border-slate-700
                                bg-slate-800
                                py-3
                                font-semibold
                                text-white
                                transition
                                hover:bg-slate-700
                            "
                        >
                            Back to Login
                        </button>

                    </>

                )}

            </div>

        </div>

    );

}

export default VerifyEmail;