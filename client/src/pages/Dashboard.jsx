import { useEffect, useState } from "react";
import api from "../services/api";
import Card from "../components/Card";
import Layout from "../components/Layout";
import WeeklyProgressChart
from "../components/WeeklyProgressChart";
import DifficultyCharts from "../components/DifficultyCharts";
import WelcomeSection from "../components/dashboard/WelcomeSection";
import StatsGrid from "../components/dashboard/StatsGrid";
import TopicChart from "../components/TopicChart";
import RecentTasks
from "../components/dashboard/RecentTasks";
import Loader from "../components/Loader";

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            // API request and minimum loader delay run together
            const [response] = await Promise.all([

                api.get("/dashboard"),

                new Promise((resolve) =>
                    setTimeout(resolve, 700)
                )

            ]);

            setDashboardData(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    if (!dashboardData) {
        return <Loader/>;
    }

    return (

        <Layout>
            <div className="">
                <WelcomeSection 
                    user={dashboardData.user}
                    
                />

                <StatsGrid
                    dashboardData={dashboardData}
                />
            </div>
            <div className="mt-10">

                <WeeklyProgressChart
                    data={dashboardData.weeklyProgress}
                />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

                <DifficultyCharts
                    data={dashboardData.dsa.difficulty}
                />

                <TopicChart
                    data={dashboardData.dsa.topics}
                />    

                

            </div>
            <div className="mt-10 ">
                <RecentTasks
                    tasks={dashboardData.planner.recentTasks}
                />
            </div>    

            

        </Layout>

    );
}

export default Dashboard;