import withAuth from "../components/withAuth";
import { useAuth } from "../hooks/useAuth";
import "../styles/profile.scss";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="profile">
      <h1>Welcome, {user?.name}!</h1>
      <p>{user?.email}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default withAuth(Profile);
