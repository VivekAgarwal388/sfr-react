import React, { useState, useEffect } from 'react';
import { Row, Form } from 'react-bootstrap'
import '../App.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NavRight = ({ getParams }) => {
    const date = new Date();
    const UTCdate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    const [selectedDates, setSelectedDates] = useState([UTCdate, UTCdate]);
    const [satellites, setSatellites] = useState(
        new Array(9).fill(true)
    );

    const handleOnChange = (position) => {
        var satellitesCopy = [...satellites];
        satellitesCopy[position] = !satellites[position]
        setSatellites(satellitesCopy)
    }

    useEffect(() => {
        getParams({ dates: selectedDates, satellites: satellites })
    }, [selectedDates, satellites, getParams])

    return (
        <div>
            <h5 style={{ textDecoration: "underline" }}>Display Instructions</h5>
            <ul>
                <li>Select product from the Product drop-down list on the top</li>
                <li>Select starting and ending dates below</li>
                <li>Use Box Selection (lower right corner) or the Google Maps zoom
                    and pan tools to select the area of interest; toggle the Box
                    Selection button to turn the function on and off</li>
                <li>Use the slider to adjust opacity</li>
                <li>Toggle the Loop button to start and stop looping</li>
            </ul>
            <hr style={{ color: "black" }} />
            <h5>Start Date</h5>
            <div className="date-picker" style={{ fontSize: "15px" }}>
                <Row>
                    <DatePicker
                        selected={selectedDates[0]}
                        onChange={(date) => setSelectedDates([date, date])}
                        selectsStart
                        startDate={selectedDates[0]}
                        maxDate={UTCdate}
                    />
                </Row>
            </div>
            <h5>End Date</h5>
            <div className="date-picker" style={{ fontSize: "15px" }}>
                <Row>
                    <DatePicker
                        selected={selectedDates[1]}
                        onChange={(date) => setSelectedDates([selectedDates[0], date])}
                        selectsEnd
                        startDate={selectedDates[0]}
                        endDate={selectedDates[1]}
                        minDate={selectedDates[0]}
                        maxDate={UTCdate}
                    />
                </Row>
            </div>

            {/*
            <Row className='ml-3'>
                <h5>Satellites</h5>
            </Row>
            <Row>
                <Form>
                    <div key={`inline-checkbox`} className="mb-3">
                        <Form.Check
                            inline
                            label="S-NPP"
                            type={'checkbox'}
                            defaultChecked="checked"
                            style={{ width: "90px", fontSize: "14px" }}
                            onChange={() => handleOnChange(0)}
                        />
                        <Form.Check
                            inline
                            label="NOAA-20"
                            type={'checkbox'}
                            defaultChecked="checked"
                            style={{ width: "90px", fontSize: "14px" }}
                            onChange={() => handleOnChange(1)}
                        />
                        <Form.Check
                            inline
                            label="NOAA-19"
                            type={'checkbox'}
                            defaultChecked="checked"
                            style={{ width: "90px", fontSize: "14px" }}
                            onChange={() => handleOnChange(2)}
                        />
                    </div>
                </Form>
            </Row>
            <Row>
                <Form>
                    <div key={`inline-checkbox`} className="mb-3">

                        <Form.Check
                            inline
                            label="Metop-B"
                            type={'checkbox'}
                            defaultChecked="checked"
                            style={{ width: "90px", fontSize: "14px" }}
                            onChange={() => handleOnChange(3)}
                        />
                        <Form.Check
                            inline
                            label="Metop-C"
                            type={'checkbox'}
                            defaultChecked="checked"
                            style={{ width: "90px", fontSize: "14px" }}
                            onChange={() => handleOnChange(4)}
                        />
                        <Form.Check
                            inline
                            label="GPM"
                            type={'checkbox'}
                            defaultChecked="checked"
                            style={{width: "90px", fontSize: "14px"}}
                            onChange={() => handleOnChange(5)}
                        />
                    </div>
                </Form>
                {
                <Form>
                    <div key={`inline-checkbox`} className="mb-3">
                        <Form.Check
                            inline
                            label="F16"
                            type={'checkbox'}
                            defaultChecked="checked"
                            onChange={() => handleOnChange(6)}
                            style={{width: "90px", fontSize: "14px"}}
                        />
                        <Form.Check
                            inline
                            label="F17"
                            type={'checkbox'}
                            defaultChecked="checked"
                            style={{width: "90px", fontSize: "14px"}}
                            onChange={() => handleOnChange(7)}
                        />
                        <Form.Check
                            inline
                            label="F18"
                            type={'checkbox'}
                            defaultChecked="checked"
                            style={{width: "90px", fontSize: "14px"}}
                            onChange={() => handleOnChange(8)}
                        />
                    </div>
                </Form>
            </Row>
            */}
        </div>
    );
}

export default NavRight;
