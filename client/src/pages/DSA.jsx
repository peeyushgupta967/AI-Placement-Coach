import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import DifficultyChart from "../components/DifficultyCharts";
import TopicChart from "../components/TopicChart";
import api from "../services/api";
import { NotebookText, Trash2, Search, LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function DSA() {

    const [dashboard, setDashboard] = useState(null);
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState("");
    const [selectedProblemId, setSelectedProblemId] = useState(null);
    const [showNote, setShowNote] = useState(false);
    const [savingNote, setSavingNote] = useState(false);

    const [formData, setFormData] = useState({
        problem_name: "",
        platform: "LeetCode",
        difficulty: "Easy",
        topic: "Arrays",
        problem_link: "",
        solved_date: new Date().toISOString().split("T")[0],
        notes: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        try {

            setLoading(true);

            const [dashboardRes, problemRes] = await Promise.all([

                api.get("/dsa/dashboard"),

                api.get("/dsa"),

                new Promise((resolve) =>
                    setTimeout(resolve, 500)
                )

            ]);

            setDashboard(dashboardRes.data);
            setProblems(problemRes.data.problems);

        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    };

    if (loading  || !dashboard) {

        return <Loader />;

    }

    

    const easy =
        dashboard.difficulty.find(
            d => d.difficulty === "Easy"
        )?.total || 0;

    const medium =
        dashboard.difficulty.find(
            d => d.difficulty === "Medium"
        )?.total || 0;

    const hard =
        dashboard.difficulty.find(
            d => d.difficulty === "Hard"
        )?.total || 0;

    const filteredProblems = problems.filter((problem) => {

        const problemName =
            problem.title ||
            problem.problem_name ||
            "";

        return problemName
            .toLowerCase()
            .includes(search.toLowerCase());

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const saveProblem = async () => {

        if (!formData.problem_name.trim()) {
            toast.success("❗Problem Name is required ");
            return;
        }

        try {
            await api.post("/dsa", formData);
            fetchData();
            setShowModal(false);
            toast.success("Problem Added Successfully 🚀");
            
            setFormData({
                problem_name: "",
                platform: "LeetCode",
                difficulty: "Easy",
                topic: "Arrays",
                problem_link: "",
                solved_date: new Date().toISOString().split("T")[0],
                notes: ""
            });

            fetchData();
        }
        catch (error) {

            console.log(error);
            toast.error(
                error.response?.data?.message ||
                "Unable to add problem"
            );
        } 
    };

    const deleteProblem = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this problem?"
        );
        if (!confirmDelete) {
            return;
        }
        try {
            await api.delete(`/dsa/${id}`);
            alert("Problem Deleted Successfully 🗑️");
            fetchData();
        }
        catch (error) {

            console.log(error);
            toast.success(
                error.response?.data?.message ||
                "Unable to delete problem."
            );
        }
    };

    const saveNote = async () => {

        try {

            setSavingNote(true);

            await api.put(
                `/dsa/${selectedProblemId}/notes`,
                {
                    notes: selectedNote
                }
            );

            toast.success("Notes Updated Successfully");

            setShowNote(false);

            fetchData();

        }
        catch (error) {

            console.log(error);

            toast.success(
                error.response?.data?.message ||
                "Unable to update notes."
            );

        }
        finally {

            setSavingNote(false);

        }

    };

    return (

        <Layout>
            <h1 className="mb-8 text-4xl font-bold">
                DSA Tracker
            </h1>

            {/* Summary Cards */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-5">

                <Card
                    title="Problems Solved"
                    value={dashboard.totalProblems}
                    color="bg-gradient-to-r from-green-900 to-green-500"
                />

                <Card
                    title="Current Streak"
                    value={`${dashboard.currentStreak} Days`}
                    color="bg-gradient-to-r from-orange-500 to-amber-400"
                />

                <Card
                    title="Easy"
                    value={easy}
                    color="bg-gradient-to-r from-red-600 to-pink-500"
                />

                <Card
                    title="Medium"
                    value={medium}
                    color="bg-gradient-to-r from-blue-900 to-blue-400"
                />

                <Card
                    title="Hard"
                    value={hard}
                    color="bg-gradient-to-r from-violet-900 to-violet-400"
                />

            </div>

            {/* Charts */}

            <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-2">

                <DifficultyChart
                    data={dashboard.difficulty}
                />

                <TopicChart
                    data={dashboard.topics}
                />

            </div>

            {/* Recent Problems */}

            <div className="mt-10
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

                {/* Header */}

                <div className="mb-6 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <h2 className="text-2xl font-bold m-2">

                            Recent Problems

                        </h2>

                        <button
                            onClick={() => setShowModal(true)}
                            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 mt-2"
                        >

                            + Add Problem

                        </button>

                    </div>

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-3 top-3 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search Problem..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-72 rounded-lg border py-2 pl-10 pr-4 outline-none transition focus:border-blue-500 text-gray-400"
                        />

                    </div>

                </div>

                {/* Table */}

                <div className="overflow-x-auto 
    
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

                    <table className="w-full">

                        <thead>

                            <tr className="border-b -50 text-left rounded-none">

                                <th className="px-4 py-3">
                                    Problem
                                </th>

                                <th className="px-4 py-3">
                                    Difficulty
                                </th>

                                <th className="px-4 py-3">
                                    Topic
                                </th>

                                <th className="px-4 py-3">
                                    Platform
                                </th>

                                <th className="px-4 py-3 text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredProblems.length === 0 ?

                                    (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="py-10"
                                            >

                                                <div className="flex flex-col items-center">

                                                    <p className="text-lg font-semibold text-gray-500">

                                                        No Problems Found

                                                    </p>

                                                    <p className="text-sm text-gray-400">

                                                        Click "Add Problem" to start tracking.

                                                    </p>

                                                </div>

                                            </td>

                                        </tr>

                                    )

                                    :

                                    (

                                        filteredProblems.map((problem) => (

                                            <tr
                                                key={problem.id}
                                                className="
                                                    border-b
                                                    border-slate-200
                                                    dark:border-slate-700
                                                    transition-colors
                                                    duration-200
                                                    hover:bg-blue-50
                                                    dark:hover:bg-slate-800
                                                "
                                            >

                                                <td className="px-4 py-4 font-medium">

                                                    <a
                                                        href={problem.problem_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >

                                                        {
                                                            problem.problem_name ||
                                                            problem.title ||
                                                            "Untitled Problem"
                                                        }

                                                    </a>

                                                </td>

                                                <td className="px-4 py-4">

                                                    <span
                                                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                                                            problem.difficulty === "Easy"
                                                                ? "bg-green-200 text-green-700"
                                                                : problem.difficulty === "Medium"
                                                                ? "bg-yellow-200 text-yellow-700"
                                                                : "bg-red-200 text-red-700"
                                                        }`}
                                                    >

                                                        {problem.difficulty}

                                                    </span>

                                                </td>

                                                <td className="px-4 py-4">

                                                    {problem.topic}

                                                </td>

                                                <td className="px-4 py-4">

                                                    {problem.platform}

                                                </td>

                                                <td className="px-4 py-4">

                                                    <div className="flex justify-center gap-3">

                                                        <button
                                                            onClick={() => {

                                                                setSelectedProblemId(problem.id);

                                                                setSelectedNote(problem.notes || "");

                                                                setShowNote(true);

                                                            }}
                                                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100 hover:text-blue-800"
                                                            title="Notes"
                                                        >

                                                            <NotebookText size={18} />

                                                        </button>

                                                        <button
                                                            onClick={() => deleteProblem(problem.id)}
                                                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-100 hover:text-red-800"
                                                            title="Delete"
                                                        >

                                                            <Trash2 size={18} />

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            {
                showModal && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

                        <div className="w-full max-w-xl rounded-2xl  bg-white dark:bg-slate-900

    border
    border-slate-200 dark:border-slate-700

    shadow-sm dark:shadow-none

    transition-all duration-300

    hover:border-blue-400
    dark:hover:border-blue-500

    hover:shadow-lg
    dark:hover:shadow-blue-500/10 p-8">

                            <h2 className="mb-6 text-3xl font-bold mt-1">

                                Add New Problem

                            </h2>

                            <div className="space-y-4">

                                <input
                                    type="text"
                                    name="problem_name"
                                    placeholder="Problem Name"
                                    value={formData.problem_name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border p-3"
                                />

                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className=" w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3"
                                >

                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>

                                </select>

                                <select
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    className=" w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3"
                                >

                                    <option>Arrays</option>
                                    <option>Strings</option>
                                    <option>Linked List</option>
                                    <option>Trees</option>
                                    <option>Graphs</option>
                                    <option>DP</option>
                                    <option>Greedy</option>
                                    <option>Binary Search</option>
                                    <option>Heap</option>
                                    <option>Backtracking</option>
                                    <option>Recursion</option>
                                    <option>Bit Manipulation</option>

                                </select>

                                <select
                                    name="platform"
                                    value={formData.platform}
                                    onChange={handleChange}
                                    className=" w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3"
                                >

                                    <option>LeetCode</option>
                                    <option>Codeforces</option>
                                    <option>CodeChef</option>
                                    <option>AtCoder</option>
                                    <option>GeeksforGeeks</option>

                                </select>

                                <input
                                    type="text"
                                    name="problem_link"
                                    placeholder="Problem Link"
                                    value={formData.problem_link}
                                    onChange={handleChange}
                                    className=" w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3"
                                />

                                <input
                                    type="date"
                                    name="solved_date"
                                    value={formData.solved_date}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border p-3"
                                />

                                <textarea
                                    rows="3"
                                    name="notes"
                                    placeholder="Notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border p-3"
                                />

                            </div>

                            <div className="mt-8 flex justify-end gap-4">

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="rounded-lg border px-5 py-2"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={saveProblem}
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                                >
                                    Save Problem
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

            {
                showNote && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

                        <div className=" w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white  p-8">

                            <h2 className="mb-4 text-2xl font-bold">

                                Problem Notes

                            </h2>

                            <div className="max-h-64 overflow-y-auto rounded-lg bg-gray-100 p-4 text-gray-700">

                                {selectedNote}

                            </div>

                            <div className="mt-6 flex justify-end">

                                <button
                                    onClick={() => setShowNote(false)}
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                                >

                                    Close

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }


        </Layout>

    );

}

export default DSA;