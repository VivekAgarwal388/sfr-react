import { Col, Row, Nav, Container, NavDropdown } from 'react-bootstrap'
import '../App.css';
import { useSearchParams } from 'react-router-dom'
import React from 'react';
import j1_sat from '../logos/j1_sat.jpg'
import cisessLogo from '../logos/cisess_logo.png'
import starLogo from '../logos/star_logo.png'

const MyNavbar = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleParams = (eventKey) => {
        if (eventKey) {
            setSearchParams({ page: eventKey })
        }
    }

    const getTopText = () => {
        switch (searchParams.get('page')) {
            case 'Home':
                return "NESDIS Snowfall Rate";
            case 'SFR-CONUS':
                return "NESDIS Snowfall Rate (SFR)";
            case 'SFR-Alaska':
                return "NESDIS Snowfall Rate (SFR)";
            case 'mSFR-CONUS':
                return "Radar-Satellite Merged Snowfall Rate";
            case 'Animations':
                return "Animations"
            case 'Publication':
                return "Publication";
            case 'Team':
                return "Team";
            default:
                return "NESDIS Snowfall Rate (SFR)";
        }
    }

    return (
        <div style={{ backgroundColor: "darkblue" }}>
            <Container fluid >
                <Row className="align-items-center">
                    <Col md="auto">
                        <img src={j1_sat} alt="J1 Satellite" className='headerImage1' />
                    </Col>
                    <Col >
                        <Row className="nav-text" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '120px',
                        }}>
                            {getTopText()}
                        </Row>
                        <Row>
                            <Nav justify color='white' onSelect={handleParams} activeKey={null}>
                                <Nav.Link eventKey="Home">Home</Nav.Link>
                                <NavDropdown title="Product" id="basic-nav-dropdown">
                                    <NavDropdown.Item eventKey="SFR-CONUS">SFR-CONUS</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="SFR-Alaska">SFR-Alaska</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="mSFR-CONUS">mSFR-CONUS</NavDropdown.Item>
                                    <NavDropdown.Item href="http://cics.umd.edu/sfr/sfr_v0" eventKey=""
                                        target="_blank" rel="noreferrer noopener">Previous SFR Page</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Document" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="http://cics.umd.edu/~jdong/sfr/misc/QuickGuide_SFR_2021.pdf" eventKey=""
                                        target="_blank" rel="noreferrer noopener">SFR Quick Guide</NavDropdown.Item>
                                    <NavDropdown.Item href="http://cics.umd.edu/~jdong/sfr/misc/QuickGuide_mSFR_2021.pdf" eventKey=""
                                        target="_blank" rel="noreferrer noopener">mSFR Quick Guide</NavDropdown.Item>
                                    <NavDropdown.Item href="http://cics.umd.edu/~vivekag/documents/ATBD_SFR_v2.0.pdf" eventKey=""
                                        target="_blank" rel="noreferrer noopener">ATBD</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="Animations">Animations</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link eventKey="Publication">Publication</Nav.Link>
                                <NavDropdown title="About" id="basic-nav-dropdown">
                                    <NavDropdown.Item eventKey="Team">Team</NavDropdown.Item>
                                    <NavDropdown.Item href="https://www.star.nesdis.noaa.gov/star/index.php" eventKey=""
                                        target="_blank" rel="noreferrer noopener">NESDIS STAR</NavDropdown.Item>
                                    <NavDropdown.Item href="https://cisess.umd.edu" eventKey=""
                                        target="_blank" rel="noreferrer noopener">CISESS</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Row>
                    </Col>
                    <Col md="auto">
                        <a href="https://www.star.nesdis.noaa.gov/star/index.php" target="_blank" rel="noreferrer noopener">
                            <img src={starLogo} alt="STAR logo" className="headerImage" />
                        </a>
                    </Col>
                    <Col md="auto">
                        <a href="https://cisess.umd.edu" target="_blank" rel="noreferrer noopener">
                            <img src={cisessLogo} alt="CISESS logo" className="headerImage" />
                        </a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default MyNavbar;



