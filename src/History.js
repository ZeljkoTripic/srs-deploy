import React from 'react';
import './styles/CitizenApp.css';

function History(username){

    //logika za dobavljanje podataka
    
    const reports=["report1", "report2", "report3","report4"];

    return (
        <div className="reportsInfoPanel">
            {reports.map(report => (<div className="reportInfo">
                {report}
            </div>))}
        </div>
    );
}

export default History;