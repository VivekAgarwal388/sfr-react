import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import $ from 'jquery';
import Map from './Map.js';
import moment from 'moment';

const centers = [
    { lat: 39, lng: -95 },
    { lat: 64, lng: -149 },
    { lat: 25, lng: 0 }
];
const zooms = [4, 4, 2];


const MapComponent = ({ dates, satellites, area }) => {
    const [images, setImages] = useState(null)

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
                            setImages(obj.flat());

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
        <div>
            <Container>
                <Row md="auto">
                    <Col>
                        <Map images={images} center={centers[area]} zoom={zooms[area]} />
                    </Col>
                </Row>
            </Container>
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

export default MapComponent;