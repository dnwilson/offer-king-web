import { Navigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession';
import { Nav } from './Nav';

const MainLayout = ({ children }) => {
  const { token, currentUser, clearSession } = useSession();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Nav user={currentUser} logout={clearSession} />
      <div className="main">
        <div className="container">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
