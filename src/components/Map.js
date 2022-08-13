import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleMap, LoadScript, GroundOverlay } from '@react-google-maps/api';
import MapControls from './MapControls';
import ControlsManager from './ControlsManager';

const containerStyle = {
    width: '1600px',
    height: '780px'
};

const bounds = {
    north: 50,
    south: 25,
    east: -65,
    west: -125
};

const centers = [
    { lat: 39, lng: -97 },
    { lat: 64, lng: -149 },
    { lat: 25, lng: 0 }
];
const zooms = [5, 5, 3];

const libraries = ['drawing']

const Map = () => {
    const [index, setIndex] = useState(0);
    const [root, setRoot] = useState(null);
    const [transparency, setTransparency] = useState(70);
    const [timeRoot, setTimeRoot] = useState(null);
    const [currBounds, setBounds] = useState(null);
    const [images, setImages] = useState(null);
    const [area, setArea] = useState(0);

    const getParams = (params) => {
        setIndex(params.index)
    }

    const getControlsParams = (params) => {
        setImages(params.images)
        setArea(params.area)
        setTransparency(params.transparency)
    }

    useEffect(() => {
        if (root) {
            root.render(
                <div>
                    <MapControls getParams={getParams} images={images} bounds={currBounds} />
                </div>
            );
        }
    }, [images, root, currBounds])

    useEffect(() => {
        if (timeRoot && images && images[index] && images[index][0]) {
            timeRoot.render(
                <div style={{ padding: 5, backgroundColor: "#fff" }}>
                    {imgInfo(images[index][0]).join(' ')}
                </div>
            );
        }
        else if (timeRoot) {
            timeRoot.render(
                <div style={{ padding: 5, backgroundColor: "#fff" }}>
                    No Images Match Those Parameters
                </div>
            );
        }
    }, [images, index, timeRoot])

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

        const timeDiv = document.createElement('div');
        timeDiv.style.width = "500px";
        timeDiv.style.fontSize = "25px";
        timeDiv.style.fontFamily = "Roboto";
        timeDiv.style.marginBottom = "10px";
        timeDiv.style.justifyContent = "center";
        timeDiv.style.alignContent = "center";
        timeDiv.style.display = "flex";
        const timeRoot = createRoot(timeDiv);
        setTimeRoot(timeRoot)
        map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(timeDiv);

        const colorbarDiv = document.createElement('div');
        colorbarDiv.style.margin = "10px";
        const colorbarRoot = createRoot(colorbarDiv);
        colorbarRoot.render(
            <div>
                <img src='http://cics.umd.edu/~vivekag/build/images/Colormap.png' alt="Colorbar" className="Colorbar" />
            </div>
        );
        map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(colorbarDiv);

        const controlsDiv = document.createElement('div');
        controlsDiv.style.marginLeft = "10px";
        controlsDiv.style.padding = "10px";
        controlsDiv.style.backgroundColor = '#fff';
        const controlsRoot = createRoot(controlsDiv);
        controlsRoot.render(
            <div>
                <ControlsManager getParams={getControlsParams} />
            </div>
        );
        map.controls[window.google.maps.ControlPosition.LEFT_TOP].push(controlsDiv);

        const drawingManager = new window.google.maps.drawing.DrawingManager({
            drawingControl: true,
            drawingControlOptions: {
                position: window.google.maps.ControlPosition.RIGHT_TOP,
                drawingModes: [
                    window.google.maps.drawing.OverlayType.RECTANGLE,
                ],
            }
        });

        drawingManager.setMap(map);

        window.google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {
            map.fitBounds(rectangle.bounds, 0)
            rectangle.setMap(null)
        });

        var timeout;
        window.google.maps.event.addListener(map, 'bounds_changed', function () {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(function () {
                setBounds(map.getBounds().toJSON())
            }, 100);
        });

    };

    const imgInfo = img => {
        const imgRegex = /.{3}_S[0-9]{8}_[0-9]{6}/;
        var vals = img.match(imgRegex)[0].split('_');
        vals[1] = vals[1].substring(5, 7) + '/' + vals[1].substring(7, 9) + '/' + vals[1].substring(1, 5);
        vals[2] = vals[2].substring(0, 2) + ':' + vals[2].substring(2, 4) + ':' + vals[2].substring(4, 6);
        return vals;
    };

    return (
        <div>
            <LoadScript
                googleMapsApiKey="AIzaSyD0v4RPDBRX24gXqpGPoqgbHz0tE3cz0V0"
                libraries={libraries}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={centers[area]}
                    zoom={zooms[area]}
                    onLoad={map => handleOnLoad(map)}
                >
                    {images && images[index] ? <GroundOverlay
                        key={images[index][0]}
                        url={images[index][0]}
                        //url={"http://cics.umd.edu/~vivekag/images/N20/SFR_CONUS_ATMS_N20_S20220401_064050_E20220401_064122.png"}
                        bounds={bounds}
                        opacity={transparency / 100.0}
                    /> : null}
                    <div>
                        {images && images[index] ? <GroundOverlay
                            key={images[(index + 1) % images.length][0]}
                            url={images[(index + 1) % images.length][0]}
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