import React, { useState, useEffect } from 'react';
import './styles/CitizenApp.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import mapImg from './map.png'
import historyImg from './history.png'
import reportImg from './report.png'
import logoutImg from './logout.png'
import History from './History';



function HistoryWrapper() {

    const temp = useLocation();
    const [username, changeUsername] = useState("guest")
    const [password, changePassword] = useState("guest")
    const [id, changeId] = useState(-1)
    const navigate = useNavigate();

    const nav1 = () => {
        console.log(id + " from navigate ")
        navigate('/SmartReportSystem/citizenApp/cityMap', { state: { username: username, "password": password, "id": id } })
    }
    const nav2 = () => {
        console.log(id + " from navigate ")
        navigate('/SmartReportSystem/citizenApp/newReport', { state: { username: username, "password": password, "id": id } })
    }
    const nav3 = () => {
        console.log(id + " from navigate ")
        navigate('/SmartReportSystem/citizenApp/history', { state: { username: username, "password": password, "id": id } })
    }
    
        const logout = () => {
            changeUsername("guest")
            changePassword("guest")
            changeId(-1)
            navigate('/SmartReportSystem')
    
        }

    useEffect(() => {
        if (temp.state !== null) {
            changeUsername(temp.state.username);
            changePassword(temp.state.password);
            changeId(temp.state.id)
        }
    }, [])

    return (
        <div className="mainArea">
            <div className="menu1">
                <div className="buttonDiv">
                    <button className="menu_button" onClick={nav1}><img src={mapImg} alt="report" className="menu_button_img" id="mapImg" /></button>
                    <div className="button_label">Mapa grada</div>
                </div>
                <div className="buttonDiv">
                    <button className="menu_button" onClick={nav2}><img src={reportImg} alt="report" className="menu_button_img" id="reportImg" /></button>
                    <div className="button_label">Podnesi prijavu</div>
                </div>
                <div className="buttonDiv">
                    <button className="menu_button" onClick={nav3}><img src={historyImg} alt="report" className="menu_button_img" id="historyImg" /></button>
                    <div className="button_label">Istorija</div>
                </div>
                <div className="buttonDiv">
                    <button className='menu_button' onClick={logout}><img id="logoutImg" src={logoutImg} alt="logout"></img></button>
                    <div className="button_label">Kraj</div>
                </div>
            </div>
            <div id="contentArea" className="contentArea">
                {History(username, password, id)}
            </div>
        </div>
    );


}
export default HistoryWrapper;
