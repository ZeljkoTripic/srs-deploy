import React, { useState, useMemo, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Polygon } from 'react-leaflet'
import configuration from './configuration.json'
import './styles/CitizenApp.css';

function NewReport(username, password, id) {

    const [title, changeTitle] = useState("");
    const [content, changeContent] = useState("");
    const [note, changeNote] = useState("");
    const [type, changeType] = useState("");
    const [message, changeMessage] = useState("");
    const [position, setPosition] = useState([44.78798121640895, 17.201115245677336])

    const submit = () => {
        if (44.78798121640895 === position[0] && 17.201115245677336 === position[1])
            changeMessage("Odaberite lokaciju na mapi!")
        else if ((title === "" && content === "") || type === "")
            changeMessage("Morate odabrati tip prijave i unijeti naslov ili sadržaj!")
        else {
            axios.post(configuration.serverBaseURL+"/reports",
                {
                    "type": type,
                    "content": content,
                    "note": note,
                    "title": title,
                    "creator": id,
                    "x": position[0],
                    "y": position[1]
                }
                ,
                { headers: { 'Content-Type': 'application/json' } }).then((response) => {
                    changeMessage("Poslato!")

                }).catch((error) => {
                    changeMessage("Problem sa serverom!")
                })
        }

    }

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setPosition([position.coords.latitude, position.coords.longitude])
        },function(error){
            alert(error.message);
       })
    };

    const handleTitleChanged = event => {
        changeTitle(event.target.value);
    }
    const handleContentChanged = event => {
        changeContent(event.target.value);
    }
    const handleNoteChanged = event => {
        changeNote(event.target.value);
    }
    const handleTypeChanged = event => {
        changeType(event.target.value);
    }

    const polygon = [
        [44.8726118, 17.2588105],
        [44.8689621, 17.2461076],
        [44.8621487, 17.2385545],
        [44.8606886, 17.2323747],
        [44.8541176, 17.2303148],
        [44.8511969, 17.2200151],
        [44.8463288, 17.2158952],
        [44.8448683,
            17.210402],
        [44.8397562, 17.2100587],
        [44.8380521,
            17.200789], [44.832209,
            17.1966691], [44.8307481, 17.1846528],
        [44.8149196, 17.1908326],
        [44.8119969, 17.1801896],
        [44.8078562, 17.1867128],
        [44.7981123, 17.1846528],
        [44.7983559,
            17.16783], [44.8059076, 17.1654268],
        [44.8039589, 17.1592469],
        [44.7990867, 17.1568437],
        [44.7942142,
            17.16886], [44.7883667, 17.1637101],
        [44.7932397, 17.1537538],
        [44.7676518, 17.1609636],
        [44.7620453, 17.1578737],
        [44.7608264, 17.1637101],
        [44.7557069, 17.1637101],
        [44.7544879, 17.1568437],
        [44.7493678, 17.1527238],
        [44.744491,
            17.1489473], [44.7271754, 17.1530671],
        [44.7266875, 17.1619935],
        [44.7318097, 17.1623369],
        [44.7435156, 17.1551271],
        [44.7481486, 17.1623369],
        [44.7464418, 17.1788163],
        [44.750343,
            17.1829362], [44.7483924, 17.1894594],
        [44.7547317, 17.1966691],
        [44.7505869, 17.2313447],
        [44.7454664, 17.2392411],
        [44.751806,
            17.255034], [44.750343,
            17.2673936], [44.7376629, 17.2800966],
        [44.7415648, 17.2821565],
        [44.747661,
            17.2739167], [44.7547317,
            17.265677], [44.7544879, 17.2567506],
        [44.7591199,
            17.256064], [44.7700892, 17.2471376],
        [44.7752075, 17.2344346],
        [44.7795942,
            17.233748], [44.7769135, 17.2402711],
        [44.7815438, 17.2481675],
        [44.7771572,
            17.254004], [44.785199,
            17.2526307], [44.7886103, 17.2423311],
        [44.7932397, 17.2416444],
        [44.7939706, 17.2344346],
        [44.7961633, 17.2282548],
        [44.8010356, 17.2310014],
        [44.8078562, 17.2241349],
        [44.8127276, 17.2227617],
        [44.8212515, 17.2241349],
        [44.8256347, 17.223105],
        [44.8353741, 17.2244783],
        [44.8446249, 17.2399278],
        [44.8487629, 17.2461076],
        [44.8643388, 17.2529741],
        [44.8679888, 17.2598405],
        [44.8726118, 17.2588105],
    ]
    const limeOptions = { color: 'lime' }

    

    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    const pos = marker.getLatLng()
                    setPosition([pos.lat, pos.lng])
                    console.log(position)
                }
            },
        }),

    )

    return (
        <div className="reportArea">
            <div className="report">
                <div id="template">Obrazac za podnošenje prijave</div>
                <div id="test">
                    <label className="desc">Tip prijave</label>
                    <br />
                    {(username === "guest" || username === "") ?
                        <select name="report_type" id="type" className="combo1" onChange={handleTypeChanged}>
                            <option value="POZAR">POŽAR</option>
                            <option value="POPLAVA">POPLAVA</option>
                            <option value="SAOBRACAJNA NEZGODA">SAOBRAĆAJNA NEZGODA</option>
                            <option value="NASILJE">NASILJE</option>
                            <option value="MITO I KORUPCIJA">MITO I KORUPCIJA</option>
                            <option value="HITNA MEDICINSKA SITUACIJA">HITNA MEDICINSKA SITUACIJA</option>
                            <option value="MIGRANTI">MIGRANTI</option>
                            <option value="JAVNI RED I MIR">JAVNI RED I MIR</option>
                        </select>
                        :
                        <select name="report_type" id="type" className="combo1" onChange={handleTypeChanged}>
                            <option value="POZAR">POŽAR</option>
                            <option value="POPLAVA">POPLAVA</option>
                            <option value="SAOBRACAJNA NEZGODA">SAOBRAćAJNA NEZGODA</option>
                            <option value="NASILJE">NASILJE</option>
                            <option value="MITO I KORUPCIJA">MITO I KORUPCIJA</option>
                            <option value="HITNA MEDICINSKA SITUACIJA">HITNA MEDICINSKA SITUACIJA</option>
                            <option value="MIGRANTI">MIGRANTI</option>
                            <option value="JAVNI RED I MIR">JAVNI RED I MIR</option>
                            <option value="KANALIZACIJA">KANALIZACIJA</option>
                            <option value="RASVJETA">RASVJETA</option>
                            <option value="STRUJA">STRUJA</option>
                            <option value="PRIVREDA">PRIVREDNICI</option>
                            <option value="VODOVOD">VODOVOD</option>
                            <option value="ASFALT">ASFALT</option>
                            <option value="NEPROHODAN PUT">NEPROHODAN PUT</option>
                            <option value="OSTECEN PUT">OSTEćEN PUT</option>
                            <option value="GRIJANJE">GRIJANJE</option>
                            <option value="SMECE">SMEĆE</option>
                            <option value="KANALIZACIJA">KANALIZACIJA</option>
                            <option value="SAOBRACAJNA SIGNALIZACIJA">SAOBRAćAJNA SIGNALIZACIJA</option>
                            <option value="PARKIRANJE">PARKIRANJE</option>
                        </select>
                    }
                </div>
                <div>
                    <label className="desc">Naslov</label>
                    <br />
                    <input type="text" id="title" className="reportTitle" onChange={handleTitleChanged}></input>
                </div>
                <div>
                    <label className="desc">Sadržaj</label>
                    <br />
                    <textarea id="content" className="text-area" onChange={handleContentChanged}></textarea>
                </div>
                <div>
                    <label className="desc">Napomena</label>
                    <br />
                    <textarea id="note" className="text-area" onChange={handleNoteChanged}></textarea>
                </div>

                <div className="mapAreaPick2">
                    <MapContainer center={[44.78798121640895, 17.201115245677336]} zoom={12} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://api.maptiler.com/maps/topographique/{z}/{x}/{y}.png?key=FyCQP140ucb9UHWRdtFB"
                        />
                        <Polygon pathOptions={limeOptions} positions={polygon}></Polygon>
                        <Marker
                            draggable={true}
                            eventHandlers={eventHandlers}
                            position={position}
                            ref={markerRef}>
                        </Marker>
                    </MapContainer>
                </div>
                <p className="infoMessage1">{message}</p>
                <div>
                    <button className="submit" onClick={getLocation}>Koristi lokaciju uređaja</button>
                </div>
                <div>
                    <button className="submit" onClick={submit}>Podnesi prijavu</button>
                </div>
            </div>
        </div>
    );
}
export default NewReport;