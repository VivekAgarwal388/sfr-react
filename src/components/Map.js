import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleMap, LoadScript, GroundOverlay } from '@react-google-maps/api';
import MapControls from './MapControls';
import colorbar from '../logos/colorbar.png';

const libraries = ['drawing'];

const Map = ({ images, center, zoom, height, width }) => {
    const [index, setIndex] = useState(0);
    const [root, setRoot] = useState(null);
    const [transparency, setTransparency] = useState(70);
    const [timeRoot, setTimeRoot] = useState(null);
    const [currBounds, setBounds] = useState(null);
    const [rectangleBool, setRectangleBool] = useState(false);
    const [drawingManager, setDrawingManager] = useState(null);

    const getParams = (params) => {
        setIndex(params.index);
        setTransparency(params.transparency);
        setRectangleBool(params.rectangle);
    }

    useEffect(() => {
        if (root) {
            root.render(
                <div>
                    <MapControls getParams={getParams} images={images} bounds={currBounds} rectangle={rectangleBool} />
                </div>
            );
        }
    }, [images, root, rectangleBool, currBounds])

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

    useEffect(() => {
        if (drawingManager) {
            if (rectangleBool) {
                drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.RECTANGLE);
            }
            else {
                drawingManager.setDrawingMode(null);
            }
        }
    }, [rectangleBool, drawingManager])

    const handleOnLoad = map => {
        const controlButtonDiv = document.createElement('div');
        controlButtonDiv.style.paddingRight = "10px";
        controlButtonDiv.style.fontSize = "15";
        controlButtonDiv.style.fontFamily = "Roboto";
        controlButtonDiv.style.justifyContent = "center";
        controlButtonDiv.style.alignContent = "center";
        controlButtonDiv.style.display = "flex";
        const controlRoot = createRoot(controlButtonDiv);
        controlRoot.render(
            <div>
                <MapControls getParams={getParams} images={images} />
            </div>
        );
        map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(controlButtonDiv);
        setRoot(controlRoot)

        const timeDiv = document.createElement('div');
        timeDiv.style.fontSize = "25px";
        timeDiv.style.fontFamily = "Roboto";
        timeDiv.style.marginTop = "10px";
        timeDiv.style.marginLeft = "10px";
        const timeRoot = createRoot(timeDiv);
        setTimeRoot(timeRoot)
        map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(timeDiv);

        const colorbarDiv = document.createElement('div');
        colorbarDiv.style.paddingBottom = "25px";
        //colorbarDiv.style.paddingLeft = "0px";
        colorbarDiv.style.marginLeft = "-70px";
        const colorbarRoot = createRoot(colorbarDiv);
        colorbarRoot.render(
            <div>
                <img src={colorbar} alt="Colorbar" className="Colorbar" width="350" />
            </div>
        );
        map.controls[window.google.maps.ControlPosition.BOTTOM_LEFT].push(colorbarDiv);

        const drawingManager = new window.google.maps.drawing.DrawingManager({
            drawingMode: window.google.maps.drawing.OverlayType.RECTANGLE,
            drawingControl: false
        });

        drawingManager.setMap(map);
        setDrawingManager(drawingManager);

        window.google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {
            map.fitBounds(rectangle.bounds, 0);
            rectangle.setMap(null);
        });

        var timeout;
        window.google.maps.event.addListener(map, 'bounds_changed', function () {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(function () {
                setBounds(map.getBounds().toJSON())
            }, 100);
        });

        map.setOptions({ streetViewControl: false });
    };

    const imgInfo = img => {
        const imgRegex = /[0-9]{8}_[0-9]{6}/;
        var vals = img.match(imgRegex)[0].split('_');
        vals[0] = vals[0].substring(4, 6) + '/' + vals[0].substring(6, 8) + '/' + vals[0].substring(0, 4);
        vals[1] = vals[1].substring(0, 2) + ':' + vals[1].substring(2, 4) + ':' + vals[1].substring(4, 6);
        var satellites = {
            "npp": "S-NPP", "n20": "NOAA-20", "n19": "NOAA-19", "mob": "Metop-B",
            "moc": "Metop-C", "gpm": "GPM", "f16": "F16", "f17": "F17", "f18": "F18"
        };
        for (var key in satellites) {
            if (img.includes(key)) {
                vals.unshift(satellites[key]);
            }
        }
        return vals;
    };

    return (
        <div>
            <LoadScript
                googleMapsApiKey="AIzaSyD0v4RPDBRX24gXqpGPoqgbHz0tE3cz0V0"
                libraries={libraries}
            >
                <GoogleMap
                    mapContainerStyle={{
                        width: width + "px",
                        height: height + 'px'
                    }}
                    center={center}
                    zoom={zoom}
                    options={{
                        streetViewControl: false,
                        //mapTypeControl: false
                    }}
                    onLoad={map => handleOnLoad(map)}
                >
                    {images && images[index] && images[index][2] ? <GroundOverlay
                        key={images[index][0]}
                        url={images[index][0]}
                        bounds={images[index][2]}
                        opacity={transparency / 100.0}
                    /> : null}
                    <div>
                        {images && images[index] && images[index][2] ? <GroundOverlay
                            key={images[(index + 1) % images.length][0]}
                            url={images[(index + 1) % images.length][0]}
                            bounds={images[(index + 1) % images.length][2]}
                            opacity={0}
                        /> : null}
                    </div>
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default Map



