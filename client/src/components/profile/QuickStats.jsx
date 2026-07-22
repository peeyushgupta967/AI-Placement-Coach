import {
    Code2,
    Flame,
    FileText,
    CalendarClock
} from "lucide-react";

function QuickStats({ stats }) {

    const items = [
        {
            title: "Problems Solved",
            value: stats.totalProblems,
            icon: Code2,
            color: "bg-emerald-500"
        },
        {
            title: "Current Streak",
            value: `${stats.currentStreak} Days`,
            icon: Flame,
            color: "bg-orange-500"
        },
        {
            title: "Resume Score",
            value: `${stats.resumeScore}%`,
            icon: FileText,
            color: "bg-violet-500"
        },
        {
            title: "Pending Tasks",
            value: stats.pendingTasks,
            icon: CalendarClock,
            color: "bg-blue-500"
        }
    ];

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

            <h2 className="mb-6 text-2xl font-bold text-white">

                Quick Stats

            </h2>

            <div className="grid grid-cols-2 gap-5">

                {
                    items.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={index}
                                className="rounded-2xl border border-slate-700 bg-slate-800 p-5 transition hover:scale-105"
                            >

                                <div
                                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                                >

                                    <Icon
                                        size={22}
                                        className="text-white"
                                    />

                                </div>

                                <h3 className="text-3xl font-bold text-white">

                                    {item.value}

                                </h3>

                                <p className="mt-2 text-gray-400">

                                    {item.title}

                                </p>

                            </div>

                        );

                    })
                }

            </div>

        </div>

    );

}

export default QuickStats;