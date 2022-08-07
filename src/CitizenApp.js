import React, { useEffect, useState } from 'react';
import './styles/CitizenApp.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';

function CitizenApp() {

  const temp = useLocation();
  const [username, changeUsername] = useState("guest")
  const navigate = useNavigate();

  const nav1 = () => {
    console.log(username + " from navigate ")
    navigate('/citizenApp/cityMap', { state: { username: username } })
  }
  const nav2 = () => {
    console.log(username + " from navigate ")
    navigate('/citizenApp/newReport', { state: { username: username } })
  }
  const nav3 = () => {
    console.log(username + " from navigate ")
    navigate('/citizenApp/history', { state: { username: username } })
  }

  useEffect(() => {
    if (temp.state !== null) {
      changeUsername(temp.state.username);
    }
  }, [])

  const logout = () => {
    changeUsername("guest")
  }

  return (
    <div className="mainArea">
      <div className="menu">
        <div className="mapDiv">
          {/* <Link to="/citizenApp/cityMap" state={{ username: username }}> */}
          <button className="menu_button" onClick={nav1}><img src="/map.png" alt="report" className="menu_button_img_map" /></button>
          {/* </Link> */}
        </div>
        <div className="button_label">Mapa grada</div>
        <div className="newReport">
          {/* <Link to="/citizenApp/newReport" state={{ username: username }}> */}
          <button className="menu_button" onClick={nav2}><img src="/report1.png" alt="report" className="menu_button_img_report" /></button>
          {/* </Link> */}
        </div>
        <div className="button_label">Podnesi prijavu</div>
        <div className="myReports">
          {/* <Link to="/citizenApp/history" state={{ username: username }}> */}
          <button className="menu_button" onClick={nav3}><img src="/history.png" alt="report" className="menu_button_img_history" /></button>
          {/* </Link> */}
        </div>
        <div className="button_label">Istorija</div>
        <button className='menu_button' id="logout" onClick={logout}><img className="menu_button_logout_img" src='/logout.png' alt="logout"></img></button>
      </div>
      <div id="contentArea" className="contentArea">
        <p className="info_p"> Sistem za prijavu problema je jednostavna web aplikacija koju omogućava građanima da brzo i jednostavno prijave probleme koje su uočili na teritoriji grada. Kako bi korisnici mogli da koriste puni skup funkcionalnosti potrebno je da kreiraju svoj nalog. </p>
      </div>
    </div>
  );


}
export default CitizenApp;
