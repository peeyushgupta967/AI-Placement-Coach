import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import DSA from "./pages/DSA";
import Planner from "./pages/Planner";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Routes>

            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/resume"
                element={
                    <ProtectedRoute>
                        <Resume />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dsa"
                element={
                    <ProtectedRoute>
                        <DSA />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/planner"
                element={
                    <ProtectedRoute>
                        <Planner />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/verify-email/:token"
                element={<VerifyEmail />}
            />

        </Routes>
    );
}

export default App;
