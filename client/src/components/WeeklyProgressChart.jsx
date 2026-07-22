import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function WeeklyProgressChart({ data }) {

    return (

        <div className="w-full
    rounded-2xl
    bg-white dark:bg-slate-900

    border
    border-slate-200 dark:border-slate-700

    shadow-sm dark:shadow-none

    transition-all duration-300

    hover:border-blue-400
    dark:hover:border-blue-500

    hover:shadow-lg
    dark:hover:shadow-blue-500/12
">

            <h2 className="mb-6 text-2xl font-bold m-2">
                Weekly Progress
            </h2>

            <div className="h-[400px] w-full">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 20,
                        }}
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="day" />

                        <YAxis allowDecimals={false} />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#2563eb"
                            strokeWidth={4}
                            dot={{ r: 5 }}
                            activeDot={{ r: 7 }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default WeeklyProgressChart;

