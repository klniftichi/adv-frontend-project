import { useState, useEffect } from "react";
import "./App.css";
import {db} from "./firebase-config";
import {collection, getDocs} from "firebase/firestore";
import { BrowserRouter as Router, Route, Routes, Link, ProtectedRoute } from "react-router-dom";
import './Authentication/Authentication.css';
import {Login} from "./Authentication/Login";
import {Register} from "./Authentication/Register";
import { RecoverPassword } from "./Authentication/RecoverPassword";
import { Coaches } from "./Coaches/Coaches";
import {Home } from "./Home/Home";


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/Authentication/Login" element={<Login/>}/>
        <Route exact path="/Authentication/RecoverPassword" element={<RecoverPassword/>}/>
        <Route exact path="/Authentication/Register" element={<Register/>}/>
        <Route exact path="" element={<Login />} />
        <Route exact path="/Home" element={<Home/>}/>
        <Route exact path="/Coaches" element={<Coaches/>}/>
      </Routes>
    </Router>
    </>
    );
}

export default App;
