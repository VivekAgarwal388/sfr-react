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
            //console.log("hi")
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

    const handleStartDate = (date) => {
        if (new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() === new Date(selectedDates[0].getFullYear(), selectedDates[0].getMonth(), selectedDates[0].getDate()).getTime()) {
            setSelectedDates([date, selectedDates[1]])
        } else {
            setSelectedDates([date, null])
        }
    }

    return (
        <div>
            <h5>Select Start Date</h5>
            <div className="date-picker" style={{ fontSize: "14px" }}>
                <Row>
                    <DatePicker
                        selected={selectedDates[0]}
                        onChange={(date) => handleStartDate(date)}
                        selectsStart
                        startDate={selectedDates[0]}
                        endDate={selectedDates[1]}
                        maxDate={UTCStartDate}
                        showTimeSelect
                        inline
                        timeIntervals={10}
                        minTime={(new Date()).setHours(0, min = 0)}
                        maxTime={getStartMaxTime()}
                    />
                </Row>
            </div>
            <h5>Select End Date</h5>
            <div className="date-picker" style={{ fontSize: "14px" }}>
                <Row>
                    <DatePicker
                        selected={selectedDates[1]}
                        onChange={(date) => setSelectedDates([selectedDates[0], date])}
                        selectsEnd
                        startDate={selectedDates[0]}
                        endDate={selectedDates[1]}
                        minDate={selectedDates[0]}
                        maxDate={(new Date(UTCStartDate)).setDate(selectedDates[0].getDate() + 3) > UTCStartDate ? UTCStartDate : (new Date(UTCStartDate)).setDate(selectedDates[0].getDate() + 3)}
                        showTimeSelect
                        inline
                        timeIntervals={10}
                        minTime={getEndMinTime()}
                        maxTime={getEndMaxTime()}
                    />
                </Row>
            </div>
        </div>
    );
}

export default NavRightMsfr;