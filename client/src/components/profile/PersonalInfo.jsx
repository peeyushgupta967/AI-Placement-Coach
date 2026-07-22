import {
    User,
    Mail,
    GraduationCap,
    Building2,
    Briefcase
} from "lucide-react";

function PersonalInfo({ profile }) {

    const info = [

        {
            icon: User,
            label: "Full Name",
            value: profile.name
        },

        {
            icon: Mail,
            label: "Email",
            value: profile.email
        },

        {
            icon: Building2,
            label: "College",
            value: profile.college
        },

        {
            icon: GraduationCap,
            label: "Branch",
            value: profile.branch
        },

        {
            icon: GraduationCap,
            label: "Graduation Year",
            value: profile.graduation_year
        },

        {
            icon: Briefcase,
            label: "Career Goal",
            value: profile.career_goal
        }

    ];

    return (

        <div className="rounded-3xl shadow-sm dark:shadow-none

    transition-all duration-300

    hover:border-blue-400
    dark:hover:border-blue-500 bg-white dark:bg-slate-900 p-8 shadow-lg">

            <h2 className="mb-8 text-2xl font-bold">

                Personal Information

            </h2>

            <div className="space-y-6">

                {

                    info.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={index}
                                className="flex items-center justify-between border-b pb-4 last:border-none"
                            >

                                <div className="flex items-center gap-4">

                                    <div className="rounded-xl bg-blue-100 p-3">

                                        <Icon
                                            size={20}
                                            className="text-blue-600"
                                        />

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">

                                            {item.label}

                                        </p>

                                        <h3 className="font-semibold">

                                            {item.value}

                                        </h3>

                                    </div>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

}

export default PersonalInfo;