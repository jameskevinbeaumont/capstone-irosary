import React from 'react';
import axios from 'axios';

import Mystery from './Mystery';

function Mysteries({ mysteryStatus, mysteries, currentMystery, handleCurrentMystery, handleMysteries }) {
    // console.log('In Mysteries.jsx');
    // console.log('currentMystery => ', currentMystery);
    // console.log('currentMystery.code => ', currentMystery[0].code);
    // console.log('mysteries => ', mysteries);
    if (mysteries.length === 0) {
        //console.log('No mysteries!');
        axios.get(`${window.$R_URL}${window.$R_ROSARY}${window.$R_MYSTERY}`)
            .then(result => {
                let currentIndex = result.data.findIndex(mystery =>
                    mystery.code === currentMystery[0].code)
                if (currentIndex !== -1) {
                    result.data[currentIndex].active = 1
                    handleMysteries(result.data)
                    //console.log('Mysteries.jsx - mysteries => ', result.data)
                }
            })
            .catch(err => console.log('Error=>', err.response));
    };

    return (
        <div className={`mysteries ${mysteryStatus ? 'active-mysteries' : ''}`}>
            <div className="mysteries__mystery">
                {mysteries.map((mystery) => (
                    <Mystery
                        key={mystery.code}
                        mystery={mystery}
                        currentMystery={currentMystery}
                        mysteries={mysteries}
                        handleCurrentMystery={handleCurrentMystery}
                        handleMysteries={handleMysteries}
                    />
                ))}
            </div>
        </div>
    )
};

export default Mysteries;