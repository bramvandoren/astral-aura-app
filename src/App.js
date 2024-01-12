// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home";
import CreateOpdracht from "./Components/CreateOpdracht";
import Mediums from "./Components/Mediums";
import MediumProfile from "./Components/MediumProfile";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";
import { AuthProvider, useAuth } from "./Auth/AuthContext";
import Profile from "./Components/Profile";
import AuthContainer from "./Auth/AuthContainer";
import Opdrachten from "./Components/Opdrachten";
import ProfielOpdrachten from "./Components/ProfielOpdrachten";
import OpdrachtDetail from "./Components/OpdrachtDetail";
import KandidatenOpdracht from "./Components/KandidatenOpdracht";

function App() {
  // const { authToken } = useAuth();

  return (
    // <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opdrachten" element={<Opdrachten />} />
        <Route path="/opdrachten/:opdrachtId" element={<OpdrachtDetail />} />
        <Route path="/opdrachten/:opdrachtId/kandidaten" element={<KandidatenOpdracht />} />
        <Route path="/opdrachten/create" element={<CreateOpdracht/>}></Route>
        <Route path="/mediums" element={<Mediums />} />
        <Route path="/mediums/:mediumId" element={<MediumProfile />} />
        {/* <AuthContainer/> */}

        <Route path="/profiel" element={<Profile />} />
        <Route path="/profiel/opdrachten" element={<ProfielOpdrachten />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
