import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import configuration from './configuration.json'
import mapImg from './map.png'
import eventImg from './event.png'
import historyImg from './history.png'
import reportImg from './report.png'
import logoutImg from './logout.png'
import userImg from './user.png'
import './styles/CitizenApp.css';

function CitizenApp() {

  const temp = useLocation();
  const [username, changeUsername] = useState("guest")
  const [password, changePassword] = useState("guest")
  const [id, changeId] = useState(-1)
  const [user,changeUser]=useState(null)

  const navigate = useNavigate();

  const nav1 = () => {
    navigate('/SmartReportSystem/citizenApp/cityMap', { state: { "username": username, "password": password, "id": id } })
  }
  const nav2 = () => {
    navigate('/SmartReportSystem/citizenApp/newReport', { state: { "username": username, "password": password, "id": id } })
  }
  const nav3 = () => {
    navigate('/SmartReportSystem/citizenApp/history', { state: { "username": username, "password": password, "id": id } })
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
  useEffect(()=>{

    if(id!==-1){
      var credentials=btoa(username+":"+password)
      axios.get(configuration.serverBaseURL + "/citizens/" + id,

                { headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + credentials } }).then((response) => {
                    changeUser(response.data)
                    console.log(response.data)
                }).catch((error) => {
                })
    }
  },[id])

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
      {user && <div className="user-info">
          <img className="user-img" src={userImg} alt="user"></img>
          <div className="user-data">{user.firstName+" "+user.lastName}</div> 
        </div>}
      </div>
    </div>
  );
}
export default CitizenApp;
