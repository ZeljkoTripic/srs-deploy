import React,{ useEffect, useState}  from 'react';
import axios from 'axios';
import './styles/FieldWorkerApp.css';
import configuration from './configuration.json'
import mapImg from './map.png'
import assignmentImg from './assignment2.png'
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';

function Assignment(props) {
    const [state, changeState] = useState(props.assignmentInfo.done !== 0 ? "done" : "minimal");
    const [newInfo, changeInfo] = useState("");
    const [report, changeReport] = useState(null);
    const navigate = useNavigate();

    const details = () => {
        if (state === "minimal")
            changeState("maximal");
        else if (state === "maximal")
            changeState("minimal")
    }
    const handleInfoChange = event => {
        changeInfo(event.target.value);
    }
    const handleReportChange = event => {
        changeReport(event.target.value);
    }
    const send = () => {

        var credentials=btoa(props.username+":"+props.password)
        if (report !== "") {
        axios.post(configuration.serverBaseURL+"/statements",
            {
                "assignmentId": props.assignmentInfo.id,
                "content": report,
            },
            { headers: { 'Content-Type': 'application/json','Authorization': 'Basic ' + credentials }}).then((response) => {
            }).catch((error) => {
            })
        changeState("done")
    }
}
const location = () => {
    navigate('/SmartReportSystem/fieldWorkerApp/location', { state: { x: props.assignmentInfo.x, y: props.assignmentInfo.y } })
}
const update = () => {
    var credentials=btoa(props.username+":"+props.password)
    axios.put(configuration.serverBaseURL+"/assignments/"+props.assignmentInfo.id,
             newInfo,
            { headers: { 'Content-Type': 'application/json','Authorization': 'Basic ' + credentials }}).then((response) => {

            }).catch((error) => {
            })

}
useEffect(() =>{
    console.log(props.assignmentInfo)
})
return (
    state === "minimal" && props.assignmentInfo.statement===null?
        (<div className='assignment' key={props.assignmentInfo.id}>
            <p className='info'>Nalogodavac: {props.assignmentInfo.creator.service} - {props.assignmentInfo.creator.firstName+" "+props.assignmentInfo.creator.lastName}
                <p id="red-text">
                Datum: {props.assignmentInfo.date}
                <br />
                Naslov: {props.assignmentInfo.title}
            </p>
            </p>
            <button className="infoButton" onClick={details}><img className="buttonImg" src={assignmentImg} alt="info"></img></button>
            <button className="mapButton" onClick={location}><img className="buttonImg" src={mapImg} alt="info"></img></button>
        </div>) :
        (state === "maximal" && props.assignmentInfo.statement===null?
            (<div className='assignmentExpanded' key={props.assignmentInfo.id}>
                <p className='infoExtended'> Opis:  {props.assignmentInfo.desc} <br /> Informacije: {props.assignmentInfo.feedback && props.assignmentInfo.feedback.includes("###")?props.assignmentInfo.feedback.replace("###"," | "):props.assignmentInfo.feedback}</p>
                <button className="infoButtonExpanded" onClick={details}><img className="buttonImgExpanded" src={assignmentImg} alt="info"></img></button>
                <button className="mapButtonExpanded" onClick={location}><img className="buttonImg" src={mapImg} alt="info"></img></button>
                <label className='info1'>Informacije o napretku</label>
                <textarea className='txtArea1' onChange={handleInfoChange}> </textarea>
                <button className='btn1' onClick={update}>Ažuriraj</button>
                <label className='info2'>Izvještaj</label>
                <textarea className='txtArea2' onChange={handleReportChange}> </textarea>
                <button className='btn2' onClick={send}>Pošalji</button>
            </div>) :
            (<div className='assignment'>
                <div id="data">
                    Nalogodavac: {props.assignmentInfo.creator.service} - {props.assignmentInfo.creator.firstName+" "+props.assignmentInfo.creator.lastName} {props.assignmentInfo.date}
                    <br />
                    Datum: {props.assignmentInfo.date}
                    <br />
                    Naslov: {props.assignmentInfo.title}
                    <br />
                    Opis: {props.assignmentInfo.description}
                    <br />
                    {props.assignmentInfo.statement && "Izvještaj: "+props.assignmentInfo.statement.date} <br/>
                    {props.assignmentInfo.statement && props.assignmentInfo.statement.content}

                </div>
            </div>)
        )
)
}

export default Assignment;
