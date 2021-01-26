import { convertVttToJson } from './vttjson';

export function audioVTT(options) {

    const audioPlayer = document.getElementById(options.audioPlayer);
    const subtitles = document.getElementById(options.subtitlesContainer);
    const prayerTitle = document.getElementById(options.prayerTitle);
    const prayerSubtitle1 = document.getElementById(options.prayerSubtitle1);
    const prayerSubtitle2_1 = document.getElementById(options.prayerSubtitle2_1);
    const prayerSubtitle2_2 = document.getElementById(options.prayerSubtitle2_2);
    const prayerSubtitleMystery1 = document.getElementById(options.prayerSubtitleMystery1);
    const prayerSubtitleMystery2 = document.getElementById(options.prayerSubtitleMystery2);
    let syncData = [];
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
            });
    };

    function displayPrayerTitle(index) {
        switch (index) {
            case 0:
                prayerTitle.innerText = "SIGN OF THE CROSS";
                break;
            case 1: case 2: case 3: case 4:
                prayerTitle.innerText = "APOSTLES' CREED";
                break;
            case 5: case 6:
                prayerTitle.innerText = 'OUR FATHER';
                break;
            case 7: case 8:
                prayerTitle.innerText = "HAIL MARY\n Faith";
                break;
            case 9: case 10:
                prayerTitle.innerText = "HAIL MARY\n Hope";
                break;
            case 11: case 12:
                prayerTitle.innerText = "HAIL MARY\n Charity";
                break;
            case 13:
                prayerTitle.innerText = "GLORY BE";
                break;
            case 14: case 15: case 16:
                prayerTitle.innerText = "SORROWFUL MYSTERIES";
                prayerSubtitle1.innerText = "1";
                prayerSubtitle2_1.innerText = "The Agony in the Garden"
                prayerSubtitle2_2.innerText = "Fruit: Conformity to the will of God"
                break;
            case 40: case 41:
                prayerSubtitleMystery1.innerText = '';
                prayerSubtitleMystery2.innerText = 'OUR FATHER';
                break;
            case 17: case 18:
                prayerSubtitleMystery1.innerText = '1';
                prayerSubtitleMystery2.innerText = 'HAIL MARY';
                break;
            case 19: case 20:
                prayerSubtitleMystery1.innerText = '2';
                prayerSubtitleMystery2.innerText = 'HAIL MARY';
                break;
            case 21: case 22:
                prayerSubtitleMystery1.innerText = '3';
                prayerSubtitleMystery2.innerText = 'HAIL MARY';
                break;
            case 23: case 24:
                prayerSubtitleMystery1.innerText = '4';
                prayerSubtitleMystery2.innerText = 'HAIL MARY';
                break;
            case 37:
                prayerSubtitleMystery1.innerText = '';
                prayerSubtitleMystery2.innerText = 'GLORY BE';
                break;
            default:
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
                el.setAttribute("id", "c_" + index);
                el.innerText = syncData[index].part + "\n";
                subtitles.appendChild(el);
                saveIndex = index;
            }
        };
    });
};