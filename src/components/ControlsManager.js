import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import moment from 'moment';
import Controls from './Controls';

const ControlsManager = ({ getParams }) => {
    const [images, setImages] = useState(null);
    const [dates, setDates] = useState(null);
    const [satellites, setSatellites] = useState(null);
    const [area, setArea] = useState(0);
    const [transparency, setTransparency] = useState(70);

    const getControlParams = (params) => {
        setDates(params.dates)
        setSatellites(params.satellites)
        setArea(params.area)
        setTransparency(params.transparency)
    }

    useEffect(() => {
        getParams({ images: images, area: area, transparency: transparency })
    }, [images, area, transparency, getParams])

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
                url: 'http://cics.umd.edu/~vivekag/test/code0/getFiles.php',
                data: { years: dateArray, satellites: satelliteFolders },
                dataType: 'json',
                error: function (jqxhr, textstatus, errorthrown) {
                    console.log(textstatus);
                    console.log(errorthrown);
                },
                success: function (obj, textstatus) {
                    if (!('error' in obj)) {
                        if (obj.length > 0) {
                            const imgRegex = /S[0-9]{8}_[0-9]{6}/;

                            for (let day = 0; day < obj.length; day++) {
                                obj[day] = obj[day].sort(function (a, b) {
                                    return a.match(imgRegex)[0].localeCompare(b.match(imgRegex))
                                });
                                for (let img = 0; img < obj[day].length; img++) {
                                    // obj[day][img] = obj[day][img].replace("/home/jdong/www/", "http://cics.umd.edu/~jdong/");
                                    obj[day][img] = obj[day][img].replace("/home/vivekag/www/", "http://cics.umd.edu/~vivekag/");
                                }
                            }
                            obj = obj.flat();
                            for (let day = 0; day < obj.length; day++) {
                                obj[day] = [obj[day], null]
                            }
                            setImages(obj);

                            for (let day = 0; day < obj.length; day++) {
                                getBDY(obj[day]);
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
    }, [dates, satellites])

    return (
        <Controls getParams={getControlParams} />
    )
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

function getBDY(file) {
    var fileName = file[0].replace("http://cics.umd.edu/~vivekag/", "/home/vivekag/www/");
    fileName = fileName.replace(".png", ".bdy");
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: 'http://cics.umd.edu/~vivekag/test/code0/getBDY.php',
        data: { fileName: fileName },
        dataType: 'json',
        error: function (jqxhr, textstatus, errorthrown) {
            console.log(textstatus);
            console.log(errorthrown);
        },
        success: function (obj, textstatus) {
            if (!('error' in obj)) {
                obj[0].push(obj[0][obj.length - 1])
                file[1] = obj;
            }
            else {
                console.log("error");
            }
        }

    });
}

export default ControlsManager;