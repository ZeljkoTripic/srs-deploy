import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './styles/FieldWorkerApp.css';
import Assignment from './Assignment'


function FieldWorkerApp() {

  const temp = useLocation();
  const [username, changeUsername] = useState("-")
  const navigate = useNavigate();

  useEffect(() => {
    if (temp.state !== null) {
      changeUsername(temp.state.username);
    }
  }, [])

  const logout = () => {
    changeUsername("-")
  }

  //logika za citanje pristiglih zadataka
  const assignments = ["zadatak1", "zadatak2", "zadatak3", "zadatak4", "zadatak5", "zadatak6"]

  return (
      <div className="area">
        {assignments.map(a => (Assignment(a,username)))};
        <button id="logout" onClick={logout}><img className="menu_button_logout_img" src='/logout.png' alt="logout"></img></button>
      </div>
  );
}

export default FieldWorkerApp;
