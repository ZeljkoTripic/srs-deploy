import React from "react";
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Routes, Link, useNavigate } from 'react-router-dom';

import './styles/LoginPage.css';

import SignUpPage from './SignUpPage'

function LoginPage() {

    const [username, changeUsername] = useState("guest");
    const [password, changePassword] = useState("guest");
    const [message, changeMessage] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = event => {
        changeUsername(event.target.value)
    };
    const handlePasswordChange = event => {
        changePassword(event.target.value)
    };
    const login = () => {

        //logika za pristup serveru

        //logika za ispis poruke o gresci ili preusmjeravanja na korisnicku aplikaciju (prijavljen korisnik)

        
        
        //ako su pristupni podaci ispravni preusmjerava se na citizen app i salje username 
        // navigate('/citizenApp', { state: { username: username} })

        navigate('/fieldWorkerApp', { state: { username: username} })

    }

    return (
        < div className="login-page" >
            <div className="username-form">
                <p className="header-form">Korisnicko ime:</p>
                <input type="text" onChange={handleUsernameChange} />
            </div>
            <div className="password-form">
                <p className="header-form">Lozinka:</p>
                <input type="password" onChange={handlePasswordChange} />
            </div>
            <button className="sign-in-btn" onClick={login}>Prijavi se</button>
            <div className="buttons">
                <Link to="/citizenApp" className="link" state={{ username: "guest" }}>
                    <button className="no-registration-btn">Nastavi bez registracije</button>
                </Link>
                <Link to="/signUp" className="link">
                    <button className="register-btn">Registruj se</button>
                </Link>

            </div>
            <p className="infoMessage">{message}</p>
        </div >
    );
}

export default LoginPage;