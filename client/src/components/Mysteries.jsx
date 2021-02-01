import React from 'react';
import Mystery from './Mystery';

function Mysteries({ mysteryStatus, mysteries, currentMystery, handleCurrentMystery, handleMysteries }) {
    // console.log('In Mysteries.jsx');
    // console.log('currentMystery => ', currentMystery);
    // console.log('currentMystery.code => ', currentMystery[0].code);
    // console.log('mysteries => ', mysteries);

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