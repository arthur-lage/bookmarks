import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../interfaces/IUser";
import { api } from "../service/api";

type AuthContextProps = {
  accessToken: string | null;
  handleSetToken: (newAccessToken: string | null) => void;
  currentUser: User | null;
  setCurrentUser: (newUser: User | null) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  function logout() {
    setCurrentUser(null);
    handleSetToken(null);
    localStorage.setItem("bookmarks::access_token", JSON.stringify(null));
    window.location.href = "/login";
  }

  function handleSetToken(newToken: string | null) {
    localStorage.setItem("bookmarks::access_token", JSON.stringify(newToken));
    setAccessToken(newToken);
  }

  async function fetchUserData() {
    if (localStorage.getItem("bookmarks::access_token") !== null) {
      handleSetToken(
        JSON.parse(localStorage.getItem("bookmarks::access_token") as string)
      );
    }

    if (!accessToken) {
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${accessToken}`;

    try {
      const res = await api.get("/users/me");

      setCurrentUser(res.data);
    } catch (err) {
      logout();
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [accessToken]);

  const value = {
    logout,
    accessToken,
    handleSetToken,
    currentUser,
    setCurrentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
