import React, { Component } from 'react';
import axios from 'axios';
// Import Components
import { audioVTT } from './audiovtt';
// Import Components
import MysteryDetailList from './MysteryDetailList';
// Import Icons
import iconPlay from '../assets/icons/button_black_play.png'
//import iconPlay from '../assets/icons/Icon-play.svg';
import iconPause from '../assets/icons/button_black_pause.png';
//import iconPause from '../assets/icons/Icon-pause.svg';
import iconVolume1 from '../assets/icons/audio_volume_1.png';
import iconVolume2 from '../assets/icons/audio_volume_2.png';
import iconVolume3 from '../assets/icons/audio_volume_3.png';
//import iconVolume from '../assets/icons/Icon-volume.svg';
import iconVolumeMute from '../assets/icons/audio_volume_muted.png';
//import iconVolumeMute from '../assets/icons/Icon-volume-mute.svg';

class Rosary extends Component {
    _isMounted = false;

    state = {
        currentMystery: [{
            code: '',
            description: '',
            image: '',
            mediaFile: '',
            vttFile: '',
            active: false
        }],
        mysteryDetail: [],
        vttLoaded: false, url: null,
        playing: false, volume: 0.6, played: 0,
        duration: 0, paused: 0, seek: false,
        playbackRate: 1.0, playedDisp: '', durationDisp: ''
    };

    componentDidMount() {
        this._isMounted = true;
        // console.log('componentDidMount => Rosary.js');
        // console.log('props => ', this.props);
        // console.log('mysteryStatus => ', this.props.mysteryStatus);
        // console.log('currentMystery (props) => ', this.props.currentMystery)

        // Get current day of the week
        const currentDate = new Date();
        const weekDay = this.getWeekDay(currentDate);
        const currentDOW = currentDate.getDay();

        // Axios call to get the mystery based upon the
        // day of the week
        axios.get(`${window.$R_URL}${window.$R_ROSARY}${window.$R_MYSTERY}${currentDOW}`)
            .then(result => {
                //console.log(result.data)
                document.getElementById('prayers-title').style.marginTop = '2rem';
                document.getElementById('prayers-title').innerText = `Welcome ${localStorage.getItem('r_fname')}!`
                let el = document.createElement('span');
                el.setAttribute("id", "c_initial");
                el.innerText = `Today is ${weekDay}\n\nOur mystery for today will be the ${result.data[0].description}`
                document.getElementById('prayer-text').appendChild(el)
                result.data[0].active = 1;
                // console.log('currentMystery (result.data) => ', result.data)
                this.setState({ currentMystery: result.data })
                this.props.handleCurrentMystery(result.data)
                // console.log('currentMystery (props - after axios) => ', this.props.currentMystery)
            })
            .catch(err => console.log('Error=>', err.response));
    };

    componentDidUpdate() {
        // console.log('componentDidUpdate (this.props.currentMystery) => Rosary.jsx', this.props.currentMystery);
        if (this.props.mysteryStatus) {
            document.getElementById('crucifix-image').style.zIndex = -1;
        } else {
            document.getElementById('crucifix-image').style.zIndex = 1;
        };

        if (this.state.currentMystery[0].code &&
            this.props.currentMystery[0].code) {
            if (this.state.currentMystery[0].code !==
                this.props.currentMystery[0].code) {
                let subtitles = document.getElementById('prayer-text');
                document.getElementById('prayers-title').style.marginTop = '2rem';
                document.getElementById('prayers-title').innerText = `${this.props.currentMystery[0].code} MYSTERIES`
                let el = document.createElement('span');
                while (subtitles.hasChildNodes())
                    subtitles.removeChild(subtitles.firstChild);
                el.setAttribute("id", "c_new-mystery");
                el.innerText = `${localStorage.getItem('r_fname')}, you have selected the ${this.props.currentMystery[0].description}!`;
                subtitles.appendChild(el);
                this.setState({ currentMystery: this.props.currentMystery });
            };
        };

        if (this.state.vttLoaded || !this.props.currentMystery[0].code) return;

        // Axios call to get the mystery details based on
        // the current mystery
        axios.get(`${window.$R_URL}${window.$R_ROSARY}${window.$R_MYSTERY}${window.$R_DETAIL}${this.props.currentMystery[0].code}`)
            .then(result => {
                // console.log('mysteryDetail (rosary.js) => ', result.data)
                this.setState({ mysteryDetail: result.data })
            })
            .catch(err => console.log('Error=>', err.response));

        let asOptions = {
            audioPlayer: 'audio-player',
            subtitlesContainer: 'prayer-text',
            prayerTitle: 'prayers-title',
            prayerSubtitle1: 'prayers-subtitle-1',
            prayerSubtitle2_1: 'prayers-subtitle-2-1',
            prayerSubtitle2_2: 'prayers-subtitle-2-2',
            prayerSubtitleMystery1: 'prayers-subtitle-mystery-1',
            prayerSubtitleMystery2: 'prayers-subtitle-mystery-2',
            subtitlesFile: `${window.location.protocol}//${window.location.host}/assets/media/${this.props.currentMystery[0].vtt_file}`,
            mysteryCode: this.props.currentMystery[0].code
        };

        if (!this.state.vttLoaded) {
            audioVTT(asOptions);
            this.setState({ vttLoaded: true });
        }

        if (this.state.url === null) {
            this.load(`${window.location.protocol}//${window.location.host}/assets/media/${this.props.currentMystery[0].media_file}`);
        };
    };

    componentWillUnmount() {
        this._isMounted = false;
        // console.log('componentWillUnmount');
    };

    activeMysteryHandler = () => {
        // console.log('activeMysteryHandler');
        this.setState({ mysteryStatus: !this.state.mysteryStatus });
    };

    getWeekDay = (date) => {
        //Create an array containing each day, starting with Sunday.
        let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        //Use the getDay() method to get the day.
        let day = date.getDay();
        //Return the element that corresponds to that index.
        return weekdays[day];
    }

    load = url => {
        this.setState({
            url,
            played: 0,
        });
    };

    handlePlayPause = () => {
        let audio = document.getElementById('audio-player');
        let icon = document.getElementById('audio-play-icon');

        this.setState({ playing: !this.state.playing });

        if (audio.paused || audio.ended) {
            let newPlayed = this.state.playedDisp.split(":");
            let newPlayedSecs = (Number(newPlayed[0]) * 60) + Number(newPlayed[1]);
            if (newPlayedSecs === 0) {
                this.resetPrayers();
            };
            if (this.state.seek) {
                audio.currentTime = newPlayedSecs;
                this.setState({ seek: false });
            };
            audio.play();
            icon.src = iconPause;
        } else {
            audio.pause();
            icon.src = iconPlay;
            this.setState({ paused: audio.currentTime });
        };
    };

    handleVolumeChange = (e) => {
        let audio = document.getElementById('audio-player');
        let icon = document.getElementById('audio-volume-icon');
        this.setState({ volume: parseFloat(e.target.value) });
        audio.volume = parseFloat(e.target.value);
        if (audio.volume === 0) {
            icon.src = iconVolumeMute;
        } else {
            let vol = audio.volume;
            if (vol > 0 && vol < 0.4) {
                icon.src = iconVolume1;
            } else if (vol > 0.3 && vol < 0.7) {
                icon.src = iconVolume2;
            } else {
                icon.src = iconVolume3;
            };
        };
    };

    handleSetPlaybackRate = (e) => {
        this.setState({ playbackRate: parseFloat(e.target.value) });
    };

    handleSeekChange = (e) => {
        this.setState({ played: parseFloat(e.target.value) });
        this.setState({ playedDisp: this.formatTime(parseFloat(e.target.value) * 1000) });
        this.setState({ seek: true });
    };

    handleProgress = (e) => {
        this.setState({ played: (parseFloat(e.target.currentTime) / 1000) });
        this.setState({ playedDisp: this.formatTime(parseFloat(((e.target.currentTime)))) });
    };

    handleDuration = (_e) => {
        let audio = document.getElementById('audio-player');
        this.setState({ duration: audio.duration });
        this.setState({ durationDisp: this.formatTime(audio.duration) });
    };

    handleEnded = () => {
        let icon = document.getElementById('audio-play-icon');
        this.resetPrayers();

        this.setState({ playing: false });
        icon.src = iconPlay;
    };

    resetPrayers = () => {
        document.getElementById('prayer-text').innerText = "";
        document.getElementById('prayers-title').innerText = "";
        document.getElementById('prayers-subtitle-1').innerText = "";
        document.getElementById('prayers-subtitle-2-1').innerText = "";
        document.getElementById('prayers-subtitle-2-2').innerText = "";
        document.getElementById('prayers-subtitle-mystery-1').innerText = "";
        document.getElementById('prayers-subtitle-mystery-2').innerText = "";
        document.getElementById('prayer-background').style.backgroundImage = `url('${window.location.protocol}//${window.location.host}/assets/images/marian-image-2.jpg')`;
        document.getElementById('of-fatima-hhq-bead').className = 'of-fatima-hhq__bead';
        document.getElementById('crucifix-image').style.backgroundImage = `url('${window.location.protocol}//${window.location.host}/assets/images/roman-catholic-cross.png')`;
        this.resetBeads();
    };

    resetBeads = () => {
        document.getElementById('of-fatima-hhq-bead').className = 'of-fatima-hhq__bead';
        document.getElementById('faith-bead').className = 'faith__bead';
        document.getElementById('hope-bead').className = 'hope__bead';
        document.getElementById('charity-bead').className = 'charity__bead';
        document.getElementById('mystery-bead').className = 'mystery__bead';
        for (let i = 1; i < 11; i++) {
            document.getElementById(`decade-bead-${i}`).className = 'decade-bead__regular';
        };
    };


    formatTime = (seconds) => {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = this.pad(date.getUTCSeconds());
        if (hh) {
            return `${hh}:${this.pad(mm)}:${ss}`;
        };
        return `${mm}:${ss}`;
    };

    pad = (string) => {
        return ('0' + string).slice(-2);
    };

    render() {
        const { url, volume, played, duration, playedDisp, durationDisp } = this.state

        return (
            <div className="rosary">
                <div className="rosary__main">
                    <div className="rosary__main-left">
                        <div className="pad"></div>
                        <div className="mystery">
                            <div className="mystery__bead"
                                id="mystery-bead"></div>
                        </div>
                        <div className="charity-mystery">
                            <div className="charity-mystery__link"></div>
                        </div>
                        <div className="charity">
                            <div
                                className="charity__bead"
                                id="charity-bead"></div>
                        </div>
                        <div className="hope-charity">
                            <div className="hope-charity__link"></div>
                        </div>
                        <div className="hope">
                            <div
                                className="hope__bead"
                                id="hope-bead"></div>
                        </div>
                        <div className="faith-hope">
                            <div className="faith-hope__link"></div>
                        </div>
                        <div className="faith">
                            <div
                                className="faith__bead"
                                id="faith-bead"></div>
                        </div>
                        <div className="of-fatima-hhq-faith">
                            <div className="of-fatima-hhq-faith__link"></div>
                        </div>
                        <div className="of-fatima-hhq">
                            <div
                                className="of-fatima-hhq__bead"
                                id="of-fatima-hhq-bead"></div>
                        </div>
                        <div className="crucifix">
                            <div className="crucifix__image" id="crucifix-image"></div>
                        </div>
                    </div>
                    <div className="rosary__main-middle">
                        <section className="background" id="prayer-background">
                            <div className="prayers">
                                <div
                                    className="prayers__title"
                                    id="prayers-title">
                                </div>
                                <div className="prayers__subtitle">
                                    <div
                                        className="prayers__subtitle-1"
                                        id="prayers-subtitle-1"
                                    ></div>
                                    <div className="prayers__subtitle-2">
                                        <div
                                            className="prayers__subtitle-2-1"
                                            id="prayers-subtitle-2-1"
                                        ></div>
                                        <div
                                            className="prayers__subtitle-2-2"
                                            id="prayers-subtitle-2-2"
                                        ></div>
                                    </div>
                                </div>
                                <div className="prayers__subtitle-mystery">
                                    <div
                                        className="prayers__subtitle-mystery-1"
                                        id="prayers-subtitle-mystery-1"></div>
                                    <div
                                        className="prayers__subtitle-mystery-2"
                                        id="prayers-subtitle-mystery-2"></div>
                                </div>
                                <div className="prayers__text" id="prayer-text">
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="rosary__main-right">
                        <div className="pad"></div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="decade-bead-10"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-9"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="decade-bead-9"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-8"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="decade-bead-8"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-7"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="decade-bead-7"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-6"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="decade-bead-6"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-5"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="decade-bead-5"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-4"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="decade-bead-4"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-3"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="decade-bead-3"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-2"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="decade-bead-2"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-1"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="decade-bead-1"></div>
                        </div>
                    </div>
                </div>
                <div className="audio">
                    <audio src={url} id="audio-player"
                        onTimeUpdate={this.handleProgress}
                        onCanPlayThrough={this.handleDuration}
                        onEnded={this.handleEnded}>
                    </audio>
                </div>
                <div className="audio__controls">
                    <div className="audio__play-container">
                        <img className="audio__play-icon"
                            onClick={this.handlePlayPause}
                            id="audio-play-icon"
                            src={iconPlay}
                            alt="play icon"
                        />
                    </div>
                    <div className="audio__loader-container">
                        <div className="audio__loader">
                            <input
                                type='range'
                                min={0}
                                max={(duration / 1000) || 0}
                                step='any' className="audio__loader-slider"
                                value={played}
                                onChange={this.handleSeekChange}
                            />
                        </div>
                        <div className="audio__loader-time">
                            <div className="audio__loader-lapsed">{played === 0 ? '0:00' : playedDisp}</div>
                            <div className="audio__loader-time-divider">/</div>
                            <div className="audio__loader-duration">{durationDisp}</div>
                        </div>
                    </div>
                    <div className="audio__volume-container">
                        <img className="audio__volume-icon"
                            id="audio-volume-icon"
                            src={iconVolume2}
                            alt="volume icon"
                        />
                        <input type='range' className="audio__volume-slider" min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
                    </div>
                </div>
                <MysteryDetailList detailList={this.state.mysteryDetail} />
            </div>
        );
    };
};

export default Rosary;