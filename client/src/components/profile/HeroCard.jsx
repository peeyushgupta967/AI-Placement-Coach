import {
    Mail,
    GraduationCap,
    Building2,
    Pencil
} from "lucide-react";

function HeroCard({ profile, onEdit }) {

    return (
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-700 text-6xl font-bold shadow-lg">
                            {profile.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white bg-green-500">
                        </div>
                    </div>
                    {/* User Details */}
                    <div>
                        <h1 className="text-5xl font-bold">
                            {profile.name}
                        </h1>
                        <p className="mt-2 text-xl text-purple-200">
                            {profile.career_goal} Aspirant
                        </p>
                        <div className="mt-6 flex flex-wrap gap-6 text-gray-300">
                            <div className="flex items-center gap-2">
                                <Building2 size={18} />
                                {profile.college}
                            </div>
                            <div className="flex items-center gap-2">

                                <GraduationCap size={18} />

                                {profile.branch}

                            </div>

                            <div className="flex items-center gap-2">

                                <Mail size={18} />

                                {profile.email}

                            </div>

                        </div>

                    </div>

                </div>

                <button
                    onClick={onEdit}
                    className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 backdrop-blur transition hover:bg-white/20"
                >

                    <Pencil size={18} />

                    Edit Profile

                </button>

            </div>

        </div>

    );

}

export default HeroCard;