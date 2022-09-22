import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configuration from './configuration.json'
import './styles/CitizenApp.css';

function History(username,password,id){

    const [reports, changeReports] = useState(null)
    useEffect(() => {
        if(id!==-1){
            var credentials=btoa(username+":"+password)
        axios.get(configuration.serverBaseURL+"/reports/creator/"+id,
            { headers: { 'Content-Type': 'application/json', 'Authorization':'Basic '+credentials } }).then((response) => {
                console.log(response.data)
                changeReports(response.data)
            }).catch((error) => {
                
            })}
    },[id])

    return (
       reports===null?
       <div className="infoMessage">
        Pregled istorije prijava je omogucen samo registrovanim korisnicima!
       </div>
       :<div className="reportsInfoPanel">
            {reports.map(report => (<div className="reportInfo" key={report.id}>
                <p id="red-text">
                {report.type+" - "+report.date}<br />
                {report.recipient+" - "+report.state}
                </p>
                Naslov: {report.title} <br />
                Sadrzaj: {report.content}<br />
                Napomena: {report.note}

            </div>))}
        </div>
    );
}

export default History;