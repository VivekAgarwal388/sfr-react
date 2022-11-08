import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar.js'


const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div>
            <Navbar />
            <div style={{ paddingLeft: '40px', paddingRight: '40px', fontSize: "16px", paddingTop: "20px" }}>
                <p>
                    The NOAA NESDIS (see the Acronym List below) snowfall rate (SFR) product is retrieved from passive
                    microwave measurements taken by sensors onboard a constellation of polar-orbiting satellites operated
                    by NOAA, NASA, EUMETSAT, and DoD. Microwave can penetrate clouds and sense in-cloud
                    hydrometeors, hence it is suitable for precipitation retrieval. The SFR product is derived from two
                    algorithms: a machine learning snowfall detection model and a 1DVAR-based snowfall rate estimation
                    algorithm.
                </p>
                <p>
                    The SFR product first went into operation in 2012. Currently, NESDIS produces the product operationally
                    from ATMS and AMSU-A/MHS onboard 5 satellites: NOAA-20, S-NPP, NOAA-19, Metop-C, and Metop-B.
                    In addition, CISESS at the University of Maryland produces SFR for the above satellites using direct
                    broadcast (DB) data obtained from the University of Wisconsin. The DB-based SFR has a low latency that
                    enables product applications for nowcasting and short-term weather forecasting. CISESS also derives
                    experimental SFR from GMI and SSMIS onboard GPM and DMSP-F16, -F17, and F18, respectively.
                </p>
                <p>
                    Besides SFR, CISESS also produces a radar-satellite merged snowfall rate product, mSFR. It combines
                    the NESDIS SFR product with the NSSL MRMS instantaneous radar snowfall rate estimates. This is a
                    spatiotemporally more advanced product that benefits from satellite's broad spatial coverage and
                    radar's frequent observations.
                </p>
                <b>The products shown on this website are produced from the CISESS DB-based processing system.</b>
                <Container fluid>
                    <Row >
                        <Col style={{ paddingLeft: "0px" }} md="auto">
                            <ul style={{ textDecoration: "underline", textDecorationColor: "blue", color: "blue", cursor: "pointer" }}>
                                <li onClick={() => setSearchParams({ page: "SFR-CONUS" })}>Direct Broadcast SFR - CONUS (Starting on 12/18/2019)</li>
                                <li onClick={() => setSearchParams({ page: "SFR-Alaska" })}>Direct Broadcast SFR - Alaska</li>
                                <li onClick={() => setSearchParams({ page: "mSFR-CONUS" })}>mSFR - CONUS</li>
                                <li><a style={{ color: "blue" }}
                                    href="http://cics.umd.edu/sfr/sfr_v0"
                                    target="_blank" rel="noreferrer noopener">Previous SFR Page</a></li>
                            </ul>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>

                <b>Acronym List</b><br></br>
                <p>AMSU-A - Advanced Microwave Sounding Unit-A<br />
                    ATMS - Advanced Technology Microwave Sounder<br />
                    CISESS - Cooperative Institute for Satellite Earth System Studies<br />
                    GMI - GPM Microwave Imager<br />
                    MHS - Microwave Humidity Sounder<br />
                    MRMS - Multi-Radar/Multi-Sensor System<br />
                    NESDIS - National Environmental Satellite, Data, and Information Service<br />
                    NSSL - National Severe Storms Laboratory<br />
                    SSMI/S - Special Sensor Microwave Imager / Sounder</p>
            </div>
        </div>
    );
}
export default Home;