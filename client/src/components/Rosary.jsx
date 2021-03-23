import React, { Component } from 'react';
import axios from 'axios';
// Import Components
import { syncVTT } from './syncvtt';
// Import Components
import MysteryDetailList from './MysteryDetailList';
import Footer from './Footer';
// Import Icons
import iconPlay from '../assets/icons/button_black_play.png'
import iconPause from '../assets/icons/button_black_pause.png';
import iconVolume1 from '../assets/icons/audio_volume_1.png';
import iconVolume2 from '../assets/icons/audio_volume_2.png';
import iconVolume3 from '../assets/icons/audio_volume_3.png';
import iconVolumeMute from '../assets/icons/audio_volume_muted.png';

class Rosary extends Component {
    _isMounted = false;

    state = {
        audioPlayer: '',
        prayersTitleText: '',
        prayersSubtitle1: '',
        prayersSubtitle2_1: '',
        prayersSubtitle2_2: '',
        prayersSubtitleMystery1: '',
        prayersSubtitleMystery2: '',
        prayersBackgroundImage: '',
        crucifixImage: '',
        prayerText: '',
        introMargin: false,
        backgroundImage: '',
        beadOFFatimaHHQ: 'of-fatima-hhq__bead',
        beadFaith: 'faith__bead',
        beadHope: 'hope__bead',
        beadCharity: 'charity__bead',
        beadMystery: 'mystery__bead',
        beadDecade: [
            { className: 'decade-bead__regular' },
            { className: 'decade-bead__regular' },
            { className: 'decade-bead__regular' },
            { className: 'decade-bead__regular' },
            { className: 'decade-bead__regular' },
            { className: 'decade-bead__regular' },
            { className: 'decade-bead__regular' },
            { className: 'decade-bead__regular' },
            { className: 'decade-bead__regular' },
            { className: 'decade-bead__regular' }
        ],
        currentMystery: [{
            code: '',
            description: '',
            image: '',
            mediaFile: '',
            vttFile: '',
            active: false
        }],
        newMysterySelected: false,
        mysteryDetail: [],
        vttLoaded: false, url: null,
        playing: false, volume: 0.2, played: 0,
        duration: 0, paused: 0, seek: false,
        playbackRate: 1.0, playedDisp: '', durationDisp: '',
        syncData: [],
        syncDisplay: [],
        saveIndex: -1,
        saveBead: ''
    };

    componentDidMount() {
        this._isMounted = true;
        // console.log('componentDidMount => Rosary.js');
        // console.log('this.props.mysteries => ', this.props.mysteries);

        // Creating event listener - audio HTML element will raise the
        // timeupdate event each second
        let audio = document.getElementById('audio-player');
        this.setState({ audioPlayer: audio });
        audio.addEventListener('timeupdate', this.timeupdateHandler);

        const currentDate = new Date();
        const weekDay = this.getWeekDay(currentDate);
        const currentDOW = currentDate.getDay();

        axios.get(`${window.$R_URL}${window.$R_ROSARY}${window.$R_MYSTERY}${currentDOW}`)
            .then(result => {
                this.setState({ introMargin: true })
                this.setState({ prayersTitleText: `Welcome ${localStorage.getItem('r_fname')}!` })
                this.setState({
                    prayerText: `Today is ${weekDay}\n\nOur mystery for today will be the ${result.data[0].description}`
                })
                if (this.state.currentMystery[0].code === '') {
                    result.data[0].active = 1
                }
                this.setState({ currentMystery: result.data })
                this.props.handleCurrentMystery(result.data)
            })
            .catch(err => console.log('Error=>', err.response));
    };

    componentDidUpdate() {
        // console.log('componentDidUpdate (Rosary.jsx)');
        // console.log('this.state.syncData => ', this.state.syncData);
        // console.log('this.props.mysteries => ', this.props.mysteries);
        let activeIndex = this.props.mysteries.findIndex(mystery => mystery.active === 1);
        if (this.props.mysteries.length !== 0) {
            if (this.props.mysteries[activeIndex].code !== this.state.currentMystery[0].code) {
                axios.get(`${window.$R_URL}${window.$R_ROSARY}${window.$R_MYSTERY}${this.props.mysteries[activeIndex].dayofweek_1}`)
                    .then(result => {
                        this.setState({ currentMystery: result.data })
                        this.props.handleCurrentMystery(result.data)
                    })
                    .catch(err => console.log('Error=>', err.response));
            };
        };

        if (this.state.currentMystery[0].code &&
            this.props.currentMystery[0].code) {
            if (this.state.currentMystery[0].code !==
                this.props.currentMystery[0].code) {
                this.setState({ introMargin: true })
                this.setState({ prayersTitleText: `${this.props.currentMystery[0].code} MYSTERIES` })
                this.setState({
                    prayerText: `${localStorage.getItem('r_fname')}, you have selected the ${this.props.currentMystery[0].description}!`
                })
                this.setState({ currentMystery: this.props.currentMystery });
                this.setState({ vttLoaded: false });
                this.setState({ url: null });
                this.setState({ newMysterySelected: true });
                this.props.handleCurrentPlayback(this.state.vttLoaded, 0);
            };
        };

        if (this.state.vttLoaded || !this.props.currentMystery[0].code) return;
        // Axios call to get the mystery details based on
        // the current mystery
        axios.get(`${window.$R_URL}${window.$R_ROSARY}${window.$R_MYSTERY}${window.$R_DETAIL}${this.props.currentMystery[0].code}`)
            .then(result => {
                this.setState({ mysteryDetail: result.data })
            })
            .catch(err => console.log('Error=>', err.response));

        if (!this.state.vttLoaded) {
            let svOptions = {
                subtitlesFile: `${window.location.protocol}//${window.location.host}/assets/media/${this.props.currentMystery[0].vtt_file}`,
            };
            syncVTT(svOptions)
                .then(resultvtt => {
                    this.setState({ syncData: resultvtt })
                    this.setState({ vttLoaded: true });
                    axios.get(`${window.$R_URL}${window.$R_ROSARY}${this.props.currentMystery[0].code}`)
                        .then(result => {
                            this.setState({ syncDisplay: result.data })
                        })
                        .catch(err => console.log('Error=>', err.response));
                })
                .catch(err => console.log('Error =>', err.response));
        };

        if (this.state.url === null) {
            this.load(`${window.location.protocol}//${window.location.host}/assets/media/${this.props.currentMystery[0].media_file}`);
        };
    };

    componentWillUnmount() {
        //console.log('componentWillUnmount');
        this._isMounted = false;
        let audio = document.getElementById('audio-player');
        this.props.handleCurrentPlayback(this.state.vttLoaded, audio.currentTime);
    };

    activeMysteryHandler = () => {
        this.setState({ mysteryStatus: !this.state.mysteryStatus });
    };

    getWeekDay = (date) => {
        let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = date.getDay();
        return weekdays[day];
    }

    timeupdateHandler = () => {
        let index =
            this.state.syncData.findIndex(element => {
                if (((this.state.audioPlayer.currentTime * 1000) >= element.start &&
                    (this.state.audioPlayer.currentTime * 1000) <= element.end)) { return true; };
                return false;
            });

        if (index !== -1) {
            if (index !== this.state.saveIndex) {
                this.displayPrayerTitle(index);
                this.setState({ saveIndex: index });
            }
        };
    };

    displayPrayerTitle = (index) => {
        this.setState({ prayersBackgroundImage: `url('${window.location.protocol}//${window.location.host}/assets/images/${this.state.syncDisplay[index].image}')` });

        if (this.state.syncDisplay[index].subtitle === '') {
            this.setState({ introMargin: true });
        } else {
            this.setState({ introMargin: false });
        };

        this.setState({ prayersTitleText: this.state.syncDisplay[index].title });
        this.setState({ prayersSubtitle1: this.state.syncDisplay[index].subtitle });
        this.setState({ prayersSubtitle2_1: this.state.syncDisplay[index].subtitle_2_1 });
        this.setState({ prayersSubtitle2_2: this.state.syncDisplay[index].subtitle_2_2 });
        this.setState({ prayersSubtitleMystery1: this.state.syncDisplay[index].subtitle_mystery_2_1 });
        this.setState({ prayersSubtitleMystery2: this.state.syncDisplay[index].subtitle_mystery_2_2 });

        if (this.state.syncDisplay[index].crucifix === 1) {
            this.setState({ crucifixImage: `url('${window.location.protocol}//${window.location.host}/assets/images/cross-animated-gif-60.gif')` });
        } else {
            this.setState({ crucifixImage: `url('${window.location.protocol}//${window.location.host}/assets/images/roman-catholic-cross.png')` });
        };

        this.setState({ prayerText: this.state.syncData[index].part });

        if (this.state.syncDisplay[index].bead_code !== null) {
            if (this.state.saveBead !== '' && this.state.saveBead !== this.state.syncDisplay[index].bead_code) {
                switch (this.state.saveBead) {
                    case 'OFH':
                        this.setState({ beadOFFatimaHHQ: 'of-fatima-hhq__bead' });
                        break;
                    case 'HMF':
                        this.setState({ beadFaith: 'faith__bead' });
                        break;
                    case 'HMH':
                        this.setState({ beadHope: 'hope__bead' });
                        break;
                    case 'HMC':
                        this.setState({ beadCharity: 'charity__bead' });
                        break;
                    case 'MB':
                        this.setState({ beadMystery: 'mystery__bead' });
                        break;
                    default:
                        let newBeadDecade = this.state.beadDecade;
                        newBeadDecade[this.state.syncDisplay[this.state.saveIndex].decade - 1].className = 'decade-bead__regular';
                        this.setState({ beadDecade: newBeadDecade });
                };
            };
            if (this.state.saveBead !== this.state.syncDisplay[index].bead_code) {
                switch (this.state.syncDisplay[index].bead_code) {
                    case 'OFH':
                        this.setState({ beadOFFatimaHHQ: 'of-fatima-hhq__bead--highlight' });
                        break;
                    case 'HMF':
                        this.setState({ beadFaith: 'faith__bead--highlight' });
                        break;
                    case 'HMH':
                        this.setState({ beadHope: 'hope__bead--highlight' });
                        break;
                    case 'HMC':
                        this.setState({ beadCharity: 'charity__bead--highlight' });
                        break;
                    case 'MB':
                        this.setState({ beadMystery: 'mystery__bead--highlight' });
                        break;
                    default:
                        let newBeadDecade = this.state.beadDecade;
                        newBeadDecade[this.state.syncDisplay[index].decade - 1].className = 'decade-bead__regular--highlight';
                        this.setState({ beadDecade: newBeadDecade });
                };
            };
            if (this.state.syncDisplay[index].bead_code !== this.state.saveBead) {
                this.setState({ saveBead: this.state.syncDisplay[index].bead_code });
            };
        };
    };

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
                if (!this.state.newMysterySelected) {
                    this.resetPrayers();
                } else {
                    this.setState({ newMysterySelected: false });
                };
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
        this.setState({ prayersBackgroundImage: `url('${window.location.protocol}//${window.location.host}/assets/images/marian-image-2.jpg')` });
        this.setState({ introMargin: true });
        this.setState({ prayersTitleText: `Thank you for praying with us ${localStorage.getItem('r_fname')}!` });
        this.setState({ prayersSubtitle1: '' });
        this.setState({ prayersSubtitle2_1: '' });
        this.setState({ prayersSubtitle2_2: '' });
        this.setState({ prayersSubtitleMystery1: '' });
        this.setState({ prayersSubtitleMystery2: '' });
        this.setState({ crucifixImage: `url('${window.location.protocol}//${window.location.host}/assets/images/roman-catholic-cross.png')` });
        this.setState({ prayerText: 'Select play to restart or select another mystery if you wish!' });
        this.resetBeads();
    };

    resetBeads = () => {
        this.setState({ beadOFFatimaHHQ: 'of-fatima-hhq__bead' });
        this.setState({ beadFaith: 'faith__bead' });
        this.setState({ beadHope: 'hope__bead' });
        this.setState({ beadCharity: 'charity__bead' });
        this.setState({ beadMystery: 'mystery__bead' });
        let newBeadDecade = this.state.beadDecade;
        for (let i = 0; i < 10; i++) {
            newBeadDecade[i].className = 'decade-bead__regular';
        };
        this.setState({ beadDecade: newBeadDecade });
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
                            <div className={this.state.beadMystery}
                                id="mystery-bead"></div>
                        </div>
                        <div className="charity-mystery">
                            <div className="charity-mystery__link"></div>
                        </div>
                        <div className="charity">
                            <div
                                className={this.state.beadCharity}
                                id="charity-bead"></div>
                        </div>
                        <div className="hope-charity">
                            <div className="hope-charity__link"></div>
                        </div>
                        <div className="hope">
                            <div
                                className={this.state.beadHope}
                                id="hope-bead"></div>
                        </div>
                        <div className="faith-hope">
                            <div className="faith-hope__link"></div>
                        </div>
                        <div className="faith">
                            <div
                                className={this.state.beadFaith}
                                id="faith-bead"></div>
                        </div>
                        <div className="of-fatima-hhq-faith">
                            <div className="of-fatima-hhq-faith__link"></div>
                        </div>
                        <div className="of-fatima-hhq">
                            <div
                                className={this.state.beadOFFatimaHHQ}
                                id="of-fatima-hhq-bead"></div>
                        </div>
                        <div className="crucifix">
                            <div
                                className="crucifix__image"
                                id="crucifix-image"
                                style={{ backgroundImage: this.state.crucifixImage, zIndex: this.props.mysteryStatus ? -1 : 1 }}
                            >
                            </div>
                        </div>
                    </div>
                    <div className="rosary__main-middle">
                        <section
                            className="background"
                            id="prayer-background"
                            style={{ backgroundImage: this.state.prayersBackgroundImage }}
                        >
                            <div className="prayers">
                                <div
                                    className="prayers__title"
                                    id="prayers-title"
                                    style={{ whiteSpace: 'pre-wrap', marginTop: this.state.introMargin ? 2 + 'rem' : 0 }}
                                >{this.state.prayersTitleText}</div>
                                <div className="prayers__subtitle">
                                    <div
                                        className="prayers__subtitle-1"
                                        id="prayers-subtitle-1"
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    >{this.state.prayersSubtitle1}</div>
                                    <div className="prayers__subtitle-2">
                                        <div
                                            className="prayers__subtitle-2-1"
                                            id="prayers-subtitle-2-1"
                                        >{this.state.prayersSubtitle2_1}</div>
                                        <div
                                            className="prayers__subtitle-2-2"
                                            id="prayers-subtitle-2-2"
                                        >{this.state.prayersSubtitle2_2}</div>
                                    </div>
                                </div>
                                <div className="prayers__subtitle-mystery">
                                    <div
                                        className="prayers__subtitle-mystery-1"
                                        id="prayers-subtitle-mystery-1">
                                        {this.state.prayersSubtitleMystery1}
                                    </div>
                                    <div
                                        className="prayers__subtitle-mystery-2"
                                        id="prayers-subtitle-mystery-2">
                                        {this.state.prayersSubtitleMystery2}
                                    </div>
                                </div>
                                <div
                                    className="prayers__text"
                                    id="prayer-text"
                                    style={{ whiteSpace: 'pre-wrap' }}>
                                    {this.state.prayerText}
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="rosary__main-right">
                        <div className="pad"></div>
                        <div className="decade-bead">
                            <div className={this.state.beadDecade[9].className} id="decade-bead-10"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-9"></div>
                        </div>
                        <div className="decade-bead">
                            <div className={this.state.beadDecade[8].className} id="decade-bead-9"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-8"></div>
                        </div>
                        <div className="decade-bead">
                            <div className={this.state.beadDecade[7].className} id="decade-bead-8"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-7"></div>
                        </div>
                        <div className="decade-bead">
                            <div className={this.state.beadDecade[6].className} id="decade-bead-7"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-6"></div>
                        </div>
                        <div className="decade-bead">
                            <div className={this.state.beadDecade[5].className} id="decade-bead-6"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-5"></div>
                        </div>
                        <div className="decade-bead">
                            <div className={this.state.beadDecade[4].className} id="decade-bead-5"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-4"></div>
                        </div>
                        <div className="decade-bead">
                            <div className={this.state.beadDecade[3].className} id="decade-bead-4"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-3"></div>
                        </div>
                        <div className="decade-bead">
                            <div className={this.state.beadDecade[2].className} id="decade-bead-3"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-2"></div>
                        </div>
                        <div className="decade-bead">
                            <div className={this.state.beadDecade[1].className} id="decade-bead-2"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="decade-link-1"></div>
                        </div>
                        <div className="decade-bead">
                            <div className={this.state.beadDecade[0].className} id="decade-bead-1"></div>
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
                <Footer style={{ marginTop: "10px" }} />
            </div>
        );
    };
};

export default Rosary;