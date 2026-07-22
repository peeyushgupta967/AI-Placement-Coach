import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import {Trash2, UploadCloud, Sparkles} from "lucide-react";
import jsPDF from "jspdf";
import Loader from "../components/Loader";

function Resume() {

    const [profile, setProfile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProfile(true);
    }, []);

    const fetchProfile = async (showLoader = false) => {

        try {

            if (showLoader) {
                setLoading(true);
            }

            const [response] = await Promise.all([

                api.get("/user/profile"),

                new Promise((resolve) =>
                    setTimeout(resolve, 1500)
                )

            ]);

            console.log(response.data.user);

            setProfile(response.data.user);

        }
        catch (error) {

            console.log(error);

        }
        finally {

            if (showLoader) {
                setLoading(false);
            }

        }

    };

    const removeResume = async () => {

        try {
            await api.delete("/user/resume");
            fetchProfile();
            setAnalysis(null);
            alert("Resume Deleted Successfully");
        }
        catch (error) {
            console.log(error);
            alert("Unable to delete resume");
        }
    };

    const uploadResume = async () => {

        if (!selectedFile) {
            alert("Please select a PDF file.");
            return;
        }
        const formData = new FormData();
        formData.append("resume", selectedFile);
        try {

            setLoading(true);

            await Promise.all([

                api.post(
                    "/user/resume",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                ),

                // Minimum loader duration
                new Promise((resolve) =>
                    setTimeout(resolve, 1500)
                )

            ]);
            fetchProfile();
            setSelectedFile(null);
            alert("Resume Uploaded Successfully");
        }
        catch (error) {

            console.log(error);
            alert("Upload Failed");
        }
        finally {
            setLoading(false);
        }
    };

    const analyzeResume = async () => {

        try {

            setLoading(true);

            const response = await api.get("/user/analyze-resume");

            setAnalysis(response.data.analysis);

            fetchProfile();

        }
        catch (error) {

            console.log(error);

            alert("Unable to analyze resume");

        }
        finally {

            setLoading(false);

        }

    };


    const downloadAnalysis = () => {

        if (!analysis) {
            alert("Please analyze your resume first.");
            return;
        }

        const doc = new jsPDF();

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const margin = 18;
        const contentWidth = pageWidth - margin * 2;

        let y = 0;

        // ================================
        // COLORS
        // ================================

        const colors = {
            primary: [37, 99, 235],
            dark: [15, 23, 42],
            gray: [100, 116, 139],
            lightGray: [248, 250, 252],
            border: [226, 232, 240],
            green: [22, 163, 74],
            orange: [234, 88, 12],
            amber: [217, 119, 6],
            blue: [37, 99, 235],
            violet: [124, 58, 237]
        };

        // ================================
        // HEADER
        // ================================

        doc.setFillColor(...colors.dark);
        doc.rect(0, 0, pageWidth, 42, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);

        doc.text("AI Placement Coach", margin, 18);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);

        doc.setTextColor(203, 213, 225);

        doc.text(
            "AI-Powered Resume Analysis Report",
            margin,
            28
        );

        doc.setFontSize(9);

        doc.text(
            `Generated ${new Date().toLocaleString()}`,
            margin,
            35
        );

        // ================================
        // CANDIDATE INFORMATION
        // ================================

        y = 52;

        doc.setFillColor(...colors.lightGray);
        doc.setDrawColor(...colors.border);

        doc.roundedRect(
            margin,
            y,
            contentWidth,
            32,
            3,
            3,
            "FD"
        );

        doc.setTextColor(...colors.dark);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);

        doc.text(
            profile?.name || "Candidate",
            margin + 7,
            y + 11
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.setTextColor(...colors.gray);

        doc.text(
            profile?.email || "",
            margin + 7,
            y + 21
        );

        // ================================
        // SCORE
        // ================================

        const score = analysis.overallScore || 0;

        doc.setFillColor(...colors.primary);

        doc.roundedRect(
            pageWidth - margin - 42,
            y + 5,
            34,
            22,
            3,
            3,
            "F"
        );

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);

        doc.text(
            `${score}/100`,
            pageWidth - margin - 25,
            y + 15,
            { align: "center" }
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);

        doc.text(
            "RESUME SCORE",
            pageWidth - margin - 25,
            y + 22,
            { align: "center" }
        );

        y += 44;

        // ================================
        // PAGE CHECK
        // ================================

        const checkPage = (requiredHeight = 30) => {

            if (y + requiredHeight > pageHeight - 20) {

                doc.addPage();

                y = 20;

            }

        };

        // ================================
        // SECTION FUNCTION
        // ================================

        const addSection = (
            title,
            items = [],
            accentColor
        ) => {

            if (!items || items.length === 0) {
                return;
            }

            checkPage(35);

            // Section title background

            doc.setFillColor(
                accentColor[0],
                accentColor[1],
                accentColor[2]
            );

            doc.roundedRect(
                margin,
                y,
                4,
                10,
                2,
                2,
                "F"
            );

            doc.setTextColor(...colors.dark);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);

            doc.text(
                title,
                margin + 9,
                y + 8
            );

            y += 18;

            // Items

            items.forEach((item) => {

                const textLines = doc.splitTextToSize(
                    item,
                    contentWidth - 16
                );

                const itemHeight =
                    textLines.length * 6 + 7;

                checkPage(itemHeight);

                // Bullet

                doc.setFillColor(
                    accentColor[0],
                    accentColor[1],
                    accentColor[2]
                );

                doc.circle(
                    margin + 3,
                    y - 1.5,
                    1.3,
                    "F"
                );

                // Text

                doc.setTextColor(51, 65, 85);
                doc.setFont("helvetica", "normal");
                doc.setFontSize(10);

                doc.text(
                    textLines,
                    margin + 9,
                    y
                );

                y += textLines.length * 6 + 6;

            });

            y += 5;

        };

        // ================================
        // REPORT SECTIONS
        // ================================

        addSection(
            "Strengths",
            analysis.strengths,
            colors.green
        );

        addSection(
            "Areas for Improvement",
            analysis.weaknesses,
            colors.orange
        );

        addSection(
            "Missing Skills",
            analysis.missingSkills,
            colors.amber
        );

        addSection(
            "ATS Recommendations",
            analysis.atsSuggestions,
            colors.blue
        );

        addSection(
            "Suggested Projects",
            analysis.projectSuggestions,
            colors.violet
        );

        // ================================
        // FOOTER ON EVERY PAGE
        // ================================

        const totalPages =
            doc.internal.getNumberOfPages();

        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            doc.setPage(page);

            doc.setDrawColor(...colors.border);

            doc.line(
                margin,
                pageHeight - 14,
                pageWidth - margin,
                pageHeight - 14
            );

            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.setFontSize(8);

            doc.setTextColor(...colors.gray);

            doc.text(
                "AI Placement Coach • Resume Analysis Report",
                margin,
                pageHeight - 8
            );

            doc.text(
                `Page ${page} of ${totalPages}`,
                pageWidth - margin,
                pageHeight - 8,
                {
                    align: "right"
                }
            );

        }

        // ================================
        // DOWNLOAD
        // ================================

        doc.save(
            `${profile?.name || "Resume"}_Analysis_Report.pdf`
        );

    };

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const resumeUrl = profile.resume
        ? `${API_URL}/${profile.resume.replace(/\\/g, "/")}`
        : "";

        if (loading) {
            return <Loader />;
        }
    return (

        <Layout>
            <h1 className="text-4xl font-bold mb-8">
                Resume
            </h1>

            <div className="
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

                <h2 className="text-2xl font-semibold m-2 ">
                    Current Resume
                </h2>

                { profile?.resume ?
                    (
                        <div className="flex items-center justify-between shadow-sm dark:shadow-none

    transition-all duration-300

    hover:border-blue-400
    dark:hover:border-blue-500">

                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-medium text-blue-600 hover:underline"
                            >
                                📄 {profile.resume.split("\\").pop()}
                            </a>

                            <button
                                onClick={removeResume}
                                className="rounded-lg p-2 text-red-600 transition hover:bg-red-100 hover:text-red-700"
                                title="Delete Resume"
                            >
                                <Trash2 size={20} />
                            </button>

                        </div>
                        
                    )
                    :
                    (
                        <p className="text-gray-500 ml-2 text-center text-lg">
                            No Resume Uploaded
                        </p>
                    )
                }
            </div>

            <div className="mt-8 rounded-xlshadow-sm dark:shadow-none

    transition-all duration-300

    hover:border-blue-400
    dark:hover:border-blue-500 bg-white dark:bg-slate-900 p-6 shadow-md">

                <h2 className="mb-6 text-2xl font-semibold">
                    Upload Resume
                </h2>

                <label
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 transition hover:border-blue-500 hover:bg-blue-50"
                >

                    <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />

                    <p className="text-lg font-semibold">
                        📤 Click to Upload Resume
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        Only PDF files are allowed
                    </p>

                </label>

                {
                    selectedFile &&
                    <div className="mt-5">
                        <p className="text-green-700 font-medium">
                            📄 {selectedFile.name}
                        </p>

                        <button
                            onClick={uploadResume}
                            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                        >
                            Upload Resume
                        </button>
                    </div>
                }

            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-8 text-white shadow-xl transition-all duration-300 hover:scale-[1.01]">

                <div className="flex items-center gap-3">

                    <Sparkles size={32} />

                    <h2 className="text-3xl font-bold">
                        Placement Insights
                    </h2>

                </div>

                <p className="mt-5 leading-7 text-indigo-100">

                    Discover hidden strengths, ATS gaps, and personalized
                    recommendations to maximize your placement success.

                </p>

                <div className="mt-6 space-y-3">

                    <p>✔ ATS Compatibility Check</p>

                    <p>✔ Resume Score Evaluation</p>

                    <p>✔ Missing Skills Detection</p>

                    <p>✔ Project & Experience Review</p>

                    <p>✔ Personalized Improvement Suggestions</p>

                </div>

                <button
                    onClick={analyzeResume}
                    disabled={!profile?.resume || loading}
                    className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-300"
                >

                    {
                        loading
                            ? "Analyzing..."
                            : "🚀 Unlock My Insights"
                    }

                </button>

            </div>

            {
                analysis && (

                    <>

                        {/* Resume Score */}

                        <div className="mt-12">

                            <h2 className="mb-8 text-3xl font-bold">
                                AI Analysis Report
                            </h2>

                            <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg">

                                <p className="text-sm uppercase tracking-widest">
                                    Resume Score
                                </p>

                                <div className="mt-4 flex items-center justify-between">

                                    <div>

                                        <h2 className="text-7xl font-bold">

                                            {analysis.atsScore}
                                            

                                        </h2>

                                        <p className="mt-2 text-indigo-100">

                                            {analysis.atsScore >= 90
                                                ? "Excellent Resume 🚀"
                                                : analysis.atsScore >= 75
                                                ? "Good Resume 👍"
                                                : analysis.overallScore >= 60
                                                ? "Needs Improvement 📈"
                                                : "Requires Major Improvements ⚠"}

                                        </p>

                                    </div>

                                    <div className="rounded-xl bg-white/20 px-6 py-5">

                                        <p className="text-3xl font-bold">

                                            {analysis.atsScore}/100

                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* dsa score, development score and project score */}
                            <div className="mt-8 grid grid-cols-3 gap-4">

                                <div className="rounded-xl bg-gradient-to-r from-green-500 to-cyan-500">
                                    <p className="text-lg text-indigo-100 m-3 text-bold text-center">DSA</p>
                                    <h3 className="mt-2 text-2xl font-bold m-3 text-center">
                                        {analysis.dsaScore}/100
                                    </h3>
                                </div>

                                <div className=" rounded-xl bg-gradient-to-r from-red-500 to-indigo-500 ">
                                    <p className="text-lg text-indigo-100 m-3 text-center bold">Development</p>
                                    <h3 className="mt-2 text-2xl font-bold m-3 text-center">
                                        {analysis.developmentScore}/100
                                    </h3>
                                </div>

                                <div className="rounded-xl bg-gradient-to-r from-yellow-500 to-red-500">
                                    <p className="text-lg text-indigo-100 m-3 text-center bold ">Projects</p>
                                    <h3 className="mt-2 text-2xl font-bold text-center ">
                                        {analysis.projectScore}/100
                                    </h3>
                                </div>

                            </div>

                        </div>
                        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

                            {/* Missing Skills */}

                            <div className="rounded-2xl bg-white p-6 shadow-lg">

                                <h3 className="mb-5 text-2xl font-bold text-orange-600">

                                    🛠 Missing Skills

                                </h3>

                                <div className="flex flex-wrap gap-3">

                                    {analysis.missingSkills.map((item, index) => (

                                        <span
                                            key={index}
                                            className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700"
                                        >

                                            {item}

                                        </span>

                                    ))}

                                </div>

                            </div>

                            {/* ATS Suggestions */}

                            <div className="rounded-2xl  p-6 shadow-lg bg-white">

                                <h3 className="mb-5 text-2xl font-bold text-blue-600">

                                    🎯 ATS Suggestions

                                </h3>

                                <div className="space-y-3 text-blue-800 ">

                                    {analysis.atsSuggestions.map((item, index) => (

                                        <div
                                            key={index}
                                            className="rounded-lg bg-blue-100 p-3 "
                                        >

                                            ✔ {item}

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                        <div className="mt-8 rounded-2xl bg-white text-purple p-6 shadow-lg">

                            <h3 className="mb-5 text-2xl font-bold text-purple-600">

                                🚀 Suggested Projects

                            </h3>

                            <div className="grid gap-4 text-purple-800 ">

                                {analysis.projectSuggestions.map((item, index) => (

                                    <div
                                        key={index}
                                        className="rounded-xl border border-purple-200 bg-purple-100 p-4"
                                    >

                                        {item}

                                    </div>

                                ))}

                            </div>

                        </div>

                        {/* Strengths & Weaknesses */}

                        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

                            <div className="rounded-2xl bg-white p-6 shadow-lg">

                                <h3 className="mb-5 text-2xl font-bold text-green-600">
                                    💪 Strengths
                                </h3>

                                <div className="space-y-3 text-green-600">

                                    {analysis.strengths.map((item, index) => (

                                        <div
                                            key={index}
                                            className="rounded-lg bg-green-100 p-3"
                                        >
                                            ✔ {item}
                                        </div>

                                    ))}

                                </div>

                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow-lg">

                                <h3 className="mb-5 text-2xl font-bold text-red-600">
                                    ⚠ Weaknesses
                                </h3>

                                <div className="space-y-3 text-red-600">

                                    {analysis.weaknesses.map((item, index) => (

                                        <div
                                            key={index}
                                            className="rounded-lg bg-red-100 p-3"
                                        >
                                            • {item}
                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </>

                )
            } 
            <div className="mt-10 flex justify-center">

                <button
                    onClick={downloadAnalysis}
                    className="rounded-xl bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-indigo-700"
                >

                    📄 Download PDF Report

                </button>

            </div>  
        </Layout>
    );
}

export default Resume;