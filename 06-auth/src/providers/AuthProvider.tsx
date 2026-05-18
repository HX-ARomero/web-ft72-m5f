import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { AuthContext } from "../contexts/AuthContext";
import { getUserProfile, loginService, logoutService, signupService } from "../services/auth.service";
import type { AuthUser } from "../types/auth.types";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  //* 1. ESTADOS:
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      //* 1. NO hay sesión
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      //* 2. HAY sesión:
      const profile = await getUserProfile(firebaseUser.uid);
      setUser(profile);
      setLoading(false);
    });

    //* Clean UP:
    return unsubscribe;
  }, []);

  //* firebaseUser: { uid, email, password } | null

  return (
    <AuthContext.Provider
      value={{
        user: user,
        loading: loading,
        login: loginService,
        signup: signupService,
        logout: logoutService,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
