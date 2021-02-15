import { convertVttToJson } from './vttjson';

export function syncVTT(options) {
    return new Promise(function (resolve, reject) {
        let syncData = [];

        // eslint-disable-next-line
        let init = function () {
            return fetch(new Request(options.subtitlesFile))
                .then(response => response.text().then(function (text) {
                    createSubtitle(text, syncData)
                    if (syncData) {
                        resolve(syncData);
                    } else {
                        reject(Error('Error loading syncData from WebVTT file!'));
                    };
                }))
        }();
    });

    function createSubtitle(text, syncData) {
        convertVttToJson(text)
            .then((result) => {
                let x = 0;
                for (let i = 0; i < result.length; i++) {
                    if (result[i].part && result[i].part.trim() !== '') {
                        syncData[x] = result[i];
                        x++;
                    };
                };
            });
    };
};