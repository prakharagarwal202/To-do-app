import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLogged, loading } = useAuth();

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; // Could be a nicer spinner later
  }

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
