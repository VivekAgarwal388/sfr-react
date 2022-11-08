import React, { useState, useEffect, useLayoutEffect } from 'react';
import $ from 'jquery';
import Map from './Map.js';
import moment, { min } from 'moment';

const center = { lat: 39, lng: -95 };

const zoom = 4;


const MapComponentMsfr = ({ dates }) => {
    const [images, setImages] = useState(null)

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
    }, []);

    useEffect(() => {
        function handleResize() {
            setWidth(Math.max(window.innerWidth - 377, 550));
            setHeight(Math.max(window.innerHeight - 160, 400));
        }

        setWidth(Math.max(window.innerWidth - 377), 550);
        setHeight(Math.max(window.innerHeight - 160), 400);

        window.addEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (dates) {
            let dateArray = getDates(dates[0], dates[1]);
            let times = [moment(dates[0]).format("HHmmss"), moment(dates[1]).format("HHmmss")];

            $.ajax({
                type: "GET",
                crossDomain: true,
                url: 'http://cics.umd.edu/~vivekag/test/code0/getFilesMsfr.php',
                data: { years: dateArray, times: times },
                dataType: 'json',
                error: function (jqxhr, textstatus, errorthrown) {
                    console.log(textstatus);
                    console.log(errorthrown);
                },
                success: function (obj, textstatus) {
                    if (!('error' in obj)) {
                        if (obj.length > 0) {

                            const imgRegex = /[0-9]{8}_[0-9]{6}/;

                            for (let day = 0; day < obj.length; day++) {
                                obj[day] = obj[day].sort(function (a, b) {
                                    return a.match(imgRegex)[0].localeCompare(b.match(imgRegex))
                                });
                                for (let img = 0; img < obj[day].length; img++) {
                                    obj[day][img] = obj[day][img].replace("/home/jdong/www/", "http://cics.umd.edu/~jdong/");
                                    obj[day][img] = obj[day][img].replace("/home/vivekag/www/", "http://cics.umd.edu/~vivekag/");
                                }
                            }
                            obj = obj.flat();

                            for (let day = 0; day < obj.length; day++) {
                                obj[day] = [obj[day], null, null];
                                obj[day][1] = [[[-130, 55], [-60, 55], [-60, 20], [-130, 20], [-130, 55]]];
                                obj[day][2] = {
                                    north: 55,
                                    south: 20,
                                    east: -60,
                                    west: -130
                                };
                            }

                            if (obj.length > 0) {
                                setImages(obj);
                            }
                            else {
                                setImages(null);
                                console.log("No results returned by PHP call.");
                            }

                        } else {
                            setImages(null);
                            console.log("No results returned by PHP call.");
                        }
                    }
                    else {
                        console.log(obj.error);
                    }
                }

            });
        }
    }, [dates])

    return (
        <div>
            <Map images={images} center={center} zoom={zoom} height={height} width={width} />
        </div>
    );
}

function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment((new Date(startDate)).setHours(0, min = 0));
    var stopDateMoment = moment(stopDate);
    while (currentDate <= stopDateMoment) {
        var formatDate = moment(currentDate).format('YYYYMMDD');
        dateArray.push([formatDate.substring(0, 4), formatDate.substring(4, 6), formatDate.substring(6, 8)]);
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

export default MapComponentMsfr;