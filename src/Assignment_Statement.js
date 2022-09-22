import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configuration from './configuration.json'
import acceptImg from './accept.png'
import declineImg from './decline.png'
import infoImg from './info.png'

function Assignment_Statement(props) {

    const [extended, changeExtended] = useState(false);
    const [state, changeState] = useState(false);
    const [credentials, changeCredentials] = useState(null);
    const [data, changeData] = useState(null);
    const [id, changeId] = useState(-1)

    useEffect(() => {
        changeData(props.data)
        changeId(props.id)
        changeCredentials(props.credentials)
    })


    const accept = () => {
        data.assignment.done = 1
        var credentials1 = btoa(credentials.username + ":" + credentials.password)
        axios.put(configuration.serverBaseURL + "/assignments/done/" + data.assignment.id,
            1,
            { headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + credentials1 } }).then((response) => {

            }).catch((error) => {
            })
        changeState(!state);
    }
    const decline = () => {
        data.assignment.done = -1
        var credentials1 = btoa(credentials.username + ":" + credentials.password)
        axios.put(configuration.serverBaseURL + "/assignments/done/" + data.assignment.id,
            -1,
            { headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + credentials1 } }).then((response) => {

            }).catch((error) => {
            })
        changeState(!state);
        changeState(!state);
    }
    const infoClick = () => {
        changeExtended(!extended)
    }

    return (
        (data && id !== -1) && (
            extended == false ?
                <div className="statementDiv">
                    <div className="statementInfo">
                        <p className="red-txt">{"#" + data.assignment.id + " " + data.assignment.title + " - " + data.assignment.date}<br /></p>
                        {"Nalogodavac: " + data.assignment.creator.firstName + " " + data.assignment.creator.lastName}<br />
                        {"Angažovana služba: " + data.assignment.executor.service}
                        <p className="red-txt">
                            {data.assignment.done === 1 ? "Uspješno realizovan!" : (data.assignment.done === 0 ? ("Realizacija u toku!") : ("Neuspješno realizovan!"))}
                        </p>
                    </div>
                    <div className="ass-content">
                        {"Opis: " + data.assignment.description}
                    </div>
                    <button className="statementBtn" id="infoBtn" onClick={infoClick}><img src={infoImg} className="infoImg"></img></button>
                </div>
                :
                <div className="statementDiv">
                    <div className="statementInfo">
                        Povratne informacije:<br />
                        {data.assignment.feedback}
                    </div>
                    {<div className="ass-content">{data.statement !== null ? data.statement.content : "Izvještaj još nije stigao!"}</div>}
                    {
                        data.assignment.done === 0 && data.assignment.creator.id === parseInt(id) ?
                        <>
                                <button className="statementBtn" onClick={accept}><img src={acceptImg} className="acceptImg"></img></button>
                                <button className="statementBtn" onClick={decline}><img src={declineImg} className="declineImg"></img></button>
                            </>
                            :
                            <div></div>
                        }
                        <button className="statementBtn" id="infoBtn" onClick={infoClick}><img src={infoImg} className="infoImg"></img></button>
                </div>)

    )
}

export default Assignment_Statement;