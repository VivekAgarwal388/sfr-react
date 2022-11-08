import { min } from 'moment';
import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NavRightMsfr = ({ getParams }) => {
    const date = new Date();
    const UTCStartDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    const UTCEndDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours());
    const [selectedDates, setSelectedDates] = useState([UTCStartDate, UTCEndDate]);

    useEffect(() => {
        if (selectedDates[1] < selectedDates[0]) {
            setSelectedDates([selectedDates[0], selectedDates[0]])
        }
        else {
            getParams({ dates: selectedDates })
        }
    }, [selectedDates, getParams])

    const getStartMaxTime = () => {
        if (UTCStartDate.getTime() === new Date(selectedDates[0].getFullYear(), selectedDates[0].getMonth(), selectedDates[0].getDate()).getTime()) {
            return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes())
        } else {
            return (new Date()).setHours(23, min = 59)
        }
    }

    const getEndMaxTime = () => {
        if (selectedDates[1] && UTCStartDate.getTime() === new Date(selectedDates[1].getFullYear(), selectedDates[1].getMonth(), selectedDates[1].getDate()).getTime()) {
            return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes())
        } else {
            return (new Date()).setHours(23, min = 59)
        }
    }

    const getEndMinTime = () => {
        if (selectedDates[1] && new Date(selectedDates[0].getFullYear(), selectedDates[0].getMonth(), selectedDates[0].getDate()).getTime() === new Date(selectedDates[1].getFullYear(), selectedDates[1].getMonth(), selectedDates[1].getDate()).getTime()) {
            return selectedDates[0]
        } else {
            return (new Date()).setHours(0, min = 0)
        }
    }

    const getEndMaxDate = () => {
        var endBound = new Date(selectedDates[0]);
        endBound.setDate(selectedDates[0].getDate() + 5);
        if (endBound > UTCStartDate) {
            return UTCStartDate;
        }
        else {
            return endBound;
        }
    }

    const handleStartDate = (date) => {
        if (new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() === new Date(selectedDates[0].getFullYear(), selectedDates[0].getMonth(), selectedDates[0].getDate()).getTime()) {
            setSelectedDates([date, selectedDates[1]])
        } else {
            setSelectedDates([date, null])
        }
    }

    return (
        <div>
            <h5 style={{ textDecoration: "underline" }}>Display Instructions</h5>
            <ul>
                <li>Select product from the Product drop-down list on the top</li>
                <li>Select starting and ending dates and times below</li>
                <li>Use Box Selection (lower right corner) or the Google Maps zoom
                    and pan tools to select the area of interest; toggle the Box
                    Selection button to turn the function on and off</li>
                <li>Use the slider to adjust opacity</li>
                <li>Toggle the Loop button to start and stop looping</li>
            </ul>
            <hr style={{ color: "black" }} />
            <h5>Start Date and Time</h5>
            <div className="date-picker" style={{ fontSize: "15px" }}>
                <Row>
                    <DatePicker
                        selected={selectedDates[0]}
                        onChange={(date) => handleStartDate(date)}
                        selectsStart
                        startDate={selectedDates[0]}
                        maxDate={UTCStartDate}
                        showTimeSelect
                        timeIntervals={10}
                        minTime={(new Date()).setHours(0, min = 0)}
                        maxTime={getStartMaxTime()}
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </Row>
            </div>
            <h5>End Date and Time</h5>
            <div className="date-picker" style={{ fontSize: "15px" }}>
                <Row>
                    <DatePicker
                        selected={selectedDates[1]}
                        onChange={(date) => setSelectedDates([selectedDates[0], date])}
                        selectsEnd
                        startDate={selectedDates[0]}
                        endDate={selectedDates[1]}
                        minDate={selectedDates[0]}
                        maxDate={getEndMaxDate()}
                        showTimeSelect
                        timeIntervals={10}
                        minTime={getEndMinTime()}
                        maxTime={getEndMaxTime()}
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </Row>
            </div>
        </div>
    );
}

export default NavRightMsfr;