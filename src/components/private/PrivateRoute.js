import { Navigate, useLocation } from 'react-router-dom';
import { selectLoading, selectUser } from '../reducers/authSlice';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
  
  let location = useLocation();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  if (loading) return;
  
  return (
    <div>
      {user?.email ? children : <Navigate state={{ from: location }} to="/authentication"></Navigate>}
    </div>
  );
};

export default PrivateRoute;
