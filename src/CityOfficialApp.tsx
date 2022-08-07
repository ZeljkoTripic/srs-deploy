import React from 'react';
import { useEffect, useState } from 'react';
import './styles/CityOfficialApp.css';
import CityMap from './CityMap';

function CityOfficialApp() {

  const [content, changeContent] = useState("map");
  function map_click() {
    changeContent("map");
  }
  function reports_click() {
    changeContent("reports");
  }
  function arrived_click() {
    changeContent("arrived");
  }
  function events_click() {
    changeContent("events");
  }

  const [newEvent, change] = useState(false);
  function addNewEvent_click() {
    change(!newEvent);
  }

  const events = ["event1", "event2", "events3", "event4", "event5", "event6"];

  return (
      <div className="mainrea">
        <div className="menu">
          <div className="mapDiv">
            <button className="menu_button" onClick={map_click}><img src="map.png" alt="report" className="menu_button_img_map" /></button>
          </div>
          <div className="button_label">Mapa grada</div>
          <div className="reports">
            <button className="menu_button" onClick={reports_click}><img src="assignment2.png" alt="report" className="menu_button_img_reports" /></button>
          </div>
          <div className="button_label">Pristigle prijave</div>
          <div className="arrived">
            <button className="menu_button" onClick={arrived_click}><img src="history.png" alt="report" className="menu_button_img_arrived" /></button>
          </div>
          <div className="button_label">Pristigli izvještaji</div>
          <div className="events">
            <button className="menu_button" onClick={events_click}><img src="event.png" alt="report" className="menu_button_img_events" /></button>
          </div>
          <div className="button_label">Dešavanja</div>
          <button className='menu_button' id="logout" /*onClick={logout}*/><img className="menu_button_logout_img" src='/logout.png' alt="logout"></img></button>
        </div>
        <div id="contentArea" className="contentArea">
          {content === "map" ? CityMap() :

            <div className="eventsDiv">
              {newEvent === true ?
                <div className='newEventExtended'>
                  <button className="newEventBtn2" id="button2" onClick={addNewEvent_click}><img src="plus.png" className="plusImg" alt="plus" /></button>
                  <textarea className="eventTitle" placeholder='Naziv dešavanja'></textarea>
                  <textarea className="eventInfo" placeholder='Informacije o dešavanju'></textarea>
                  <select name="markerType" id="type" className="combo">
                      <option value="INFO">INFORMACIJE</option>
                      <option value="RADOVI">RADOVI</option>
                      <option value="OPASNOST">OPASNOST</option>
                  </select>
                  <button className="addEventBtn">Kreiraj desavanje</button>
                </div>
                :
                <div className="newEvent">
                  <div className="labelForNewEventBtn">Novo dešavanje </div>
                  <button className="newEventBtn" id="button" onClick={addNewEvent_click}><img src="plus.png" className="plusImg" alt="plus" /></button>
                </div>
              }
              {events.map((event) => { return <div className="event">{event}</div> })}
            </div>
          }
        </div>
      </div>
  );
}

// function NewEvent() {

//   return (

//   );
// }
// function Events(flag: boolean) {

//   //logika za dohvatanje desavanja

//   const events = ["event1", "event2", "events3", "event4", "event5", "event6"];
//   return (
//     <div className="eventsDiv">
//       {flag === false ? NewEvent() : <div></div>}
//       {events.map((event) => { return <div className="event">{event}</div> })}
//     </div>
//   )
// }
export default CityOfficialApp;
