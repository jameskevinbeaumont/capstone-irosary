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

    // eslint-disable-next-line
    const init = function () {
        return fetch(new Request(options.subtitlesFile))
            .then(response => response.text().then(function (text) {
                //console.log(text)
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
                console.log('syncData: ', syncData);
                axios.get(`${window.$R_URL}${window.$R_ROSARY}${options.mysteryCode}`)
                    .then(result => {
                        syncDisplay = result.data
                        console.log('syncDisplay: ', syncDisplay)
                    })
                    .catch(err => console.log('Error=>', err.response));
            });
    };

    function displayPrayerTitle(index) {
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
    };

    audioPlayer.addEventListener("timeupdate", function (_e) {
        let el;
        let index =
            syncData.findIndex(element => {
                if ((audioPlayer.currentTime * 1000) >= element.start &&
                    (audioPlayer.currentTime * 1000) <= element.end) { return true; };
                return false;
            });
        if (index !== -1) {
            if (index !== saveIndex) {
                displayPrayerTitle(index);
                while (subtitles.hasChildNodes())
                    subtitles.removeChild(subtitles.firstChild)
                el = document.createElement('span');
                // el.classList.add('hide');
                // setTimeout(function () {
                el.setAttribute("id", "c_" + index);
                el.innerText = syncData[index].part + "\n";
                subtitles.appendChild(el);
                // }, 500);
                // setTimeout(function () {
                // el.classList.remove('hide');
                // }, 500);
                saveIndex = index;
            }
        };
    });
};