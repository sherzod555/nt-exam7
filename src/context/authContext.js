import { createContext, useState, useEffect  } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const fromLocalStorage = localStorage.getItem('user');
    return fromLocalStorage ? JSON.parse(fromLocalStorage) : null;
  });
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('isDarkMode');
    return storedMode ? JSON.parse(storedMode) : false;
  });

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  const toggleMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('isDarkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isDarkMode,
        toggleMode,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthProvider };
