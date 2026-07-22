import { Bot} from "lucide-react";

function Loader() {

    return (

        <div className="
            relative
            flex
            min-h-screen
            w-full
            items-center
            justify-center
            overflow-hidden
            bg-gray-100
            dark:bg-slate-950
        ">

            {/* Background Glow */}

            <div className="
                absolute
                h-72
                w-72
                animate-pulse
                rounded-full
                bg-blue-500/10
                blur-[100px]
                dark:bg-blue-500/20
            " />


            {/* Loader Content */}

            <div className="
                relative
                z-10
                flex
                flex-col
                items-center
            ">

                {/* Animated Logo Area */}

                <div className="
                    relative
                    flex
                    h-32
                    w-32
                    items-center
                    justify-center
                ">

                    {/* Outer rotating ring */}

                    <div className="
                        absolute
                        inset-0
                        animate-spin
                        rounded-full
                        border-2
                        border-transparent
                        border-t-blue-500
                        border-r-violet-500
                    " />


                    {/* Inner rotating ring */}

                    <div className="
                        absolute
                        inset-3
                        animate-[spin_2s_linear_infinite_reverse]
                        rounded-full
                        border
                        border-transparent
                        border-b-cyan-400
                        border-l-blue-400
                    " />


                    {/* AI Logo */}

                    <div className="
                        relative
                        flex
                        h-20
                        w-20
                        animate-pulse
                        items-center
                        justify-center
                        rounded-3xl
                        bg-gradient-to-br
                        from-cyan-500
                        via-blue-600
                        to-violet-600
                        text-white
                        shadow-[0_0_40px_rgba(59,130,246,0.45)]
                    ">

                        <Bot size={42} />

                    </div>


                    {/* Orbit Dot 1 */}

                    <div className="
                        absolute
                        left-1/2
                        top-0
                        h-3
                        w-3
                        -translate-x-1/2
                        rounded-full
                        bg-cyan-400
                        shadow-[0_0_15px_rgba(34,211,238,0.8)]
                    " />


                    {/* Orbit Dot 2 */}

                    <div className="
                        absolute
                        bottom-2
                        right-2
                        h-2
                        w-2
                        rounded-full
                        bg-violet-500
                        shadow-[0_0_15px_rgba(139,92,246,0.8)]
                    " />

                </div>


                {/* Brand */}

                <h1 className="
                    mt-7
                    bg-gradient-to-r
                    from-cyan-500
                    via-blue-600
                    to-violet-600
                    bg-clip-text
                    text-2xl
                    font-black
                    tracking-tight
                    text-transparent
                ">

                    AI Placement Coach

                </h1>


                {/* Loading Text */}

                <div className="
                    mt-3
                    flex
                    items-center
                    text-sm
                    font-medium
                    text-slate-500
                    dark:text-slate-400
                ">

                    Preparing your dashboard

                    <span className="ml-1 animate-pulse">
                        ...
                    </span>

                </div>


                {/* Animated Progress Bar */}

                <div className="
                    mt-6
                    h-1.5
                    w-52
                    overflow-hidden
                    rounded-full
                    bg-slate-200
                    dark:bg-slate-800
                ">

                    <div className="
                        h-full
                        w-1/2
                        animate-[loader_1.5s_ease-in-out_infinite]
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-400
                        via-blue-500
                        to-violet-500
                    " />

                </div>

            </div>

        </div>

    );

}

export default Loader;