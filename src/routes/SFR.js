import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Col, Row, Container } from 'react-bootstrap'
import { useState } from 'react';
import Navbar from '../components/Navbar.js'
import NavRight from '../components/NavRight.js'
import MapComponent from '../components/MapComponent';

const SFR = (area) => {
    const currDate = new Date();
    const UTCdate = new Date(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate());
    const [dates, setDates] = useState([UTCdate, UTCdate]);
    const [satellites, setSatellites] = useState(
        new Array(9).fill(true)
    );

    const getParams = (params) => {
        setDates(params.dates)
        setSatellites(params.satellites)
    }

    return (
        <div className="App">
            <Navbar />
            <Container fluid>
                <Row style={{ minWidth: '1000px' }}>
                    <Col style={{ backgroundColor: "rgb(218, 227, 243)", paddingTop: "20px" }}>
                        <NavRight getParams={getParams} />
                    </Col>
                    <Col md="auto" style={{ padding: "0px" }}>
                        <MapComponent dates={dates} satellites={satellites} area={area.area} />
                    </Col>
                </Row>
            </Container >
        </div >
    );
}

export default SFR;
