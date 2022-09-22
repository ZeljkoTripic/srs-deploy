import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/CityOfficialApp.css';
import eventImg from './event.png'
import historyImg from './history.png'
import assignmentImg from './assignment2.png'
import mapImg from './map.png'
import logoutImg from './logout.png'
import CityMap from './CityMap';

function CityOfficialMapWrapper() {

  const temp = useLocation();
  const [username, changeUsername] = useState("guest")
  const [password, changePassword]= useState("guest")
  const [id,changeId]= useState(-1)
  const navigate = useNavigate();

  useEffect(() => {
    if (temp.state !== null) {
      changeUsername(temp.state.username);
      changePassword(temp.state.password);
      changeId(temp.state.id)
    }
  }, [])

  const logout = () => {
    changeUsername("guest")
    changePassword("guest")
    changeId(-1)
    navigate('/SmartReportSystem')
  }


  function map_click() {
    console.log(username)
    navigate('/SmartReportSystem/cityOfficialApp/cityMap', { state: { username: username, password:password, id:id } })
  }
  function reports_click() {
    navigate('/SmartReportSystem/cityOfficialApp/arrivedReports', { state: { username: username, password:password, id:id } })
  }
  function arrived_click() {
    navigate('/SmartReportSystem/cityOfficialApp/arrivedStatements', { state: { username: username, password:password, id:id  } })
  }
  function events_click() {
    navigate('/SmartReportSystem/cityOfficialApp/events', { state: { username: username , password:password, id:id } })
  }


  return (
    <div className="mainArea">
      <div className="menu1">
        <div className="buttonDiv">
          <button className="menu_button" onClick={map_click}><img src={mapImg} alt="report" className="menu_button_img" /></button>
        <div className="button_label">Mapa grada</div>
        </div>
        <div className="buttonDiv">
          <button className="menu_button" onClick={reports_click}><img src={assignmentImg} alt="report" className="menu_button_img" /></button>
        <div className="button_label">Pristigle prijave</div>
        </div>
        <div className="buttonDiv">
          <button className="menu_button" onClick={arrived_click}><img src={historyImg} alt="report" className="menu_button_img" /></button>
        <div className="button_label">Zadaci i izvještaji</div>
        </div>
        <div className="buttonDiv">
          <button className="menu_button" onClick={events_click}><img src={eventImg} alt="report" className="menu_button_img" /></button>
        <div className="button_label">Dešavanja</div>
        </div>
        <div className="buttonDiv">
        <button className='menu_button' onClick={logout}><img className="menu_button_img" src={logoutImg} alt="logout"></img></button>
        <div className="button_label">Kraj</div>
        </div>
        </div>
      <div id="contentArea" className="contentArea"> 
          {CityMap()}
      </div>
    </div>
  );
}

export default CityOfficialMapWrapper;
