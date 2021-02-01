import React from 'react';

function Mystery({ mystery, currentMystery, mysteries, handleCurrentMystery, handleMysteries }) {
    // console.log('In Mystery.jsx');
    // console.log('Mystery code => ', mystery.code);
    // console.log('currentMystery => ', currentMystery);
    // console.log('mystery => ', mystery);
    // console.log('active => ', mystery.active);

    const mysterySelectHandler = () => {
        let newCurrentMystery = mysteries.filter(item => item.code === mystery.code);
        newCurrentMystery[0].active = 1;
        // console.log('Mystery.jsx - newCurrentMystery => ', newCurrentMystery);
        handleCurrentMystery(newCurrentMystery);
        // console.log('Mystery.jsx - Click => ', mystery.code);
        const newMysteries = mysteries.map((item) => {
            if (mystery.code === item.code) {
                return { ...item, active: 1 };
            } else {
                return { ...item, active: 0 };
            };
        });
        // console.log('newMysteries => ', newMysteries);
        handleMysteries(newMysteries);
    };

    return (
        <div onClick={mysterySelectHandler}
            className={`mystery-side ${mystery.active === 1 ? 'selected' : ''}`}>
            <img className="mystery-side__image" src={`${window.location.protocol}//${window.location.host}/assets/images/${mystery.image}`} alt={mystery.description}></img>
            <div className="mystery-side__desc">
                <h3 className="mystery-side__name">{mystery.description}</h3>
            </div>
        </div>
    )
};

export default Mystery;