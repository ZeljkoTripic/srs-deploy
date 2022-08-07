import React from 'react';
import './styles/FieldWorkerApp.css';
import { useState } from 'react';


function Assignment(info, username) {

    const [state, changeState] = useState("minimal");
    let newInfo ;
    const [report,changeReport]=useState("");

    const details = () => {
        if (state === "minimal")
            changeState("maximal");
        else if (state === "maximal")
            changeState("minimal")
    }
    const handleInfoChange = event => {
        newInfo = event.target.value;
    }
    const handleReportChange = event => {
        changeReport(event.target.value);
    }
    const send = () => {

        //logika za slanje izvjestaja

        console.log(newInfo + " " + username + " " + info + "" + report)
        changeState("done")
    }
    const update = () => {

        //logika za salnje novih info

    }
    return (
        state === "minimal" ?
            (<div className='assignment'>
                <p className='info'>{info}</p>
                <button className="infoButton" onClick={details}><img className="buttonImg" src="assignment.png" alt="info"></img></button>
            </div>) :
            (state === "maximal" ?
                (<div className='assignmentExpanded'>
                    <p className='info'>{info}</p>
                    <button className="infoButtonExpanded" onClick={details}><img className="buttonImgExpanded" src="assignment.png" alt="info"></img></button>
                    <label className='info1'>Informacije o napretku</label>
                    <textarea className='txtArea1' onChange={handleInfoChange}> </textarea>
                    <button className='btn1' onClick={update}>Azuriraj</button>
                    <label className='info2'>Izvještaj</label>
                    <textarea className='txtArea2' onChange={handleReportChange}> </textarea>
                    <button className='btn2' onClick={send}>Posalji</button>
                </div>) :
                (<div className='assignment'>
                    <p className='info'>{info+" "+report}</p>
                </div>)
            )
    )
}

export default Assignment;
