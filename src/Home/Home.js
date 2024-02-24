import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import {db} from "../firebase-config";
import {collection, getDocs} from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase-config";
import TestimonialComponent from "./TestimonialComponent";
import Contact from "./Contact";
import "./Home.css";

export const Home = () => {
    const [reviews, setReviews] = useState([]);
    const reviewsCollectionRef = collection(db, "reviews");
    const [jwtToken, setJwtToken] = useState([]);
    const history = useNavigate();

    useEffect(() => {

            const getReviews = async () => {
            const data = await getDocs(reviewsCollectionRef);
            setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getReviews();

        const auxjwtToken = auth.onAuthStateChanged(function(user) {
            if (user) {
            user.getIdToken().then(function(idToken) {  
                // console.log("id token: ", idToken);                
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
        // {console.log("jwt token ", jwtToken)}
        return (
            <>
                <div className="home-div">
                    <Navbar></Navbar>
                    <h1 className="home-title">Home</h1>
                    <p className="page-intro-home">Welcome to Poker Hub Elite, your premier destination for top-tier poker coaching and training. Aspiring to be more than just a platform, we're a vibrant community dedicated to honing your skills and enhancing your poker prowess. Our mission is simple: to empower players of all levels with the knowledge and strategies needed to dominate the tables.</p>
                    <p className="page-intro-home">At Poker Hub Elite, we've assembled a team of elite coaches who are not just experts in the game, but passionate mentors committed to your success. From beginners seeking a solid foundation to seasoned pros aiming for perfection, our tailored coaching programs cater to your individual needs and ambitions. With personalized guidance and actionable insights, you'll develop the mindset and skills required to thrive in today's competitive poker landscape.</p>
                    <p className="page-intro-home">We're constantly inspired by the success stories shared by our clients. Here are a few of their testimonials:</p>
                    <div className="testimonials">
                        {reviews.map((review, i) => <TestimonialComponent {...review} key={i}/>)}
                    </div>
                    <p className="page-intro-home">If you're ready to invest in sharpening your poker skills and mental acuity, we're here to support you. Explore our directory of experienced coaches today, and embark on your journey toward becoming a sharper, more successful player.</p>
                </div>
                <Contact></Contact>
            </>
        )
    } else {
        history("/Authentication/Login");
    }
}