import React, { useState } from 'react';
import axios from 'axios'
import infoImg from './info.png'
import settingsImg from './settings.png'
import mapImg from './map.png'
import { useNavigate } from 'react-router-dom';
import configuration from './configuration.json'

function Report(props) {

    const navigate = useNavigate();
    const [expanded, changeExp] = useState(false);
    const [state, changeState] = useState(props.report.state === "POSLATO" ? "ZAPRIMLJENO" : props.report.state)

    const click = () => {
        changeExp(!expanded)
    }
    const handleChange = event => {
        changeState(event.target.value)
        props.report.state = event.target.value;
        var credentials = btoa(props.username + ":" + props.password)
        axios.put(configuration.serverBaseURL + "/reports/" + props.report.id,
            event.target.value
            ,
            { headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + credentials } }).then((response) => {

            }).catch((error) => {

            })

    }
    const newAssignment = () => {
        navigate('/SmartReportSystem/cityOfficialApp/newAssignment', { state: { username: props.username, password: props.password, id: props.id, report: props.report, list: true } });
    }
    const seeLocation= ()=>{
        navigate('/SmartReportSystem/fieldWorkerApp/location', { state: { x: props.report.x, y: props.report.y } })
    }

    return (
        expanded === false ?
            <div className="reportDiv">
                <div className="report-info">
                    <p id="shortInfo" className="red">{"#" + props.report.id + " - " + props.report.type + "  " + props.report.date}</p>
                    <p id="shortInfo">{"Naslov: " + props.report.title}</p>
                </div>
                <div className="stateDiv">{"Stanje prijave: "+props.report.state}</div>
                <button id="reportInfo" onClick={click}><img id="reportInfoImg" src={infoImg} /></button>
                <button id="reportInfo" onClick={seeLocation}><img id="reportInfoImg" src={mapImg} /></button>
            </div>
            :
            <div className="reportExpandedDiv">
                <div className="report-info-ex">
                    <p id="shortInfo" className="red">{props.report.creator!==null?"Podnosilac: "+props.report.creator.firstName+" "+props.report.creator.lastName:"Prijava je anonimna!"}</p>
                    <p id="shortInfo">{"Napomena: " + props.report.note}</p>
                </div>
                <div className="contInfo">Sadržaj: <br/>{props.report.content}</div>
                <div id="states">
                    <p id="reportStateLbl2">{state}</p>
                    <select id="state-combo"className="fieldService" onChange={handleChange}>
                        <option value="ZAPRIMLJENA">ZAPRIMLJENA</option>
                        <option value="PROSLIJEĐENA TERENSKOJ SLUŽBI">PROSLIJEĐENA TERENSKOJ SLUŽBI</option>
                        <option value="U OBRADI">U OBRADI</option>
                        <option value="ODBIJENA">ODBIJENA</option>
                        <option value="ZATVORENA">ZATVORENA</option>
                    </select>
                </div>
                <div id="btnWrapper">
                    <button id="reportInfo" onClick={click}><img id="reportInfoImg" src={infoImg} /></button>
                    <button id="assignmentBtn" onClick={newAssignment}><img id="reportInfoImg2" src={settingsImg} /></button>
                </div>
            </div>
    )
}

export default Report;