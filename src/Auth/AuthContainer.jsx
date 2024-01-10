// AuthContainer.jsx
import React, { createContext, useContext, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { Routes as AppRoutes } from "../core/routes";
import LoginPage from "../Components/Login";
import RegisterPage from "../Components/Registration";
import storage from "../core/index";
import Home from "../Components/Home";
import Mediums from "../Components/Mediums";
import MediumProfile from "../Components/MediumProfile";
import App from "../App";

export const AuthContext = createContext();

const AuthContainer = () => {
  const [user, setUser] = useState(storage.getUser());

  const updateUser = (updatedUser) => {
    storage.storeUser(updatedUser);
    if (updatedUser) {
      storage.storeUserVariableData({
        email: updatedUser.user.email,
        userName: updatedUser.user.username,
      });
      storage.storeJWT(updatedUser.jwt);
    } else {
      storage.storeUserVariableData(null);
      storage.storeJWT(null);
    }
    setUser(updatedUser);
  };

  const logout = () => {
    updateUser(null);
  };

  if (user) {
    return (
      <AuthContext.Provider value={{ user, setUser: updateUser, logout }}>
        <App/>
      </AuthContext.Provider>
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoutes.Login}
        element={<LoginPage setUser={updateUser} />}
      />
      <Route
        path={AppRoutes.Register}
        element={<RegisterPage setUser={updateUser} />}
      />
      <Route path="*" element={<Navigate to={AppRoutes.Login} />} />
    </Routes>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
}

export {
  useAuth,
}

export default AuthContainer;
