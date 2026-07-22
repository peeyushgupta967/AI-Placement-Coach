import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";


function TopicChart({ data }) {

    // Check if there is any actual topic data
    const hasData =
        data?.length > 0 &&
        data.some((item) => item.total > 0);


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
                Topic Distribution
            </h2>


            {/* Empty State */}

            {!hasData ? (

                <div className="
                    flex
                    h-[320px]
                    flex-col
                    items-center
                    justify-center
                    px-6
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
                        📊
                    </div>

                    <h3 className="
                        text-xl
                        font-semibold
                        text-slate-900
                        dark:text-white
                    ">
                        No topic data yet
                    </h3>

                    <p className="
                        mt-2
                        max-w-sm
                        text-sm
                        leading-6
                        text-slate-500
                        dark:text-slate-400
                    ">
                        Start adding solved problems to see which DSA
                        topics you have practiced the most.
                    </p>

                </div>

            ) : (

                /* Topic Bar Chart */

                <div className="h-[350px]">

                    <ResponsiveContainer
                        width="100%"
                        height={320}
                    >

                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{
                                top: 10,
                                right: 30,
                                left: 20,
                                bottom: 10
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                type="number"
                                allowDecimals={false}
                            />

                            <YAxis
                                type="category"
                                dataKey="topic"
                                width={100}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="total"
                                radius={[0, 8, 8, 0]}
                                fill="#3b82f6"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            )}

        </div>

    );

}

export default TopicChart;