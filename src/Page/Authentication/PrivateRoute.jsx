import { Navigate, useLocation } from 'react-router'; // <-- react-router-dom থেকে নাও
import UseAuth from '../../Hooks/UseAuth';
import Loading from '../Cpmponents/Loading';

const PrivateRouter = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user && user.email) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRouter;
