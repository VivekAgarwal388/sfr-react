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
            < ButtonGroup style={{ marginLeft: "15px" }}>
                <Button className="border-secondary" variant="light" onClick={() => { handleIncriment(-1); setLooping(false) }} >{'\u21E6'}</Button>
                <Button className="border-secondary" variant={looping ? "primary" : "light"} onClick={() => setLooping(!looping)} >looping</Button>
                <Button className="border-secondary" variant="light" onClick={() => { handleIncriment(1); setLooping(false) }} > {'\u21E8'}</Button>
            </ButtonGroup >
            <div style={{ backgroundColor: "#fff", padding: "10px", marginTop: "10px", marginBottom: "10px" }}>
                <h3>Transparency</h3>
                <Slider defaultValue={70} aria-label="Default" valueLabelDisplay="auto" onChange={(event, newVal) => setTransparency(newVal)} />
            </div>
            <Button style={{ marginLeft: "75px" }} className="border-secondary" variant={rectangle ? "primary" : "light"} onClick={() => setNewRectangle(!rectangle)} >{'\u2B1B'}</Button>
        </div>
    )
}

export default MapControls