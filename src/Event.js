import React, { useState, useEffect } from 'react';
import configuration from './configuration.json'
import settingsImg from './settings.png'
import declineImg from './decline.png'
import axios from 'axios'
import './styles/CityOfficialApp.css';
import { setEmitFlags } from 'typescript';

function Event(props) {

    const [extended, changeExt] = useState(false)
    const [deleted, changeDel] = useState(props.event.active===0)
    const [info, changeInfo]=useState(props.event.info)
    const [desc, changeDesc]=useState(props.event.description)

    const click = () => {
        changeExt(!extended)
    }

    const submit = () => {
        if(info!==props.event.info ||desc!==props.event.description){
            console.log(info)
            props.event.info=info
            props.event.description=desc;
            var credentials=btoa(props.username+":"+props.password)
            axios.put(configuration.serverBaseURL+"/events/"+props.event.id,
               {"info": info, "description":desc},
                { headers: { 'Content-Type': 'application/json','Authorization': 'Basic ' + credentials }}).then((response) => {
    
                }).catch((error) => {
                })
            }
            click();}
    const handleInfoChange = event => {
        changeInfo(event.target.value)
    }

    const handleDescChange = event => {
        changeDesc(event.target.value)
    }

    const deleteClick = () => {
        props.event.active=0
         var credentials=btoa(props.username+":"+props.password)
            axios.put(configuration.serverBaseURL+"/events/deactivate/"+props.event.id,"body",
                { headers: { 'Content-Type': 'application/json','Authorization': 'Basic ' + credentials }}).then((response) => {
    
                }).catch((error) => {
                })
            click();
        changeDel(true)
    }

    useEffect(() => {
        console.log(props.event)

    }, [])

    return (
        props.event && extended===false?
                <div className="event" id="eventDiv">
                    <p className="p_eventInfo">
                        <p className="red-text">
                       {props.event.title+" - "+props.event.type}<br/>
                    {props.event.date+" - "}{props.event.active>0?"Aktivan":"Neaktivan"}<br/>
                    {props.event.eventCreator.service+" - "+props.event.eventCreator.firstName+" "+props.event.eventCreator.lastName}
                       </p>
                    {props.event.info}<br/>
                    {props.event.description}<br/>
                    </p>
                    {props.event.eventCreator.id===parseInt(props.id) && props.event.active===1?
                    <button className="changeInfo" onClick={click}><img src={settingsImg} className="settingsImg" /></button>:
                    <p></p>}
                </div>
                :
                    <div className="event">
                        <div className="helper">
                            <textArea className="p_extendedEventInfo" onCahnge={handleDescChange}>{props.event.description} </textArea>
                            <textarea className="editableInfo" onChange={handleInfoChange}>{props.event.info}</textarea>
                        </div>
                        <button className="deleteBtn" onClick={deleteClick}><img src={declineImg} className="settingsImg" /></button>
                        <button className="changeInfo" onClick={submit}><img src={settingsImg} className="settingsImg" /></button>
                    </div>
        )

}

export default Event;
