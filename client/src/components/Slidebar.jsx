import {
    LayoutDashboard,
    FileText,
    Code2,
    CalendarDays,
    User,
    LogOut,
    Bot,Moon, Sun,
} from "lucide-react";

// Remove this line completely

import { useTheme } from "../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Slidebar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const { darkMode, toggleTheme } = useTheme();
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        navigate("/login");
    };
    

    






    const menu = [

        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard"
        },

        {
            title: "DSA Tracker",
            icon: Code2,
            path: "/dsa"
        },

        {
            title: "Resume",
            icon: FileText,
            path: "/resume"
        },

        {
            title: "Planner",
            icon: CalendarDays,
            path: "/planner"
        },

        {
            title: "Profile",
            icon: User,
            path: "/profile"
        }

    ];

    return (

        

        <div
            className="
            fixed left-0 top-0 flex h-screen w-64 flex-col
            border-r border-slate-200 bg-white text-slate-900
            dark:border-slate-700 dark:bg-slate-900 dark:text-white
        "
        >

            {/* Logo */}

            <div
                className="
                flex items-center gap-2 border-b
                border-slate-200 p-4
                dark:border-slate-700
            "
            >

                <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 p-3">

                    <Bot size={28} className="text-white" />

                </div>

                <div>

                    <h1 className="text-2xl font-bold">

                        AI Placement

                    </h1>

                    <p className="text-sm tracking-[0.3em] text-blue-500">

                        COACH

                    </p>

                </div>

            </div>

            {/* User */}

            {/* User */}

            <div
                className="
                m-2 rounded-2xl border
                border-slate-200 bg-slate-100
                p-4
                dark:border-slate-700 dark:bg-slate-800
                "
            >

                <div className="flex items-center gap-3">

                    {/* Avatar */}

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-700 text-xl font-bold text-white">

                        {user?.name?.trim()?.charAt(0)?.toUpperCase() || "U"}

                    </div>

                    {/* User Info */}

                    <div className="min-w-0 flex-1">

                        <h2 className="truncate font-semibold text-slate-900 dark:text-white">

                            {user?.name || "User"}

                        </h2>

                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">

                            {user?.email}

                        </p>

                    </div>

                </div>

            </div>

            {/* Navigation */}

            <div className="space-y-2 px-4">

                {

                    menu.map((item) => {

                        const Icon = item.icon;

                        return (

                            <NavLink

                                key={item.path}

                                to={item.path}

                                className={({ isActive }) =>

                                    `flex items-center gap-3 rounded-2xl px-4 py-4 transition-all duration-300

                                    ${

                                        isActive

                                            ?

                                            "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"

                                            :

                                            "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"

                                    }`

                                }

                            >

                                <Icon size={20} />

                                <span className="font-medium">

                                    {item.title}

                                </span>

                            </NavLink>

                        );

                    })

                }

            </div>

            {/* Bottom */}

            <div
                className="
                mt-auto border-t
                border-slate-200
                p-4
                dark:border-slate-700 mr-17
            "
            >

                <button

                    onClick={toggleTheme}

                    className="
                    mb-3 flex w-full items-center justify-center gap-3
                    rounded-2xl border
                    border-slate-200
                    bg-slate-100
                    px-4 py-3
                    transition-all duration-300
                    hover:bg-slate-200

                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:hover:bg-slate-700 
                "

                >

                    {

                        darkMode

                            ?

                            <Sun size={20} className="text-yellow-500" />

                            :

                            <Moon size={20} className="text-blue-500" />

                    }

                    <span className="font-medium">

                        {

                            darkMode

                                ?

                                "Light Mode"

                                :

                                "Dark Mode"

                        }

                    </span>

                </button>

                <button

                    onClick={handleLogout}

                    className="
                    flex w-full items-center gap-3
                    rounded-2xl px-4 py-3
                    text-red-500
                    transition-all duration-300

                    hover:bg-red-100

                    dark:text-red-400
                    dark:hover:bg-red-500/10
                "

                >

                    <LogOut size={20} />

                    <span>

                        Sign Out

                    </span>

                </button>

            </div>

        </div>

    );
}    

export default Slidebar;