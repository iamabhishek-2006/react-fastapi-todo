import { createContext, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  userLoading: boolean;
  setUserLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}

const authContext = createContext<UserContextType | null>(null);

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/signIn";
  };

  return (
    <authContext.Provider
      value={{ user, setUser, userLoading, setUserLoading ,logout}}
    >
      {children}
    </authContext.Provider>
  );
};

export { authContext, UserContext };
