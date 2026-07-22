import { useEffect, useState } from "react";
import QuickStats from "../components/profile/QuickStats";
import PersonalInfo from "../components/profile/PersonalInfo";
import Layout from "../components/Layout";
import HeroCard from "../components/profile/HeroCard";
import ResumeCard from "../components/profile/ResumeCard";
import EditProfileModal from "../components/profile/EditProfileModal";
import api from "../services/api";
import { GraduationCap, LoaderCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import Loader from "../components/Loader";

function Profile() {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [stats, setStats] = useState({

        totalProblems: 0,
        currentStreak: 0,
        resumeScore: 0,
        pendingTasks: 0
    });
    const [formData, setFormData] = useState({

        name: "",

        college: "",

        branch: "",

        graduation_year: "",

        career_goal: " "

    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        
        try {
            console.log('1');
            setLoading(true);
            const [response] = await Promise.all([

                api.get("/user/profile"),

                new Promise((resolve) =>
                    setTimeout(resolve, 700)
                )

            ]);    
            
            setProfile(response.data.user);
            
            console.log("setUser:", setUser);
            console.log("dispatch:", dispatch);
            dispatch(setUser(response.data.user));
            
            
            console.log("Dispatched user:", response.data.user);
            setFormData({

                name: response.data.user.name,

                college: response.data.user.college,

                branch: response.data.user.branch,

                graduation_year: response.data.user.graduation_year,

                career_goal: response.data.user.career_goal

            });
            const dashboard = await api.get("/dashboard");

            setStats({
                totalProblems: dashboard.data.dsa.totalProblems,
                currentStreak: dashboard.data.dsa.currentStreak,
                resumeScore: dashboard.data.resume.score,
                pendingTasks: dashboard.data.planner.pendingTasks
                });
        }
        catch (error) {
            
        }
        finally {
            setLoading(false);
        }
    };

    const removeResume = async () => {

        const confirmDelete = window.confirm(
            "Delete your resume?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete("/user/resume");

            fetchProfile();

            alert("Resume Deleted Successfully");

        }
        catch (error) {

            console.log(error);

            alert("Unable to delete resume");

        }

    };

    const saveProfile = async () => {

        try {

            await api.put(

                "/user/profile",

                formData

            );

            alert("Profile Updated Successfully");

            setShowModal(false);

            fetchProfile();

        }
        catch (error) {
            console.log(error);
            console.log("message:", error.message);
            console.log("code:", error.code);
            console.log("response:", error.response);
            console.log("request:", error.request);
        }

        //     alert(

        //         error.response?.data?.message ||

        //         "Unable to update profile"

        //     );

        // }

    };


    if (loading) {

        return <Loader/>;

    }

    return (

        <Layout>

            <h1 className="mb-2 text-5xl font-bold">
                Student Profile
            </h1>
            <p className="mb-8 text-gray-500">
                Manage your academic details and placement journey.
            </p>
            <HeroCard
                profile={profile}
                onEdit={() => setShowModal(true)}
            />
            <div className="mt-8 bg-white">
                <QuickStats
                    stats={stats}
                />
            </div>

            <div className="mt-8">
                <PersonalInfo
                    profile={profile}
                />
            </div>

            <div className="mt-8">

                <ResumeCard
                    profile={profile}
                    onDelete={removeResume}
                />

            </div>

            <EditProfileModal

                show={showModal}

                onClose={() => setShowModal(false)}

                formData={formData}

                setFormData={setFormData}

                onSave={saveProfile}

            />

        </Layout>

    );

}

export default Profile;

