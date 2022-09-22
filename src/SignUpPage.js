import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import configuration from './configuration.json'
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

    const handleKeypress = e => {
      if (e.keyCode === 13) {
        register();
      }
    };

    const register = e => {
        e.preventDefault()
        if (firstName === "" || lastName === "" || username === "" || idCard === "" || tel === "" || password === "")
            changeMessage("Popunite sva polja!")
        else {
            axios.post(configuration.serverBaseURL+"/accounts", {
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "passwordHash": password,
                "phone": tel,
                "idCard": idCard,
                "active": 1,
            },
                { headers: { 'Content-Type': 'application/json' } }).then((response) => {
                    var id = response.data
                    navigate('/SmartReportSystem/citizenApp', { state: { "username": username, "password": password, "id": id } })
                }).catch((error) => {
                    const status = error.message
                    if (status.endsWith("403"))
                        changeMessage("Unesite druge pristupne podatke!")
                    else if (status.endsWith("409"))
                        changeMessage("Već imate nalog na sistemu!")
                })
        }

    }

    return (
        <div className="login-page">
            <form>
                <div className="name-form">
                    <p className="header-form">Ime:</p>
                    <input type="text" name="name" onChange={handleFirstNameChange} onKeyPress={handleKeypress}/>
                </div>
                <div className="surname-form">
                    <p className="header-form">Prezime:</p>
                    <input type="text" name="surname" onChange={handleLastNameChange} onKeyPress={handleKeypress}/>
                </div>
                <div className="jmb-form">
                    <p className="header-form">Broj lične karte:</p>
                    <input type="text" name="jmb" onChange={handleIdCardChange} onKeyPress={handleKeypress}/>
                </div>
                <div className="phone-form">
                    <p className="header-form">Broj telefona:</p>
                    <input type="text" name="phone" onChange={handleTelChange} onKeyPress={handleKeypress}/>
                </div>
                <div className="name-form">
                    <p className="header-form">Korisnicko ime:</p>
                    <input type="text" name="name" onChange={handleUsernameChange} onKeyPress={handleKeypress}/>
                </div>
                <div className="name-form">
                    <p className="header-form">Lozinka:</p>
                    <input type="password" name="name" onChange={handlePasswordChange} onKeyPress={handleKeypress}/>
                </div>
                <div id="infoMessage">{message}</div>
                    <button className="sign-in-btn" onClick={register}>Registruj se</button>
                <Link to="/SmartReportSystem" className="link">
                    <button className="btn">Povratak na prijavu</button>
                </Link>
            </form>
        </div>
    );
}

export default SignUpPage;