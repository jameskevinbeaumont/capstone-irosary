import { convertVttToJson } from './vttjson';
import axios from 'axios';

export function audioVTT(options) {

    const audioPlayer = document.getElementById(options.audioPlayer);
    const subtitles = document.getElementById(options.subtitlesContainer);
    const prayerTitle = document.getElementById(options.prayerTitle);
    const prayerSubtitle1 = document.getElementById(options.prayerSubtitle1);
    const prayerSubtitle2_1 = document.getElementById(options.prayerSubtitle2_1);
    const prayerSubtitle2_2 = document.getElementById(options.prayerSubtitle2_2);
    const prayerSubtitleMystery1 = document.getElementById(options.prayerSubtitleMystery1);
    const prayerSubtitleMystery2 = document.getElementById(options.prayerSubtitleMystery2);
    const prayerBackground = document.getElementById('prayer-background');
    const crucifixImage = document.getElementById('crucifix-image');

    let syncData = [];
    let syncDisplay = [];
    let saveIndex = -1;
    let saveBead = '';
    let timeStamp = Math.floor(Date.now() / 1000);
    //console.log(timeStamp);

    if (options.unmountComponent) {
        syncData.splice(0, syncData.length);
        syncDisplay.splice(0, syncDisplay.length);
        audioPlayer.removeEventListener('timeupdate', handlerFunc);
        return;
    };

    // eslint-disable-next-line
    const init = function () {
        return fetch(new Request(options.subtitlesFile))
            .then(response => response.text().then(function (text) {
                createSubtitle(text)
            }))
    }();

    function createSubtitle(text) {
        convertVttToJson(text)
            .then((result) => {
                let x = 0;
                for (let i = 0; i < result.length; i++) {
                    if (result[i].part && result[i].part.trim() !== '') {
                        syncData[x] = result[i];
                        x++;
                    };
                };
                syncData.forEach(function (obj) {
                    obj.TS = timeStamp;
                });
                //console.log('syncData: ', syncData);
                axios.get(`${window.$R_URL}${window.$R_ROSARY}${options.mysteryCode}`)
                    .then(result => {
                        syncDisplay = result.data
                        syncDisplay.forEach(function (obj) {
                            obj.TS = timeStamp;
                        });
                        //console.log('syncDisplay: ', syncDisplay)
                    })
                    .catch(err => console.log('Error=>', err.response));
            });
    };

    function displayPrayerTitle(index) {
        //console.log('displayPrayerTitle (index) => ', index)
        // let index =
        //     syncDisplay.findIndex(element => {
        //         if (element.index === sdIndex && element.TS === timeStamp) { return true; };
        //         return false;
        //     });

        // let index = 0;
        // let syncDisplayNew = syncDisplay.filter(item => item.index === sdIndex && item.TS === timeStamp);

        prayerBackground.style.backgroundImage = `url('${window.location.protocol}//${window.location.host}/assets/images/${syncDisplay[index].image}')`;
        if (syncDisplay[index].subtitle === '') {
            prayerTitle.style.marginTop = '2rem';
        } else {
            prayerTitle.style.marginTop = '0';
        };
        prayerTitle.innerText = syncDisplay[index].title;
        prayerSubtitle1.innerText = syncDisplay[index].subtitle;
        prayerSubtitle2_1.innerText = syncDisplay[index].subtitle_2_1;
        prayerSubtitle2_2.innerText = syncDisplay[index].subtitle_2_2;
        prayerSubtitleMystery1.innerText = syncDisplay[index].subtitle_mystery_2_1;
        prayerSubtitleMystery2.innerText = syncDisplay[index].subtitle_mystery_2_2;
        if (syncDisplay[index].crucifix === 1) {
            crucifixImage.style.backgroundImage = `url('${window.location.protocol}//${window.location.host}/assets/images/cross-animated-gif-60.gif')`;
        } else {
            crucifixImage.style.backgroundImage = `url('${window.location.protocol}//${window.location.host}/assets/images/roman-catholic-cross.png')`;
        };
        if (syncDisplay[index].bead_code !== null) {
            //console.log('Current bead => ', syncDisplay[index].bead_code);
            if (saveBead !== '' && saveBead !== syncDisplay[index].bead_code) {
                switch (saveBead) {
                    case 'OFH':
                        document.getElementById('of-fatima-hhq-bead').className = 'of-fatima-hhq__bead';
                        break;
                    case 'HMF':
                        document.getElementById('faith-bead').className = 'faith__bead';
                        break;
                    case 'HMH':
                        document.getElementById('hope-bead').className = 'hope__bead';
                        break;
                    case 'HMC':
                        document.getElementById('charity-bead').className = 'charity__bead';
                        break;
                    case 'MB':
                        document.getElementById('mystery-bead').className = 'mystery__bead';
                        break;
                    default:
                        // console.log('Reset previous bead => ', `'decade-bead-${syncDisplay[saveIndex].decade}'`);
                        document.getElementById(`decade-bead-${syncDisplay[saveIndex].decade}`).className = 'decade-bead__regular';
                };
            };
            if (saveBead !== syncDisplay[index].bead_code) {
                switch (syncDisplay[index].bead_code) {
                    case 'OFH':
                        document.getElementById('of-fatima-hhq-bead').className = 'of-fatima-hhq__bead--highlight';
                        break;
                    case 'HMF':
                        document.getElementById('faith-bead').className = 'faith__bead--highlight';
                        break;
                    case 'HMH':
                        document.getElementById('hope-bead').className = 'hope__bead--highlight';
                        break;
                    case 'HMC':
                        document.getElementById('charity-bead').className = 'charity__bead--highlight';
                        break;
                    case 'MB':
                        document.getElementById('mystery-bead').className = 'mystery__bead--highlight';
                        break;
                    default:
                        // console.log('Highlight current bead => ', `'decade-bead-${syncDisplay[index].decade}'`);
                        document.getElementById(`decade-bead-${syncDisplay[index].decade}`).className = 'decade-bead__regular--highlight';
                };
            };
            if (syncDisplay[index].bead_code !== saveBead) {
                saveBead = syncDisplay[index].bead_code;
            };
            // console.log('Save bead => ', saveBead);
        };
    };

    function handlerFunc() {
        let el;
        let index =
            syncData.findIndex(element => {
                if (((audioPlayer.currentTime * 1000) >= element.start &&
                    (audioPlayer.currentTime * 1000) <= element.end) &&
                    element.TS === timeStamp) { return true; };
                return false;
            });
        // console.log(index);
        // console.log(syncData[index]);
        if (index !== -1) {
            if (index !== saveIndex) {
                displayPrayerTitle(index);
                while (subtitles.hasChildNodes())
                    subtitles.removeChild(subtitles.firstChild)
                el = document.createElement('span');
                el.setAttribute("id", "c_" + index);
                el.innerText = syncData[index].part + "\n";
                subtitles.appendChild(el);
                saveIndex = index;
            }
        };
    };

    audioPlayer.addEventListener('timeupdate', handlerFunc);

    // document.getElementById('audio-player').removeEventListener('timeupdate', handlerFunc);


    // audioPlayer.addEventListener("timeupdate", function (e) {
    //     let el;
    //     let index =
    //         syncData.findIndex(element => {
    //             if ((audioPlayer.currentTime * 1000) >= element.start &&
    //                 (audioPlayer.currentTime * 1000) <= element.end) { return true; };
    //             return false;
    //         });
    //     if (index !== -1) {
    //         if (index !== saveIndex) {
    //             displayPrayerTitle(index);
    //             while (subtitles.hasChildNodes())
    //                 subtitles.removeChild(subtitles.firstChild)
    //             el = document.createElement('span');
    //             el.setAttribute("id", "c_" + index);
    //             el.innerText = syncData[index].part + "\n";
    //             subtitles.appendChild(el);
    //             saveIndex = index;
    //         }
    //     };
    // });
};