import Card from "../Card";

function StatsGrid({ dashboardData }) {

    return (

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 ">

            <Card
                title="Resume Score"
                value={dashboardData.resume.score}
                subtitle="ATS Analysis"
                color="bg-gradient-to-br from-blue-500 to-blue-700"
            />

            <Card
                title="Problems Solved"
                value={dashboardData.dsa.totalProblems}
                subtitle="LeetCode"
                color="bg-gradient-to-br from-emerald-500 to-green-700"
            />

            <Card
                title="Current Streak"
                value={dashboardData.dsa.currentStreak}
                subtitle="Days"
                color="bg-gradient-to-br from-orange-500 to-red-600"
            />

            <Card
                title="Pending Tasks"
                value={dashboardData.planner.pendingTasks}
                subtitle="Planner"
                color="bg-gradient-to-br from-violet-500 to-purple-700"
            />

            <Card
                title="Today's Tasks"
                value={dashboardData.planner.todayTasks}
                subtitle="Planner"
                color="bg-gradient-to-br from-pink-500 to-rose-600"
            />
        </div>

    );

}

export default StatsGrid;