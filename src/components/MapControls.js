import React, { useState, useEffect, useCallback } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
var turf = require('@turf/turf');

const MapControls = ({ getParams, images, bounds }) => {
    const [looping, setLooping] = useState(true)
    const [index, setIndex] = useState(0)

    const handleLooping = (loop) => {
        setLooping(!loop)
    }

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
        getParams({ index: index })
    }, [index, getParams])

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
            < ButtonGroup >
                <Button className="border-secondary" variant="light" onClick={() => { handleIncriment(-1); setLooping(false) }} >{'\u21E6'}</Button>
                <Button className="border-secondary" variant={looping ? "primary" : "light"} onClick={() => handleLooping(looping)} >looping</Button>
                <Button className="border-secondary" variant="light" onClick={() => { handleIncriment(1); setLooping(false) }} > {'\u21E8'}</Button>
            </ButtonGroup >
        </div>
    )
}

export default MapControls