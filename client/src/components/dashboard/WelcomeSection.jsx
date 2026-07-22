function WelcomeSection({ user }) {

    return (

        <div className="mb-8">

            <h1 className="text-4xl font-bold text-blue-700 bg -blue-250 ">
                AI Placement Coach
            </h1>

            <p className="mt-2 text-2xl text-gray-700">
                Welcome back, <span className="font-semibold">{user.name}</span> 👋
            </p>

        </div>

    );

}

export default WelcomeSection;