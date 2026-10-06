import { useEffect, type ElementType } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const withAuth = (Component: ElementType) => {
  return (props: any) => {
    const navigate = useNavigate();
    const { user, userLoading, setUser, setUserLoading } = useAuth();
    console.log(user);
    console.log(userLoading);

    const getUser = async (token: string) => {
      try {
        setUserLoading(true)
        const response = await fetch("http://localhost:8000/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!data.success) {
          console.log("Error fetching user", data.message);
          return;
        }
        setUser(data.user);
      } catch (error) {
        console.log("Error fetching user", error);
      } finally {
        setUserLoading(false);
      }
    };

    useEffect(() => {
      const token=localStorage.getItem("token") || null;

      if (!token){
        navigate("/signin")
        return;
      }else if (!user && !userLoading){
        getUser(token)
      }
      
      // if (token && !user){
      //   getUser(token);
      //   return;
      // }else if (!token){
      //   navigate("/signin");
      // }

    }, [user, userLoading]);

    if (userLoading) return <div className="user-loading">Loading...</div>;

    if (!user && !userLoading) return null;

    return <Component {...props} />;
  };
};

export default withAuth;


