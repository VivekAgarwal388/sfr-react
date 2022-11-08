import React, { useState, useEffect, useLayoutEffect } from 'react';
import $ from 'jquery';
import Map from './Map.js';
import moment from 'moment';

const centers = [
    { lat: 39, lng: -95 },
    { lat: 64, lng: -149 },
];
const zooms = [4, 4];


const MapComponent = ({ dates, satellites, area }) => {
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
            const extensions = ["npp", "n20", "n19", "mob", "moc", "gpm", "f16", "f17", "f18"];
            let dateArray = getDates(dates[0], dates[1]);
            let satelliteFolders = [];
            for (let i = 0; i < satellites.length; i++) {
                if (satellites[i]) {
                    satelliteFolders.push(extensions[i]);
                }
            }

            $.ajax({
                type: "GET",
                crossDomain: true,
                url: area === 0 ? 'http://cics.umd.edu/~jdong/build_php/code0/getFiles.php' :
                    'http://cics.umd.edu/~vivekag/test/code0/getFiles.php',
                data: { years: dateArray, satellites: satelliteFolders },
                dataType: 'json',
                error: function (jqxhr, textstatus, errorthrown) {
                    console.log(textstatus);
                    console.log(errorthrown);
                },
                success: function (obj, textstatus) {
                    if (!('error' in obj)) {
                        if (obj.length > 0 && obj[0].length > 0) {
                            const imgRegex = /S[0-9]{8}_[0-9]{6}/;

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
                                obj[day] = [obj[day], null, null]
                            }

                            var promisesArray = []

                            for (let day = 0; day < obj.length; day++) {
                                promisesArray.push(getBDY(obj[day]));
                            }

                            Promise.all(promisesArray).then(() => { setImages(obj) });

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
    }, [dates, satellites, area])

    return (
        <div>
            <Map images={images} center={centers[area]} zoom={zooms[area]} height={height} width={width} />
        </div>
    );
}

function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDateMoment = moment(stopDate);
    while (currentDate <= stopDateMoment) {
        var formatDate = moment(currentDate).format('YYYYMMDD');
        dateArray.push([formatDate.substring(0, 4), formatDate.substring(4, 6), formatDate.substring(6, 8)]);
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

async function getBDY(file) {
    var fileName = file[0].replace("http://cics.umd.edu/~jdong/", "/home/jdong/www/");
    fileName = fileName.replace(".png", ".bdy");
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: 'http://cics.umd.edu/~jdong/build_php/code0/getBDY.php',
            data: { fileName: fileName },
            dataType: 'json',
            error: function (jqxhr, textstatus, errorthrown) {
                console.log(textstatus);
                console.log(errorthrown);
                reject(0);
            },
            success: function (obj, textstatus) {
                if (!('error' in obj)) {
                    var bounds = obj[0].shift();
                    obj[0].push(obj[0][obj.length - 1]);
                    file[1] = obj;
                    file[2] = {
                        north: bounds[3],
                        south: bounds[2],
                        east: bounds[1],
                        west: bounds[0]
                    };
                    resolve(1);
                }
                else {
                    console.log("error");
                    reject(0);
                }
            }

        });
    })
}

export default MapComponent;