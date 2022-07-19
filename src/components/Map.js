import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleMap, LoadScript, GroundOverlay } from '@react-google-maps/api';
import MapControls from './MapControls';

const containerStyle = {
    width: '1000px',
    height: '580px'
};

/*const bounds = {
    north: 53.2186,
    south: 17.29,
    east: -61.3468,
    west: -132.195
}; */

const bounds = {
    north: 50,
    south: 25,
    east: -65,
    west: -125
};


const Map = ({ images, center, zoom }) => {
    const [index, setIndex] = useState(0);
    const [root, setRoot] = useState(null);

    const getParams = (params) => {
        setIndex(params.index)
    }

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
        const root = createRoot(controlButtonDiv);
        root.render(
            <div>
                <MapControls getParams={getParams} images={images} />
            </div>
        );
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(controlButtonDiv);
        setRoot(root)
    };

    return (
        <div>
            <LoadScript
                googleMapsApiKey="AIzaSyC1BamxJufkG6VAkSQTOfoAnQ-_TPkPNp0"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={zoom}
                    onLoad={map => handleOnLoad(map)}
                >
                    {images ? <GroundOverlay
                        key={images[index]}
                        //url={images[index]}
                        url={"http://cics.umd.edu/~vivekag/images/N20/SFR_CONUS_ATMS_N20_S20220401_064050_E20220401_064122.png"}
                        bounds={bounds}
                        opacity={.7}
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