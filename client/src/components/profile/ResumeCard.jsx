import {
    FileText,
    Eye,
    Download,
    Trash2,
    CheckCircle,
    XCircle
} from "lucide-react";

function ResumeCard({ profile, onDelete }) {

    const resumeUrl = profile.resume
        ? `http://localhost:5000/${profile.resume.replace(/\\/g, "/")}`
        : "";

    return (

        <div className="rounded-3xl shadow-sm dark:shadow-none

    transition-all duration-300

    hover:border-blue-400
    dark:hover:border-blue-500  bg-white dark:bg-slate-900 p-8 shadow-lg">

            <div className="mb-8 flex items-center justify-between">

                <h2 className="text-2xl font-bold">

                    Resume

                </h2>

                {
                    profile.resume ?

                    <CheckCircle
                        className="text-green-600"
                        size={28}
                    />

                    :

                    <XCircle
                        className="text-red-500"
                        size={28}
                    />

                }

            </div>

            {
                profile.resume ?

                (

                    <>

                        <div className="mb-6 flex items-center gap-4">

                            <div className="rounded-xl bg-blue-100 p-4">

                                <FileText
                                    className="text-blue-600"
                                    size={28}
                                />

                            </div>

                            <div>

                                <h3 className="font-semibold">

                                    {
                                        profile.resume
                                            .split("\\")
                                            .pop()
                                    }

                                </h3>

                                <p className="text-sm text-green-600">

                                    Uploaded Successfully

                                </p>

                            </div>

                        </div>

                        <div className="flex gap-3">

                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >

                                <Eye size={18} />

                                View

                            </a>

                            <a
                                href={resumeUrl}
                                download
                                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                            >

                                <Download size={18} />

                                Download

                            </a>

                            <button
                                onClick={onDelete}
                                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                            >

                                <Trash2 size={18} />

                                Delete

                            </button>

                        </div>

                    </>

                )

                :

                (

                    <div className="rounded-xl border-2 border-dashed border-gray-300 p-10 text-center">

                        <FileText
                            size={60}
                            className="mx-auto text-gray-400"
                        />

                        <h3 className="mt-4 text-xl font-semibold">

                            No Resume Uploaded

                        </h3>

                        <p className="mt-2 text-gray-500">

                            Upload your resume to get AI analysis.

                        </p>

                    </div>

                )

            }

        </div>

    );

}

export default ResumeCard;