


import React from 'react';
import { useEffect, useState } from 'react';
import CityMap from './CityMap';
import NewReport from './NewReport';
import History from './History';
import AdrressPicker from './AdrressPicker';
import './styles/CitizenApp.css';
import { useLocation, BrowserRouter as Router, Switch, Route, Routes, Link } from 'react-router-dom';



function Wrapper() {

  const temp = useLocation();
  let username;
  if (temp.state !== null) {
    username = temp.state.username;
    console.log(temp.state.username)
  }

  const [content, changeContent] = useState("map");
  function map_click() {
    changeContent("map");
  }
  function newReport_click() {
    changeContent("newReport");
  }
  function history_click() {
    changeContent("history");
  }


  return (
    <div className="mainArea">
      <div className="menu">
        <div className="mapDiv">
          <button className="menu_button"><img src="/map.png" alt="report" className="menu_button_img_map" /></button>
        </div>
        <div className="button_label">Mapa grada</div>
        <div className="newReport">
          <button className="menu_button"><img src="/report1.png" alt="report" className="menu_button_img_report" /></button>
        </div>
        <div className="button_label">Podnesi prijavu</div>
        <div className="myReports">
          <button className="menu_button" ><img src="/history.png" alt="report" className="menu_button_img_history" /></button>
        </div>
        <div className="button_label">Istorija</div>
      </div>
      <div id="contentArea" className="contentArea">
        {CityMap()}
      </div>
    </div>
  );


}
export default Wrapper;
