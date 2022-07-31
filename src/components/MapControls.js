import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const MapControls = ({ getParams, images }) => {
    const [looping, setLooping] = useState(true)
    const [index, setIndex] = useState(0)

    const handleLooping = (loop) => {
        setLooping(!loop)
    }

    const handleIncriment = (incriment) => {
        if (!images || images.length === 0) {
            setIndex(0);
        }
        else {
            const newIndex = (index + incriment + images.length) % images.length;
            setIndex(newIndex)
        }
        setLooping(false)
    }

    useEffect(() => {
        getParams({ index: index })
    }, [index, getParams])

    useEffect(() => {
        setIndex(0);
    }, [images])

    useEffect(() => {
        if (images && images.length > 0 && looping) {
            const id = setInterval(() => setIndex((oldIndex) => (oldIndex + 1) % images.length), 1000);

            return () => {
                clearInterval(id);
            };
        }
    }, [images, looping]);

    return (
        <div>
            < ButtonGroup >
                <Button className="border-secondary" variant="light" onClick={() => handleIncriment(-1)} >{'\u21E6'}</Button>
                <Button className="border-secondary" variant={looping ? "primary" : "light"} onClick={() => handleLooping(looping)} >looping</Button>
                <Button className="border-secondary" variant="light" onClick={() => handleIncriment(1)} > {'\u21E8'}</Button>
            </ButtonGroup >
        </div>
    )
}

export default MapControls