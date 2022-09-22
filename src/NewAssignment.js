import React, { useState, useMemo, useRef, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Polygon } from 'react-leaflet'
import { useLocation, useNavigate } from 'react-router-dom';
import configuration from './configuration.json'
import eventImg from './event.png'
import historyImg from './history.png'
import assignmentImg from './assignment2.png'
import logoutImg from './logout.png'
import mapImg from './map.png'
import './styles/CityOfficialApp.css';
import Assignment from './Assignment';
import Assignment_Statement from './Assignment_Statement';

function NewAssignment() {

    const temp = useLocation();
    const [username, changeUsername] = useState("guest")
    const [password, changePassword] = useState("guest")
    const [id, changeId] = useState(-1)
    const [report, changeReport] = useState(null)
    const [list, changeList] = useState(false)
    const [data, changeData] = useState(null)
    const [services, changeServices] = useState(null)
    const [title, changeTitle] = useState("");
    const [content, changeContent] = useState("");
    const [executor, changeExecutor] = useState(0);
    const [message, changeMessage] = useState("");
    const [extended, changeExtended] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (temp.state !== null) {
            changeUsername(temp.state.username);
            changePassword(temp.state.password);
            changeId(temp.state.id)
            changeReport(temp.state.report)
            console.log(temp.state.report)
            changeList(temp.state.list)
        }
    }, [])

    useEffect(() => {
        var credentials = btoa(username + ":" + password)
        if (id !== -1 && list) {
            axios.get(configuration.serverBaseURL + "/assignments/reason/" + report.id,

                { headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + credentials } }).then((response) => {
                    changeData(response.data)
                }).catch((error) => {
                })
        }
        if(id!==-1){
        axios.get(configuration.serverBaseURL + "/fieldServices",

            { headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + credentials } }).then((response) => {
                changeServices(response.data)
                changeExecutor(response.data[0].id)
                console.log(response.data)
            }).catch((error) => {

            })}
    }, [id])

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

    const [position, setPosition] = useState([44.78798121640895, 17.201115245677336])

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
    const infoClick = () => {
        changeExtended(!extended)
    }
    const logout = () => {
        changeUsername("guest")
        changePassword("quest");
        changeId(-1)
        navigate("/SmartReportSystem")
    }

    function map_click() {
        console.log(username)
        navigate('/SmartReportSystem/cityOfficialApp/cityMap', { state: { username: username, password: password, id: id } })
    }
    function reports_click() {
        navigate('/SmartReportSystem/cityOfficialApp/arrivedReports', { state: { username: username, password: password, id: id } })
    }
    function arrived_click() {
        navigate('/SmartReportSystem/cityOfficialApp/arrivedStatements', { state: { username: username, password: password, id: id } })
    }
    function events_click() {
        navigate('/SmartReportSystem/cityOfficialApp/events', { state: { username: username, password: password, id: id } })
    }


    const contentChange = event => {
        changeContent(event.target.value)
    }
    const titleChange = event => {
        changeTitle(event.target.value);
    }
    const executorChange = event => {
        changeExecutor(event.target.value);
    }
    const assign = () => {
        console.log(content+" "+title+" "+executor+" "+position)
        if (content === "" || title === "" || executor === "" || position === [44.78798121640895, 17.201115245677336])
            changeMessage("Popunite sva polja, odaberite lokaciju i izvođača!")
        else {
            console.log(list)
            console.log(report)
            changeMessage("")
            var credentials = btoa(username + ":" + password)
            axios.post(configuration.serverBaseURL + "/assignments",
                {
                    "title": title,
                    "description": content,
                    "reportId": report === null ? -1 : report.id,
                    "creatorId": id,
                    "executorId": executor, //promijeniti
                    "x": list===true?report.x:position[0],
                    "y": list===true?report.y:position[1]
                }
                ,
                { headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + credentials } }).then((response) => {


                }).catch((error) => {

                })
        }
    }
    return (

        <div className="mainArea">
            <div className="menu1">
                <div className="buttonDiv">
                    <button className="menu_button" onClick={map_click}><img src={mapImg} alt="report" className="menu_button_img" /></button>
                    <div className="button_label">Mapa grada</div>
                </div>
                <div className="buttonDiv">
                    <button className="menu_button" onClick={reports_click}><img src={assignmentImg} alt="report" className="menu_button_img" /></button>
                    <div className="button_label">Pristigle prijave</div>
                </div>
                <div className="buttonDiv">
                    <button className="menu_button" onClick={arrived_click}><img src={historyImg} alt="report" className="menu_button_img" /></button>
                    <div className="button_label">Zadaci i izvještaji</div>
                </div>
                <div className="buttonDiv">
                    <button className="menu_button" onClick={events_click}><img src={eventImg} alt="report" className="menu_button_img" /></button>
                    <div className="button_label">Dešavanja</div>
                </div>
                <div className="buttonDiv">
                    <button className='menu_button' onClick={logout}><img className="menu_button_img" src={logoutImg} alt="logout"></img></button>
                    <div className="button_label">Kraj</div>
                </div>
            </div>
            <div id="contentArea" className="contentArea">
                <div className="header-info" >Zadavanje novog zadatka</div>
                <div className="assignmentDiv">
                    <textarea className="assignmentTitle" placeholder='Naslov zadatka' onChange={titleChange}></textarea>
                    <textarea className="assignmentContent" placeholder='Opis zadatka' onChange={contentChange}></textarea>
                    {(list===false) &&<div className="mapAreaPick">
                        <MapContainer center={[44.78798121640895, 17.201115245677336]} zoom={12} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
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
                    </div>}
                    {services && <select className="fieldService" onChange={executorChange}>
                        {services.map((s) => {
                            return <option value={s.id}>{s.service}</option>
                        })}
                    </select>}
                    <button className="assignAssignment" onClick={assign}>Zadaj</button>
                    <div id="err-msg">{message}</div>
                </div>
                <div className="reportsInfoPanel">
                    {data && list && data.map(assignment => {
                       return <div className="statementDiv" id="grey">
                           <div className="statementInfo">
                               <p className="red-txt">{"#" + assignment.id + " " + assignment.title + " - " + assignment.date}<br /></p>
                               {"Nalogodavac: " + assignment.creator.firstName + " " + assignment.creator.lastName}<br />
                               {"Angažovana služba: " + assignment.executor.service}
                               <p className="red-txt">
                                   {assignment.done === 1 ? "Uspješno realizovan!" : (assignment.done === 0 ? ("Realizacija u toku!") : ("Neuspješno realizovan!"))}
                               </p>
                           </div>
                           <div className="ass-content">
                            Opis: <br/>
                               {assignment.description}
                           </div>
                       </div>

                    })}
                </div>
            </div>
        </div>
    )
}

export default NewAssignment;