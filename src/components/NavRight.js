import React, { useState, useEffect } from 'react';
import { Row, Form } from 'react-bootstrap'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css'

const NavRight = ({ getParams }) => {
    const date = new Date();
    const UTCdate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    const [selectedDates, setSelectedDates] = useState([UTCdate, UTCdate]);
    const [satellites, setSatellites] = useState(
        new Array(9).fill(true)
    );
    const [area, setArea] = useState(0);


    const handleOnChange = (position) => {
        var satellitesCopy = [...satellites];
        satellitesCopy[position] = !satellites[position]
        setSatellites(satellitesCopy)
    }

    useEffect(() => {
        getParams({ dates: selectedDates, satellites: satellites, area: area })
    }, [selectedDates, satellites, area, getParams])

    return (
        <div>

            <h3>Select Date Range</h3>
            <div className="date-picker">
                <Row>
                    <Calendar
                        onChange={(dates) => setSelectedDates(dates)}
                        selectRange={true}
                        minDetail={"year"}
                        minDate={new Date('January 1, 2018')}
                        maxDate={UTCdate}
                    />
                </Row>
            </div>
            <Row className='ml-3'>
                <h3>Satellites</h3>
            </Row>
            <Row>
                <Form>
                    <div key={`inline-checkbox`} className="mb-3">
                        <Form.Check
                            inline
                            label="S-NPP"
                            type={'checkbox'}
                            defaultChecked="checked"
                            onChange={() => handleOnChange(0)}
                        />
                        <Form.Check
                            inline
                            label="NOAA-20"
                            type={'checkbox'}
                            defaultChecked="checked"
                            onChange={() => handleOnChange(1)}
                        />
                    </div>
                </Form>
                <Form>
                    <div key={`inline-checkbox`} className="mb-3">
                        <Form.Check
                            inline
                            label="NOAA-19"
                            type={'checkbox'}
                            defaultChecked="checked"
                            onChange={() => handleOnChange(2)}
                        />
                        <Form.Check
                            inline
                            label="Metop-B"
                            type={'checkbox'}
                            defaultChecked="checked"
                            onChange={() => handleOnChange(3)}
                        />
                        <Form.Check
                            inline
                            label="Metop-C"
                            type={'checkbox'}
                            defaultChecked="checked"
                            onChange={() => handleOnChange(4)}
                        />
                    </div>
                </Form>
                <Form>
                    <div key={`inline-checkbox`} className="mb-3">
                        <Form.Check
                            inline
                            label="GPM"
                            type={'checkbox'}
                            defaultChecked="checked"
                            onChange={() => handleOnChange(5)}
                        />
                        <Form.Check
                            inline
                            label="F16"
                            type={'checkbox'}
                            defaultChecked="checked"
                            onChange={() => handleOnChange(6)}
                        />
                        <Form.Check
                            inline
                            label="F17"
                            type={'checkbox'}
                            defaultChecked="checked"
                            onChange={() => handleOnChange(7)}
                        />
                        <Form.Check
                            inline
                            label="F18"
                            type={'checkbox'}
                            defaultChecked="checked"
                            onChange={() => handleOnChange(8)}
                        />
                    </div>
                </Form>
            </Row>
            <Row className='ml-3'>
                <h3>Region</h3>
            </Row>
            <Row>
                <Form>
                    <Form.Group>
                        <Form.Check
                            inline
                            label='CONUS'
                            type='radio'
                            onChange={() => setArea(0)}
                            checked={area === 0}
                        />
                        <Form.Check
                            inline
                            label="Alaska"
                            type='radio'
                            onChange={() => setArea(1)}
                            checked={area === 1}
                        />
                        <Form.Check
                            inline
                            label="Global"
                            type='radio'
                            onChange={() => setArea(2)}
                            checked={area === 2}
                        />
                    </Form.Group>
                </Form>
            </Row>
        </div>
    );
}

export default NavRight;
