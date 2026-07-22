import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import api from "../services/api";
import {
    Search,
    Plus,
    Trash2,
    CheckCircle2,
    
    Check,
    Circle
} from "lucide-react";
import Loader from "../components/Loader";

function Planner() {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        today: 0,
        completed: 0
    });
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Medium",
        due_date: ""
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const [
                allTasks,
                todayTasks,
                pendingTasks
            ] = await Promise.all([
                api.get("/planner"),
                api.get("/planner/today"),
                api.get("/planner/pending"),
                new Promise((resolve) =>
                    setTimeout(resolve, 700)
                )
            ]);
            setTasks(allTasks.data.tasks);
            const total = allTasks.data.count;
            const pending = pendingTasks.data.count;
            const today = todayTasks.data.count;
            const completed = total - pending;
            setStats({
                total,
                pending,
                today,
                completed
            });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader/>;

    };

    const filteredTasks = tasks.filter((task) => {

    const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

    const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

    return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus
    );

});

    const handleChange = (e) => {

    setFormData({

        ...formData,

        [e.target.name]: e.target.value

    });

};

const saveTask = async () => {

    if (!formData.title.trim()) {

        alert("Task Title is required");

        return;

    }

    if (!formData.due_date) {

        alert("Please select a due date");

        return;

    }

    try {

        await api.post("/planner", formData);

        alert("Task Added Successfully");

        setShowModal(false);

        setFormData({

            title: "",

            description: "",

            priority: "Medium",

            due_date: ""

        });

        fetchTasks();

    }
    catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Unable to add task"
        );

    }

};

const completeTask = async (id) => {

    try {

        await api.patch(`/planner/${id}/complete`);

        alert("Task Completed Successfully");

        fetchTasks();

    }
    catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Unable to complete task"
        );

    }

};

const deleteTask = async (id) => {

    const confirmDelete = window.confirm(
        "Delete this task?"
    );

    if (!confirmDelete) return;

    try {

        await api.delete(`/planner/${id}`);

        alert("Task Deleted Successfully");

        fetchTasks();

    }
    catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Unable to delete task"
        );

    }

};


    return (

        <Layout>

            <h1 className="mb-8 text-4xl font-bold">

                Study Planner

            </h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                <Card
                    title="Today's Tasks"
                    value={stats.today}
                    color="bg-gradient-to-r from-blue-500 to-cyan-500"
                />

                <Card
                    title="Pending"
                    value={stats.pending}
                    color="bg-gradient-to-r from-yellow-500 to-orange-500"
                />

                <Card
                    title="Completed"
                    value={stats.completed}
                    color="bg-gradient-to-r from-green-500 to-emerald-500"
                />

                <Card
                    title="Total Tasks"
                    value={stats.total}
                    color="bg-gradient-to-r from-purple-500 to-pink-500"
                />

            </div>

                    {/* Task Section */}

            <div className="mt-10 rounded-2xl bg-white dark:bg-slate-900 shadow-sm dark:shadow-none

    transition-all duration-300

    hover:border-blue-400
    dark:hover:border-blue-500 p-6 shadow-lg">

                <div className="mb-6 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <h2 className="text-2xl font-bold">

                            Tasks

                        </h2>

                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700 m-2"
                        >

                            <Plus size={18} />

                            Add Task

                        </button>

                    </div>

                    <div className="flex items-center gap-3">

                        <div className="relative">

                            <Search
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search Task..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="
                                    w-64
                                    rounded-lg
                                    border
                                    border-slate-300
                                    dark:border-slate-700

                                    bg-white
                                    dark:bg-slate-800

                                    text-slate-900
                                    dark:text-white

                                    placeholder:text-slate-400
                                    dark:placeholder:text-slate-500

                                    py-2
                                    pl-10
                                    pr-4

                                    outline-none

                                    transition-colors
                                    duration-300

                                    focus:border-blue-500
                                "
                            />

                        </div>

                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className=" w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3"
                        >

                            <option>All</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>

                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className=" w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3"
                        >

                            <option>All</option>
                            <option>Pending</option>
                            <option>Completed</option>

                        </select>

                    </div>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b shadow-sm dark:shadow-none

    transition-all duration-300

    hover:border-blue-400
    dark:hover:border-blue-500 text-left">

                                <th className="px-4 py-3">Title</th>

                                <th className="px-4 py-3">Priority</th>

                                <th className="px-4 py-3">Status</th>

                                <th className="px-4 py-3">Due Date</th>

                                <th className="px-4 py-3 text-center">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredTasks.length === 0 ?

                                (

                                    <tr>

                                    <td
                                        colSpan="5"
                                        className="py-14 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center">

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
                                                text-lg
                                                font-semibold
                                                text-slate-900
                                                dark:text-white
                                            ">
                                                No tasks found
                                            </h3>

                                            <p className="
                                                mt-2
                                                max-w-sm
                                                text-sm
                                                text-slate-500
                                                dark:text-slate-400
                                            ">
                                                You don't have any tasks here yet. Add a new task to start planning your placement preparation.
                                            </p>

                                        </div>
                                    </td>

                                    </tr>

                                )

                                :

                                (

                                    filteredTasks.map((task) => (

                                        <tr
                                            key={task.id}
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

                                                {task.title}

                                            </td>

                                            <td className="px-4 py-4">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                                                        task.priority === "High"
                                                            ? "bg-red-200 text-red-700"
                                                            : task.priority === "Medium"
                                                            ? "bg-yellow-200 text-yellow-700"
                                                            : "bg-green-200 text-green-700"
                                                    }`}
                                                >

                                                    {task.priority}

                                                </span>

                                            </td>

                                            <td className="px-4 py-4">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                                                        task.status === "Completed"
                                                            ? "bg-green-200 text-green-700"
                                                            : "bg-yellow-200 text-yellow-700"
                                                    }`}
                                                >

                                                    {task.status}

                                                </span>

                                            </td>

                                            <td className="px-4 py-4">

                                                {task.due_date.split("T")[0]}

                                            </td>

                                            <td className="px-4 py-4">

                                                <div className="flex justify-center gap-3">

                                                    <button
                                                        disabled={task.status === "Completed"}
                                                        onClick={() => completeTask(task.id)}
                                                        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                                                            task.status === "Completed"
                                                                ? "border-green-600 bg-green-600 text-white"
                                                                : "border-gray-400 bg-white text-transparent hover:border-green-600"
                                                        }`}
                                                        title={
                                                            task.status === "Completed"
                                                                ? "Completed"
                                                                : "Mark as Complete"
                                                        }
                                                    >
                                                        <Check size={18} strokeWidth={3} />
                                                    </button>

                                                    <button
                                                        onClick={()=> deleteTask(task.id)}
                                                        className="rounded-lg p-2 text-red-400 hover:bg-red-100"
                                                        title="Delete Task"
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

                        <div className="mt-10 rounded-2xl bg-white dark:bg-slate-900 shadow-sm dark:shadow-none

    transition-all duration-300

    hover:border-blue-400
    dark:hover:border-blue-500 p-6 shadow-lg">

                            <h2 className="mb-6 text-3xl font-bold">

                                Add New Task

                            </h2>

                            <div className="space-y-4">

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Task Title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border p-3 text-gray-500 br-blue-100"
                                />

                                <textarea
                                    rows="3"
                                    name="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border p-3"
                                />

                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className=" w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3"
                                >

                                    <option>High</option>

                                    <option>Medium</option>

                                    <option>Low</option>

                                </select>

                                <input
                                    type="date"
                                    name="due_date"
                                    value={formData.due_date}
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
                                    onClick={saveTask}
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                                >

                                    Save Task

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </Layout>

    );

}



export default Planner;