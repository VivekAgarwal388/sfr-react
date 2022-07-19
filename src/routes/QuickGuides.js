import React from 'react';
import Navbar from '../components/Navbar.js'
import { Col, Row, Container } from 'react-bootstrap'


const QuickGuides = () => {
    return (
        <div>
            <Navbar />
            <Container fluid>
                <Row>
                    <Col>
                        <iframe src="http://cics.umd.edu/~jdong/sfr/misc/QuickGuide_SFR_2021.pdf" height="800" width="700" title="SFR"></iframe>
                    </Col>
                    <Col >
                        <iframe src="http://cics.umd.edu/~jdong/sfr/misc/QuickGuide_mSFR_2021.pdf" height="800" width="700" title="mSFR"></iframe>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default QuickGuides;