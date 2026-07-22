import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { useTheme } from "../context/ThemeContext";
import { getChartTheme } from "../utils/chartTheme";
const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444"
];

function DifficultyChart({ data }) {
    const { darkMode } = useTheme();
    const chartTheme = getChartTheme(darkMode);
    const hasData = data?.some((item) => item.total > 0);

    if (!hasData) {
        return (
            <div className="
                flex h-[400px] flex-col items-center justify-center
                rounded-2xl border border-slate-200
                bg-white p-8 text-center
                dark:border-slate-700 dark:bg-slate-900
            ">
                <div className="mb-4 text-5xl">
                    📊
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    No activity yet
                </h2>

                <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                    Start adding solved problems to unlock your difficulty
                    distribution and progress insights.
                </p>
            </div>
        );
    }
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
    dark:hover:shadow-blue-500/10
">

            <h2 className="mb-6 text-2xl font-bold ml-3 mt-1">

                Difficulty Distribution

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="total"
                        nameKey="difficulty"
                        outerRadius={120}
                        label
                    >

                        {
                            data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))
                        }

                    </Pie>

                    <Tooltip
                        contentStyle={chartTheme.tooltip}
                        labelStyle={{ color: chartTheme.text }}
                        itemStyle={{ color: chartTheme.text }}
                    />

                    <Legend
                        wrapperStyle={{
                            color: chartTheme.text,
                        }}
                    />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default DifficultyChart;