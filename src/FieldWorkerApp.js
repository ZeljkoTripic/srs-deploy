import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Assignment from './Assignment'
import configuration from './configuration.json'
import logoutImg from './logout.png'
import './styles/FieldWorkerApp.css';


function FieldWorkerApp() {

  const temp = useLocation();
  const [username, changeUsername] = useState("guest")
  const [password, changePassword] = useState("guest")
  const [id, changeId] = useState(-1)
  const [fetched, changefetched] = useState(false);
  const [assignments, changeAssignments] = useState(null)
  const [user,changeUser]=useState(null)
  const navigate = useNavigate();

  const logout = () => {
    changeUsername("-")
    changePassword("-")
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

  useEffect(() => {
    if (id !== -1) {
      var credentials = btoa(username + ":" + password)
      axios.get(configuration.serverBaseURL + "/assignments/executor/" + id,
        { headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + credentials } }).then((response) => {
          changeAssignments(response.data)
          console.log(response.data)
        }).catch((error) => { })
    }
    else
      changeAssignments(null)
  }, [id])

  useEffect(()=>{

    if(id!==-1){
      var credentials=btoa(username+":"+password)
      axios.get(configuration.serverBaseURL + "/fieldServices/" + id,

                { headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + credentials } }).then((response) => {
                    changeUser(response.data)
                    console.log(response.data)
                }).catch((error) => {
                })
    }
  },[id])


  return (
    <div className="area">
      <div id="content2">
      {assignments !== null ? assignments.map(a => (<Assignment assignmentInfo={a} username={username} password={password} id={id} />)) : <div className="infoMessage">Ne postoji ni jedan nedovršen zadatak koji je dodijeljen vašoj službi!</div>};
      </div>
      <button id="logout" onClick={logout}><img className="menu_button_logout_img" src={logoutImg} alt="logout"></img></button>
      {user && <div className="user">{user.service+" - "+user.name}</div>}
    </div>
  );
}

export default FieldWorkerApp;
