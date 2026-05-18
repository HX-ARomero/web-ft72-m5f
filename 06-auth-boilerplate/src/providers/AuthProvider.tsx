import { AuthContext } from "../contexts/AuthContext";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  return (
    <AuthContext.Provider
      value={{
        user: null,
        loading: false,
        login: async () => {},
        signup: async () => {},
        logout: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
