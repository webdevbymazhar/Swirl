import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

let MyContext = createContext();

const AuthContext = ({ children }) => {
  let [user, setUser] = useState({
    id: "",
    username: "",
    token: ""
  });

  let fetchUser = async (id) => {
    let res = await axios.get(`http://localhost:8000/user/get-user-by-id/${id}`);
    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user)); 
  };

  let updateUser = () => {
    console.log(user);
    
  }

  useEffect(() => {
    let storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Load user from localStorage
    }
  }, []);

  return (
    <MyContext.Provider value={{ user, setUser, fetchUser,updateUser }}>
      {children}
    </MyContext.Provider>
  );
};
export const useAuthContext = () => useContext(MyContext);

export default AuthContext;