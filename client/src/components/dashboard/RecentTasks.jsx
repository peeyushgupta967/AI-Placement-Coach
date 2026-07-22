function RecentTasks({ tasks }) {

    // Check if tasks exist
    const hasTasks = tasks && tasks.length > 0;

    return (

        <div
            className="
                rounded-2xl
                bg-white
                dark:bg-slate-900

                border
                border-slate-200
                dark:border-slate-700

                shadow-sm
                dark:shadow-none

                transition-all
                duration-300

                hover:border-blue-400
                dark:hover:border-blue-500

                hover:shadow-lg
                dark:hover:shadow-blue-500/10
            "
        >

            {/* Heading */}

            <h2 className="
                m-4
                mb-6
                text-2xl
                font-bold
                text-slate-900
                dark:text-white
            ">
                Recent Tasks
            </h2>


            {/* Empty State */}

            {!hasTasks ? (

                <div className="
                    flex
                    min-h-[250px]
                    flex-col
                    items-center
                    justify-center
                    px-6
                    pb-10
                    text-center
                ">

                    <div className="
                        mb-4
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-blue-50
                        text-3xl
                        dark:bg-blue-500/10
                    ">
                        📋
                    </div>

                    <h3 className="
                        text-xl
                        font-semibold
                        text-slate-900
                        dark:text-white
                    ">
                        No tasks yet
                    </h3>

                    <p className="
                        mt-2
                        max-w-sm
                        text-sm
                        leading-6
                        text-slate-500
                        dark:text-slate-400
                    ">
                        Create tasks in your planner and your recent
                        placement preparation activities will appear here.
                    </p>

                </div>

            ) : (

                <div className="space-y-4 px-4 pb-5">

                    {tasks.map((task) => (

                        <div
                            key={task.id}
                            className="
                                group
                                flex
                                items-center
                                justify-between

                                rounded-xl

                                border
                                border-slate-200
                                dark:border-slate-700

                                bg-white
                                dark:bg-slate-900

                                px-5
                                py-4

                                transition-all
                                duration-300

                                hover:-translate-y-1
                                hover:border-blue-400
                                hover:shadow-lg
                                dark:hover:border-blue-500
                                dark:hover:shadow-blue-500/10
                            "
                        >

                            {/* Left Side */}

                            <div className="flex items-center gap-4">

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center

                                        rounded-xl

                                        bg-blue-100
                                        text-xl

                                        dark:bg-blue-500/10
                                    "
                                >
                                    📋
                                </div>

                                <div>

                                    <h3
                                        className="
                                            font-semibold
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        {task.title}
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            text-slate-500
                                            dark:text-slate-400
                                        "
                                    >
                                        Placement Planner Task
                                    </p>

                                </div>

                            </div>


                            {/* Right Side */}

                            <div className="flex items-center gap-4">

                                {/* Priority */}

                                <span
                                    className={`
                                        rounded-full
                                        px-3
                                        py-1
                                        text-xs
                                        font-semibold

                                        ${
                                            task.priority === "High"
                                                ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                                : task.priority === "Medium"
                                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                                : "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                        }
                                    `}
                                >
                                    {task.priority}
                                </span>


                                {/* Status */}

                                <span
                                    className={`
                                        rounded-full
                                        px-3
                                        py-1
                                        text-xs
                                        font-semibold

                                        ${
                                            task.status === "Completed"
                                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                : "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
                                        }
                                    `}
                                >
                                    {task.status}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}
        </div>
    )
};        

export default RecentTasks;