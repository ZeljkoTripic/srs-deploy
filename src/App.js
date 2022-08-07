import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/Style.css';

import SignUpPage from './SignUpPage'
import LoginPage from "./LoginPage";
import CitizenApp from "./CitizenApp";

import CityMapWrapper from './CityMapWrapper'
import HistoryWrapper from './HistoryWrapper'
import NewReportWrapper from './NewReportWrapper'
import FieldWorkerApp from "./FieldWorkerApp";

function App() {
    return (
        <Router>
            <div className="app">
                <div className="header">
                    <div className="amblem">
                        <img className="amblem_image" src="/amblem.png" alt="grb Banjaluke"></img>
                    </div>
                    <div className="title">
                        <b>APLIKACIJA ZA PRIJAVU PROBLEMA<br />
                            Grad Banja Luka</b>
                    </div>
                </div>
                <div className="area">
                    <Routes>
                        <Route path="/" exact element={<LoginPage />}></Route>
                        <Route path="/signUp" exact element={<SignUpPage />}></Route>
                        <Route path="/citizenApp" exact element={<CitizenApp />}></Route>
                        <Route path="/citizenApp/cityMap" exact element={<CityMapWrapper />}></Route>
                        <Route path="/citizenApp/history" exact element={<HistoryWrapper />}></Route>
                        <Route path="/citizenApp/newReport" exact element={<NewReportWrapper />}></Route>
                        <Route path="/fieldWorkerApp" exact element={<FieldWorkerApp />}></Route>
                    </Routes>
                </div>
                <div className="footer">ETF Banja Luka - Projektovanje softvera - avgust 2022
                    {/* <button className='logoutBtn'><img className="logoutImg" src='/logout.png' alt="logout"></img></button> */}
                </div>
            </div>
        </Router>
    );
}

export default App;