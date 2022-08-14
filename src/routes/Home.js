import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Col, Row, Container } from 'react-bootstrap'
import { useState } from 'react';
import Navbar from '../components/Navbar.js'
import NavRight from '../components/NavRight.js'
import MapComponent from '../components/MapComponent';

const Home = () => {
    const currDate = new Date();
    const UTCdate = new Date(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate());
    const [dates, setDates] = useState([UTCdate, UTCdate]);
    const [satellites, setSatellites] = useState(
        new Array(9).fill(true)
    );
    const [area, setArea] = useState(0);

    const getParams = (params) => {
        setDates(params.dates)
        setSatellites(params.satellites)
        setArea(params.area)
    }

    return (
        <div className="App">
            <Navbar />
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <NavRight getParams={getParams} />
                    </Col>
                    <Col>
                        <MapComponent dates={dates} satellites={satellites} area={area} />
                    </Col>
                </Row>
            </Container >
        </div >
    );
}

export default Home;
