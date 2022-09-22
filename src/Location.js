import React, { useState, useEffect } from 'react';
import './styles/FieldWorkerApp.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import CityMapLocation from './CityMapLocation';



function Location() {

    const temp = useLocation();
    const navigate = useNavigate();
    const [x,changeX]=useState(1.0);
    const [y,changeY]=useState(1.0)

    useEffect(() => {
        if (temp.state !== null) {
            changeX(temp.state.x);
            changeY(temp.state.y);
        }
    }, [])


    return (
        <div className="mainArea">
            <div id="contentArea" className="contentArea1">
                {CityMapLocation(x, y)}
            </div>
        </div>
    );


}
export default Location;
