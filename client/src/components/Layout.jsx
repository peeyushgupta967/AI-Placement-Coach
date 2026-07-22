import Slidebar from "./Slidebar";

function Layout({ children }) {

    return (

        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

            <Slidebar />

            <main className="ml-64 p-8 text-slate-900 dark:text-white">

                {children}

            </main>

        </div>

    );

}

export default Layout;