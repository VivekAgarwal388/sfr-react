import React, { useState, useEffect, useCallback } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap'
import Slider from '@mui/material/Slider';
var turf = require('@turf/turf');

const MapControls = ({ getParams, images, bounds, rectangle }) => {
    const [looping, setLooping] = useState(false);
    const [index, setIndex] = useState(0);
    const [transparency, setTransparency] = useState(70);
    const [newRectangle, setNewRectangle] = useState(false);

    const handleIncriment = useCallback((incriment) => {
        if (!images || images.length === 0) {
            setIndex(0);
        }
        else {
            const startIndex = index;
            var newIndex = (index + incriment + images.length) % images.length;
            var poly1 = turf.polygon(images[newIndex][1]);
            var poly2;
            var poly3;
            if (bounds.west < bounds.east) {
                poly2 = turf.polygon([[[bounds.west, bounds.north], [bounds.east, bounds.north], [bounds.east, bounds.south], [bounds.west, bounds.south], [bounds.west, bounds.north]]]);
                poly3 = turf.polygon([[[bounds.west - 360, bounds.north], [bounds.east - 360, bounds.north], [bounds.east - 360, bounds.south], [bounds.west - 360, bounds.south], [bounds.west - 360, bounds.north]]]);
            }
            else {
                poly2 = turf.polygon([[[bounds.west - 360, bounds.north], [bounds.east, bounds.north], [bounds.east, bounds.south], [bounds.west - 360, bounds.south], [bounds.west - 360, bounds.north]]]);
                poly3 = turf.polygon([[[bounds.west, bounds.north], [bounds.east + 360, bounds.north], [bounds.east + 360, bounds.south], [bounds.west, bounds.south], [bounds.west, bounds.north]]]);
            }
            while (!(turf.intersect(poly1, poly2) || turf.intersect(poly1, poly3)) && startIndex !== newIndex) {
                console.log(images[newIndex])
                newIndex = (newIndex + incriment + images.length) % images.length;
                poly1 = turf.polygon(images[newIndex][1]);
            }
            setIndex(newIndex);
        }
    }, [index, images, bounds])

    useEffect(() => {
        getParams({ index: index, transparency: transparency, rectangle: newRectangle })
    }, [index, transparency, newRectangle, getParams])

    useEffect(() => {
        setIndex(0);
    }, [images])

    useEffect(() => {
        if (images && images.length > 0 && looping) {
            const id = setInterval(() => handleIncriment(1), 1000);

            return () => {
                clearInterval(id);
            };
        }
    }, [images, looping, handleIncriment]);

    return (
        <div style={{ marginTop: "10px", marginBottom: "0px", backgroundColor: "#000", paddingTop: "8px", paddingBottom: "2px", paddingLeft: "8px", paddingRight: "8px" }}>
            <ButtonGroup>
                <Button className="border-secondary" variant="light" onClick={() => { handleIncriment(-1); setLooping(false) }} >{'\u21E6'}</Button>
                <Button className="border-secondary" style={{ padding: "0.25rem 1rem" }} size="sm" variant={looping ? "primary" : "light"} onClick={() => setLooping(!looping)} >Loop</Button>
                <Button className="border-secondary" variant="light" onClick={() => { handleIncriment(1); setLooping(false) }} > {'\u21E8'}</Button>
            </ButtonGroup >
            <div style={{ marginTop: "5px", fontSize: "16px", backgroundColor: "#000", marginBottom: "5px" }}>
                <center><font color="#fff">Opacity</font></center>
            </div>
            <div style={{ marginBottom: "10px", backgroundColor: "#fff", paddingLeft: "10px", paddingRight: "10px", paddingTop: "0px", paddingBottom: "0px", width: "140px" }}>
                <Slider defaultValue={70} aria-label="Default" valueLabelDisplay="auto" onChange={(event, newVal) => setTransparency(newVal)} />
            </div>
            {/*}
            <div style={{ marginTop: "2px", fontSize: "16px", marginBottom: "2px" }}>
                <center><font color="#fff">Box Selection</font></center>
            </div>
            <div  style={{ marginTop: "5px", backgroundColor: "#000", marginBottom: "5px" }}>
                <Button className="border-secondary" variant={rectangle ? "primary" : "light"} onClick={() => setNewRectangle(!rectangle)} >{'\u2B1B'}</Button>
            </div>
        */}
            <Row style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 4 }}>
                <Col md="auto" style={{ paddingLeft: 10, paddingRight: 0 }}>
                    <Button className="border-secondary" size="sm" variant={rectangle ? "primary" : "light"} onClick={() => setNewRectangle(!rectangle)} >{'\u2B1B'}</Button>
                </Col>
                <Col style={{ fontSize: "16px", paddingTop: "6px", paddingLeft: 8, paddingRight: 0 }}>
                    <font color="#fff">Box Selection</font>
                </Col>
            </Row>
        </div>
    )
}

export default MapControls


