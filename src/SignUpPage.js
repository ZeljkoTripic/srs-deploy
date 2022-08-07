import React from "react";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './styles/LoginPage.css';

function SignUpPage() {

    const navigate = useNavigate();
    const [firstName, changeFirstName] = useState("");
    const [lastName, changeLastName] = useState("");
    const [username, changeUsername] = useState("");
    const [password, changePassword] = useState("");
    const [idCard, changeIdCard] = useState("");
    const [tel, changeTel] = useState("");
    const [message, changeMessage] = useState("");

    const handleUsernameChange = event => {
        changeUsername(event.target.value)
    };
    const handlePasswordChange = event => {
        changePassword(event.target.value)
    };
    const handleIdCardChange = event => {
        changeIdCard(event.target.value)
    };
    const handleTelChange = event => {
        changeTel(event.target.value)
    };
    const handleFirstNameChange = event => {
        changeFirstName(event.target.value)
    };
    const handleLastNameChange = event => {
        changeLastName(event.target.value)
    };

    const register = () => {

        //logika za registraciju


        console.log(firstName+ "  "+ lastName+ "  "+idCard+"  "+tel+"  "+ username + "  " + password);
        //ako su pristupni podaci ispravni preusmjerava se na citizen app i salje username 
        navigate('/citizenApp', { state: { username: username} })
    }

    return (
        <div className="login-page">
            <div className="name-form">
                <p className="header-form">Ime:</p>
                <input type="text" name="name" onChange={handleFirstNameChange}/>
            </div>
            <div className="surname-form">
                <p className="header-form">Prezime:</p>
                <input type="text" name="surname" onChange={handleLastNameChange}/>
            </div>
            <div className="jmb-form">
                <p className="header-form">Broj lične karte:</p>
                <input type="text" name="jmb" onChange={handleIdCardChange}/>
            </div>
            <div className="phone-form">
                <p className="header-form">Broj telefona:</p>
                <input type="text" name="phone" onChange={handleTelChange}/>
            </div>
            <div className="name-form">
                <p className="header-form">Korisnicko ime:</p>
                <input type="text" name="name" onChange={handleUsernameChange}/>
            </div>
            <div className="name-form">
                <p className="header-form">Lozinka:</p>
                <input type="password" name="name" onChange={handlePasswordChange}/>
            </div>
            <div className="container-1">
                <button className="register-submit-btn" onClick={register}>Registruj se</button>
            </div>
            <Link to="/" className="link">
                <button className="sign-in-btn">Povratak na prijavu</button>
            </Link>
            <p className="infoMessage">{message}</p>
        </div>
    );
}

export default SignUpPage;