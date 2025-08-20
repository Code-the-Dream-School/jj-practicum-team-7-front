import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, isLoggedIn }) {
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
}