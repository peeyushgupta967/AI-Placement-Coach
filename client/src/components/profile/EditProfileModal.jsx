function EditProfileModal({


    show,
    onClose,
    formData,
    setFormData,
    onSave

}) {

    if (!show) return null;

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-xl rounded-3xl shadow-sm dark:shadow-none

    transition-all duration-300

    hover:border-blue-400
    dark:hover:border-blue-500 bg-white dark:bg-slate-900 p-8 shadow-2xl">

                <h2 className="mb-8 text-3xl font-bold">

                    Edit Profile

                </h2>

                <div className="space-y-5">

                    <div>

                        <label className="mb-2 block font-medium">

                            Full Name

                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">

                            College

                        </label>

                        <input
                            type="text"
                            name="college"
                            value={formData.college}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">

                            Branch

                        </label>

                        <input
                            type="text"
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">

                            Graduation Year

                        </label>

                        <input
                            type="text"
                            name="graduation_year"
                            value={formData.graduation_year}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Career Goal
                        </label>

                        <input
                            type="text"
                            name="career_goal"
                            value={formData.career_goal}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
                        />

                        
                    </div>

                </div>

                <div className="mt-8 flex justify-end gap-4">

                    <button
                        onClick={onClose}
                        className="rounded-xl border px-6 py-3"
                    >

                        Cancel

                    </button>

                    <button
                        onClick={onSave}
                        className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                    >

                        Save Changes

                    </button>

                </div>

            </div>

        </div>

    );

}

export default EditProfileModal;