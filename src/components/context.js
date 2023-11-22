import { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const fromLocalStorage = localStorage.getItem('user');
  const [user, setUser] = useState(fromLocalStorage);

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthProvider };
