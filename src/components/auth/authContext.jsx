import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [isValid, setIsValid] = useState(false);

  const login = async (token) => {
    const options = {
      endpoint: "my/agent",
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: null,
    };

    try {
      const response = await fetch(
        `https://api.spacetraders.io/v2/${options.endpoint}`,
        {
          method: options.method,
          headers: options.headers,
          body: options.body,
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error during login:", errorData);
        setIsValid(false);
      } else {
        const data = await response.json();
        setUserToken(token);
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("token", token);
        setIsValid(true);
      }
    } catch (error) {
      setIsValid(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw error;
    }
  };

  const logout = () => {
    setUserToken(null);
    setUser(null);
    setIsValid(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  

  return (
    <AuthContext.Provider value={{ userToken, user, isValid, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {

  return useContext(AuthContext);
};

