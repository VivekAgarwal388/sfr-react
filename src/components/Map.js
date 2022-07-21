import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleMap, LoadScript, GroundOverlay } from '@react-google-maps/api';
import MapControls from './MapControls';
import Slider from '@mui/material/Slider'

const containerStyle = {
    width: '1000px',
    height: '580px'
};

const bounds = {
    north: 50,
    south: 25,
    east: -65,
    west: -125
};


const Map = ({ images, center, zoom }) => {
    const [index, setIndex] = useState(0);
    const [root, setRoot] = useState(null);
    const [transparency, setTransparency] = useState(70)

    const getParams = (params) => {
        setIndex(params.index)
    }

    const handleSliderChange = (event, newValue) => {
        setTransparency(newValue);
    };

    useEffect(() => {
        if (root) {
            root.render(
                <div>
                    <MapControls getParams={getParams} images={images} />
                </div>
            );
        }
    }, [images, root])

    const handleOnLoad = map => {
        const controlButtonDiv = document.createElement('div');
        controlButtonDiv.style.paddingTop = "10px";
        controlButtonDiv.style.fontSize = "15";
        const controlRoot = createRoot(controlButtonDiv);
        controlRoot.render(
            <div>
                <MapControls getParams={getParams} images={images} />
            </div>
        );
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(controlButtonDiv);
        setRoot(controlRoot)

        const transparencyDiv = document.createElement('div');
        transparencyDiv.style.width = "300px";
        transparencyDiv.style.fontSize = "15";
        transparencyDiv.style.backgroundColor = '#fff';
        transparencyDiv.style.paddingLeft = "20px";
        transparencyDiv.style.paddingRight = "20px";
        transparencyDiv.style.paddingTop = "5px";
        transparencyDiv.style.margin = "20px";
        const transparencyRoot = createRoot(transparencyDiv);
        transparencyRoot.render(
            <div>
                <Slider defaultValue={70} aria-label="Default" valueLabelDisplay="auto" onChange={handleSliderChange} />
            </div>
        );
        map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(transparencyDiv);

        const colorbarDiv = document.createElement('div');
        colorbarDiv.style.paddingLeft = "15px";
        const colorbarRoot = createRoot(colorbarDiv);
        colorbarRoot.render(
            <div>
                <img src='http://cics.umd.edu/~vivekag/build/images/Colormap.png' alt="Colorbar" className="Colorbar" />
            </div>
        );
        map.controls[window.google.maps.ControlPosition.LEFT_CENTER].push(colorbarDiv);

    };

    return (
        <div>
            <LoadScript
                googleMapsApiKey="AIzaSyD0v4RPDBRX24gXqpGPoqgbHz0tE3cz0V0"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={zoom}
                    onLoad={map => handleOnLoad(map)}
                >
                    {images ? <GroundOverlay
                        key={images[index]}
                        url={images[index]}
                        //url={"http://cics.umd.edu/~vivekag/images/N20/SFR_CONUS_ATMS_N20_S20220401_064050_E20220401_064122.png"}
                        bounds={bounds}
                        opacity={transparency / 100.0}
                    /> : null}
                    <div>
                        {images ? <GroundOverlay
                            key={images[index + 1]}
                            url={images[index + 1]}
                            bounds={bounds}
                            opacity={0}
                        /> : null}
                    </div>
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default Map