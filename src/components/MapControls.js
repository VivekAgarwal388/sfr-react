import React, { useState, useEffect, useCallback } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
var turf = require('@turf/turf');

const MapControls = ({ getParams, images, bounds, rectangle }) => {
    const [looping, setLooping] = useState(true);
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
            var poly2 = turf.polygon([[[bounds.west, bounds.north], [bounds.east, bounds.north], [bounds.east, bounds.south], [bounds.west, bounds.south], [bounds.west, bounds.north]]]);
            while (!turf.intersect(poly1, poly2) && startIndex !== newIndex) {
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
        <div>
            < ButtonGroup>
                <Button className="border-secondary" variant="light" onClick={() => { handleIncriment(-1); setLooping(false) }} >{'\u21E6'}</Button>
                <Button className="border-secondary" variant={looping ? "primary" : "light"} onClick={() => setLooping(!looping)} >looping</Button>
                <Button className="border-secondary" variant="light" onClick={() => { handleIncriment(1); setLooping(false) }} > {'\u21E8'}</Button>
            </ButtonGroup >
            <div style={{ marginTop: "10px", fontSize: "20px", marginBottom: "3px" }}>
                Opacity
            </div>
            <div style={{ marginBottom: "10px", backgroundColor: "#fff", paddingLeft: "10px", paddingRight: "10px", paddingTop: "4px", paddingBottom: "2px", width: "157px" }}>
                <Slider defaultValue={70} aria-label="Default" valueLabelDisplay="auto" onChange={(event, newVal) => setTransparency(newVal)} />
            </div>
            <div style={{ marginTop: "10px", fontSize: "20px", marginBottom: "2px" }}>
                Box Selection
            </div>
            <div >
                <Button className="border-secondary" variant={rectangle ? "primary" : "light"} onClick={() => setNewRectangle(!rectangle)} >{'\u2B1B'}</Button>
            </div>
            {/*<Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Col md="auto" style={{ paddingLeft: 10, paddingRight: 0 }}>
                    <Button className="border-secondary" variant={rectangle ? "primary" : "light"} onClick={() => setNewRectangle(!rectangle)} >{'\u2B1B'}</Button>
                </Col>
                <Col style={{ fontSize: "20px", paddingTop: "5px", paddingLeft: 5, paddingRight: 0 }}>
                    Box Selection
                </Col>

    </Row>*/}
        </div>
    )
}

export default MapControls