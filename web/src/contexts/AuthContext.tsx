import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../interfaces/IUser";
import { api } from "../service/api";

type AuthContextProps = {
  accessToken: string | null;
  setAccessToken: (newAccessToken: string) => void;
  currentUser: User | null;
  setCurrentUser: (newUser: User | null) => void;
};

export const AuthContext = createContext({} as AuthContextProps);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [accessToken, setAccessToken] = useState<string | null>(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyM2U4N2EyYi02YjhlLTRiYzctOTQxYy0zM2M1ZTM4NjgzMzEiLCJlbWFpbCI6ImFydGh1cmxhZ2UyMDA2QGdtYWlsLmNvbSIsImlhdCI6MTY2NjQzNjQ0OSwiZXhwIjoxNjY2NDQwMDQ5fQ.-24PS_OazlmFRKR9b9lzeLQwMjyoZJTLTmjIdpB0I7Y"
  );
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${accessToken}`;

    async function fetchUserData() {
      const res = await api.get("/users/me");

      setCurrentUser(res.data);
    }

    fetchUserData();
  }, []);

  const value = {
    accessToken,
    setAccessToken,
    currentUser,
    setCurrentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
