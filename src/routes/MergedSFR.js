import React from 'react';
import { Col, Row, Container } from 'react-bootstrap'
import { useState } from 'react';
import Navbar from '../components/Navbar.js'
import NavRightMsfr from '../components/NavRightMsfr.js'
import MapComponentMsfr from '../components/MapComponentMsfr';

const MergedSFR = () => {
    const date = new Date();
    const UTCStartDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    const UTCEndDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours());
    const [dates, setDates] = useState([UTCStartDate, UTCEndDate]);

    const getParams = (params) => {
        setDates(params.dates)
    }

    return (
        <div className="App">
            <Navbar />
            <Container fluid>
                <Row style={{ minWidth: '1000px' }}>
                    <Col style={{ backgroundColor: "rgb(218, 227, 243)", paddingTop: "20px" }}>
                        <NavRightMsfr getParams={getParams} />
                    </Col>
                    <Col md="auto" style={{ padding: "0px" }}>
                        <MapComponentMsfr dates={dates} />
                    </Col>
                </Row>

            </Container >
        </div >
    );
}
export default MergedSFR;