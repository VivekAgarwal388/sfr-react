import React from 'react';
import Navbar from '../components/Navbar.js'


const ATBD = () => {
    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <iframe src="http://cics.umd.edu/~vivekag/documents/ATBD_SFR_v2.0.pdf" height="800" width="700" title="SFR"></iframe>
            </div>
        </div>
    );
}
export default ATBD;