import React from 'react';
// Import Components
import MysteryDetail from './MysteryDetail';

function MysteryDetailList({ detailList }) {
    return (
        <section className="mysterydetaillist">
            {detailList.map((mystery) =>
                <MysteryDetail
                    key={mystery.code}
                    code={mystery.code}
                    image={mystery.image}
                    title={mystery.title}
                    subtitle={mystery.subtitle}
                    detail_1={mystery.detail_1}
                    detail_2={mystery.detail_2}
                    detail_3={mystery.detail_3}
                    detail_4={mystery.detail_4}
                    detail_5={mystery.detail_5}
                    detail_6={mystery.detail_6}
                    detail_7={mystery.detail_7}
                    detail_8={mystery.detail_8}
                    detail_9={mystery.detail_9}
                    detail_10={mystery.detail_10}
                >
                </MysteryDetail>)}
        </section>
    );
};

export default MysteryDetailList;