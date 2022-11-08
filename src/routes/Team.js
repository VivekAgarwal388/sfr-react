import React from 'react';
import Navbar from '../components/Navbar.js'


const Team = () => {
    return (
        <div>
            <Navbar />
            <div style={{ textAlign: 'center', paddingTop: "20px" }}>
                <p>Huan Meng</p> <p>Team Lead, NOAA/NESDIS/STAR</p> <a href="mailto: huan.meng@noaa.gov">huan.meng@noaa.gov</a> <p></p>
                <br></br>
                <p>Vivek Agarwal</p> <p>Web Master, University of Maryland</p> <a href="mailto: vivekag@terpmail.umd.edu">vivekag@terpmail.umd.edu</a> <p></p>
                <br></br>
                <p>Jun Dong</p> <p>System Development, CISESS</p> <a href="mailto: jundong@umd.edu">jundong@umd.edu</a> <p></p>
                <br></br>
                <p>Yongzhen Fan</p> <p>Algorithm Development, CISESS</p> <a href="mailto: yfan1236@umd.edu">yfan1236@umd.edu</a> <p></p>
            </div>

        </div >
    );
}
export default Team;