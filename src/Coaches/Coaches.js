import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import {db} from "../firebase-config";
import {collection, getDocs} from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase-config";
import CoachComponent from "./CoachComponent";
import "./Coaches.css";

export const Coaches = () => {
    const [coaches, setCoaches] = useState([]);
    const coachesCollectionRef = collection(db, "coaches");
    const [jwtToken, setJwtToken] = useState([]);
    const history = useNavigate();

    useEffect(() => {
    
        const getCoaches = async () => {
        const data = await getDocs(coachesCollectionRef);
        setCoaches(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCoaches();

    const auxjwtToken = auth.onAuthStateChanged(function(user) {
        if (user) {
          user.getIdToken().then(function(idToken) {  
              if(idToken !== "") {
                setJwtToken(idToken);
              } else {
                history("/Authentication/Login");
              }
              return idToken;
          });
        }
      });
    }, [])
    

     if ( jwtToken && jwtToken?.length !== 0) {
    return (
        <div className="coaches-div">
            <Navbar></Navbar>
            <h1 className="coaches-title">Coaches</h1>
            <p className="page-intro">Welcome to our directory of highly qualified coaches! Our team of seasoned professionals provides a diverse array of specialties and methods aimed at enhancing your poker skills and strategic mindset. From mastering game theory to refining psychological resilience, our coaches possess the expertise and knowledge to guide you. Explore our roster of coaches to discover their backgrounds, areas of expertise, and coaching methodologies. Whether you seek personalized guidance for your individual play, group dynamics, or tournament strategies, you'll find a coach who can elevate your game. With a commitment to empathy, understanding, and proven coaching techniques, our team is dedicated to empowering you to achieve your poker goals and thrive at the tables.</p>

            <div className="">
                {coaches.map((coach, i) => <CoachComponent {...coach} key={i}/>)}
            </div>
        </div>
     )
    } else {
        history("/Authentication/Login");
    }
}