import React from 'react';
import Navbar from '../components/Navbar.js'


const Animations = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingLeft: "40px", paddingTop: "20px", fontSize: "20px" }}>
                <a href="http://sfr.umd.edu/cases/c20220102_maryland/SFR_202201.gif" target="_blank" rel="noreferrer noopener">
                    January 2, 2022 SFR
                </a> <p></p>
                <br></br>
                <a href="http://sfr.umd.edu/cases/c20220102_maryland/msfr_202201.gif" target="_blank" rel="noreferrer noopener">
                    January 2, 2022 mSFR
                </a> <p></p>
            </div>

        </div >
    );
}
export default Animations;