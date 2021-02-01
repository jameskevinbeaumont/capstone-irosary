import React from 'react';

function MysteryDetail({ code, image, title, subtitle, detail_1, detail_2, detail_3, detail_4, detail_5, detail_6, detail_7, detail_8, detail_9, detail_10 }) {
    return (
        <div className="mysterydetail">
            <div className="mysterydetail__detail">
                <div className="mysterydetail__title">
                    <p className="mysterydetail__title-text">{title}</p>
                </div>
                <div className="mysterydetail__subtitle">
                    <p className="mysterydetail__subtitle-text">{subtitle}</p>
                </div>
                <div className="mysterydetail__image">
                    <img className="mysterydetail-image" src={`${window.location.protocol}//${window.location.host}/assets/images/${image}`} alt={code} />
                </div>
                <div className="mysterydetail__details">
                    <p className="mysterydetail__details-text">{detail_1}</p>
                    <p className="mysterydetail__details-text">{detail_2}</p>
                    <p className="mysterydetail__details-text">{detail_3}</p>
                    <p className="mysterydetail__details-text">{detail_4}</p>
                    <p className="mysterydetail__details-text">{detail_5}</p>
                    <p className="mysterydetail__details-text">{detail_6}</p>
                    <p className="mysterydetail__details-text">{detail_7}</p>
                    <p className="mysterydetail__details-text">{detail_8}</p>
                    <p className="mysterydetail__details-text">{detail_9}</p>
                    <p className="mysterydetail__details-text">{detail_10}</p>
                </div>
            </div>
        </div>
    );
};

export default MysteryDetail;