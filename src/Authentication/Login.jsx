import React, { useState, useEffect } from "react";
import {ReactComponent as Avatar} from './avatar.svg';
import {ReactComponent as Reading} from './reading.svg';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../firebase-config";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useState({});
    // const [error, setError] = useState('');
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("email login:" , email);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    
    }, []);

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, pass);
            // console.log("user login:", user);
            history("/Home");
        } catch (error) {
            console.log(error.message);
        }
    };

    
    const logout = async () => {
        await signOut(auth);
    };

    
    return (
        <div className="App-auth">
            <div className="div-login">   
                <div>
                    <Reading className="reading"/>
                    <h1 className="title"> Poker Hub Elite</h1>
                </div>
                <div className="auth-form-container-login">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="avatar"> <Avatar /> </div>

                        <h1 className="welcome-text">Welcome!</h1>
                                
                        <label htmlFor="email"> <b>Email:</b></label>
                        <input className="input-login" value = {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                        <label htmlFor="password"><b>Password:</b></label>
                        <input className="input-login" value = {pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                                
                        <button id="recover-button" className="link-btn-recover" onClick={() => history("/Authentication/RecoverPassword")}>Forgot password?</button>
                        <button id="login-button" className="login-btn" type="submit" onClick={login}><b>Login</b></button>
                    </form>

                    <button id="register-button" className="link-btn-login" onClick={() => history("/Authentication/Register")}>Don't have an account? Register here.</button>
                </div>
            </div>
            {/* <h1>{user ? user.email : "Not Logged In"}</h1> */}
            {/* <button onClick={logout}>Signout</button> */}
        </div>
    );
}