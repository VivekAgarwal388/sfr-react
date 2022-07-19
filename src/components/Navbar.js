import { Col, Row, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import React from 'react';

const MyNavbar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleSelect = (eventKey) => setSearchParams({ page: eventKey });

    return (
        <div>
            <Container fluid className='mb-4' >
                <Row className="align-items-center">
                    <Col md="auto">
                        <img src='http://cics.umd.edu/~vivekag/build/images/noaabanner.png' alt="NOAA logo" className="headerImage" />
                    </Col>
                    <Col >
                        <Nav justify variant="tabs" onSelect={handleSelect}>
                            <Nav.Link eventKey="home">Home</Nav.Link>
                            <NavDropdown title="Product" id="basic-nav-dropdown">
                                <NavDropdown.Item eventKey="merged_sfr">Merged SFR</NavDropdown.Item>
                                <NavDropdown.Item eventKey="home">CONUS SFR</NavDropdown.Item>
                                <NavDropdown.Item eventKey="alaska_sfr">Alaska SFR</NavDropdown.Item>
                                <NavDropdown.Item eventKey="global_sfr">Global SFR</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Data" id="basic-nav-dropdown">
                                <NavDropdown.Item href="http://cics.umd.edu/~jdong/sfr/data/CONUS/">CONUS SFR</NavDropdown.Item>
                                <NavDropdown.Item href="http://cics.umd.edu/~jdong/sfr/data/ALASKA/">Alaska SFR</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/4.1">Snowfall Detection</NavDropdown.Item>
                                <NavDropdown.Item href="#action/4.2">Snowfall Rate</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Documents" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/5.1">ATBD</NavDropdown.Item>
                                <NavDropdown.Item eventKey="quick_guides">Quick Guides</NavDropdown.Item>
                                <NavDropdown.Item href="#action/5.3">Case Studies</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item>
                                <Nav.Link href="/publications">Publications</Nav.Link>
                            </Nav.Item>
                            <NavDropdown title="About" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/7.1">Team</NavDropdown.Item>
                                <NavDropdown.Item href="#action/7.2">Contact</NavDropdown.Item>
                                <NavDropdown.Item href="#action/7.3">CICESS</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Col>
                    <Col md="auto">
                        <img src='http://cics.umd.edu/~vivekag/build/images/CISESS-logo.png' alt="CISESS logo" className="headerImage" />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default MyNavbar;