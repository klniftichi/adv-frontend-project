import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Avatar } from './avatar.svg';
import { ReactComponent as Reading } from './reading.svg';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../firebase-config";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmpass, setConfirmPass] = useState('');
    const [name, setName] = useState('');
    const [user, setUser] = useState({});
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPass, setErrorPass] = useState('');
    const [errorConfirmPass, setErrorConfirmPass] = useState('');
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorName("");
        setErrorEmail("");
        setErrorPass("");
        setErrorConfirmPass("");

        if (!name) {
            setErrorName("Name required");
        } else if (!email) {
            setErrorEmail("Email required");
        } else if (!pass) {
            setErrorPass("Password required");
        } else if (pass !== confirmpass) {
            setErrorConfirmPass("Passwords does not match");
        }
    } 

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    
    }, []);

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, pass);
            // console.log("user register:", user);
            history("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    const logout = async () => {
        await signOut(auth);
    };



    return (
        <div className="App-auth">
            <div className="div-register">
                <div>
                    <Reading className="reading"/>
                    <h1 className="title">Poker Hub Elite</h1>
                </div>
                <div className="auth-form-container-register">
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="avatar"><Avatar /></div>

                        <h1 className="welcome-text">Join our community!</h1>
                        
                        { errorName && <div className="error">{errorName}</div> }
                        <label htmlFor="firstname"><b>Name:</b></label>
                        <input className="input-register" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" id="firstname" name="name" />
                        
                        { errorEmail && <div className="error">{errorEmail}</div> }
                        <label htmlFor="email"><b>Email:</b></label>
                        <input className="input-register" value = {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                        { errorPass && <div className="error">{errorPass}</div> }
                        <label htmlFor="password"><b>Password:</b></label>
                        <input className="input-register" value = {pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                        
                        { errorConfirmPass && <div className="error">{errorConfirmPass}</div> }
                        <label htmlFor="password"><b>Confirm Password:</b></label>
                        <input className="input-register" value = {confirmpass} onChange={(e) => setConfirmPass(e.target.value)}  type="password" placeholder="********" id="confirmpass" name="confirmpass" />
                        
                        <button className="register-btn" onClick={(register)}><b>Register</b></button>
                    </form>

                    <button className="link-btn-register" type="submit" onClick={() => history("/")}>Already have an account? Login here.</button>
                </div>
            </div>
            {/* <h1>{user ? user.email : "Not Logged In"}</h1> */}
            {/* <button onClick={logout}>Signout</button> */}
        </div>
    )
}