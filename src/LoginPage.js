import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
import configuration from './configuration.json'
import './styles/LoginPage.css'

function LoginPage() {

    const [username, changeUsername] = useState("guest")
    const [password, changePassword] = useState("guest")
    const [message, changeMessage] = useState("")
    const navigate = useNavigate()

    const handleUsernameChange = event => {
        changeUsername(event.target.value)
    }
    const handlePasswordChange = event => {
        changePassword(event.target.value)
    }

    const login = e => {
        e.preventDefault()
        var credentials = btoa(username + ':' + password)
        axios.get(configuration.serverBaseURL+"/accounts",
            { headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + credentials } }).then((response) => {
                console.log(response.data)
                if (response.data.startsWith("Citizen")) {
                    navigate('/SmartReportSystem/citizenApp', { state: { "username": username, "password": password, "id": response.data.split("#")[1] } })
                }
                else if (response.data.startsWith("CityOfficial")) {
                    navigate('/SmartReportSystem/cityOfficialApp', { state: { "username": username, "password": password, "id": response.data.split("#")[1] } })
                }
                else {
                    navigate('/SmartReportSystem/fieldWorkerApp', { state: { "username": username, "password": password, "id": response.data.split("#")[1] } })
                }
            }).catch((error) => {
                const status = error.message
                // alert(error)
                if (status.endsWith("401"))
                    changeMessage("Nevalidni pristupni podaci!")
                else
                    changeMessage("Server nije u funkciji!")
            })
    }

    const handleKeypress = e => {
        if (e.keyCode === 13) {
          login();
        }
      };

    return (
        < div className="login-page" >
            <form >
                <div className="username-form">
                    <p className="header-form">Korisničko ime:</p>
                    <input type="text" onChange={handleUsernameChange} />
                </div>
                <div className="password-form">
                    <p className="header-form">Lozinka:</p>
                    <input type="password" onChange={handlePasswordChange} />
                </div>
                <div id="infoMessage">{message}</div>
                <button className="sign-in-btn" onClick={login}>Prijavi se</button>
                <div className="buttons">
                    <Link to="/SmartReportSystem/citizenApp" className="link" state={{ username: "guest" }}>
                        <button className="btn">Nastavi bez registracije</button>
                    </Link>
                    <Link to="/SmartReportSystem/signUp" className="link">
                        <button className="btn">Registruj se</button>
                    </Link>
                </div>
            </form>
        </div >
    );
}

export default LoginPage;