import React, { Component } from 'react';
//import ReactPlayer from 'react-player';
//import Duration from './Duration';
import { audioSync } from 'audio-sync-with-text';
import iconPlay from '../assets/icons/Icon-play.svg';
import iconPause from '../assets/icons/Icon-pause.svg';
import iconVolume from '../assets/icons/Icon-volume.svg';
import iconVolumeMute from '../assets/icons/Icon-volume-mute.png';

class Rosary extends Component {
    _isMounted = false;

    state = {
        url: null,
        playing: false,
        volume: 0.8,
        played: 0,
        duration: 0,
        paused: 0,
        seek: false,
        playbackRate: 1.0,
        playedDisp: '',
        durationDisp: ''
    };

    load = url => {
        this.setState({
            url,
            played: 0,
        });
    };

    componentDidMount() {
        this._isMounted = true;
        console.log('componentDidMount');
        this.load('http://localhost:3000/assets/media/tue-fri-sorrowful.m4a');
        let asOptions = {
            // audioPlayer: 'react-player',
            audioPlayer: 'audio-player',
            subtitlesContainer: 'prayer-text',
            subtitlesFile: 'http://localhost:3000/assets/media/tue-fri-sorrowful.vtt'
        }
        console.log('asOptions: ', asOptions);
        audioSync(asOptions);
    };

    componentDidUpdate() {
    };

    componentWillUnmount() {
        this._isMounted = false;
    };

    handlePlayPause = () => {
        let audio = document.getElementById('audio-player');
        let icon = document.getElementById('audio-play-icon');

        this.setState({ playing: !this.state.playing });

        if (audio.paused || audio.ended) {
            // let calcTime = this.state.duration * parseFloat(this.state.played);
            // console.log('---------');
            // console.log('playedDisp: ', this.state.playedDisp);
            let newPlayed = this.state.playedDisp.split(":");
            // console.log('newPlayed: ', newPlayed)
            let newPlayedSecs = (Number(newPlayed[0]) * 60) + Number(newPlayed[1]);
            // console.log('newPlayedSecs: ', newPlayedSecs);
            //let calcTime = (this.state.played * 1000);
            // console.log('currentTime: ', audio.currentTime);
            // console.log('played: ', this.state.played);
            // console.log('duration: ', this.state.duration);
            // console.log('calcTime: ', calcTime);
            //console.log('formatTime: ', formatTime(calcTime));
            if (this.state.seek) {
                audio.currentTime = newPlayedSecs;
                // audio.currentTime = calcTime;
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
            icon.src = iconVolume;
        };
    };

    handleSetPlaybackRate = (e) => {
        this.setState({ playbackRate: parseFloat(e.target.value) });
    };

    handleSeekChange = (e) => {
        // console.log('SeekChange(played): ', parseFloat(e.target.value));
        this.setState({ played: parseFloat(e.target.value) });
        this.setState({ playedDisp: this.formatTime(parseFloat(e.target.value) * 1000) });
        // this.setState({ playedDisp: this.formatTime(parseFloat(e.target.value) * this.state.duration) });
        this.setState({ seek: true });
    };

    handleProgress = (e) => {
        // console.log('handleProgress => played: ', parseFloat(e.target.currentTime) / 1000);
        this.setState({ played: (parseFloat(e.target.currentTime) / 1000) });
        this.setState({ playedDisp: this.formatTime(parseFloat(((e.target.currentTime)))) });
    };

    handleDuration = (_e) => {
        let audio = document.getElementById('audio-player');
        // console.log('audio.duration: ', audio.duration);
        this.setState({ duration: audio.duration });
        this.setState({ durationDisp: this.formatTime(audio.duration) });
    };

    handleEnded = () => {
        let icon = document.getElementById('audio-play-icon');
        document.getElementById('prayer-text').style.transition = "0.6s";
        document.getElementById('prayer-text').innerText = "";

        this.setState({ playing: false });
        icon.src = iconPlay;
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
        const { url, playing, volume, played, duration, paused, seek, playbackRate, playedDisp, durationDisp } = this.state
        return (
            <div className="rosary">
                <div className="rosary__main">
                    <div className="rosary__main-left">
                        <div className="pad"></div>
                        <div className="first-mystery">
                            <div className="first-mystery__bead"></div>
                        </div>
                        <div className="charity-first-mystery">
                            <div className="charity-first-mystery__link"></div>
                        </div>
                        <div className="charity">
                            <div className="charity__bead"></div>
                        </div>
                        <div className="hope-charity">
                            <div className="hope-charity__link"></div>
                        </div>
                        <div className="hope">
                            <div className="hope__bead"></div>
                        </div>
                        <div className="faith-hope">
                            <div className="faith-hope__link"></div>
                        </div>
                        <div className="faith">
                            <div className="faith__bead"></div>
                        </div>
                        <div className="our-father-faith">
                            <div className="our-father-faith__link"></div>
                        </div>
                        <div className="our-father">
                            <div className="our-father__bead"></div>
                        </div>
                        <div className="crucifix">
                            <div className="crucifix__image"></div>
                        </div>
                    </div>
                    <div className="rosary__main-middle">
                        <section className="background">
                            <div className="prayers">
                                <div className="prayers__title">
                                    SIGN OF THE CROSS
                                </div>
                                <div className="prayers__text" id="prayer-text">
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="rosary__main-right">
                        <div className="pad"></div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="10"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="9"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="9"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="8"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="8"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="7"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="7"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="6"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="6"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="5"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="5"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="4"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="4"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="3"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="3"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="2"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="2"></div>
                        </div>
                        <div className="decade-link">
                            <div className="decade-link__regular" id="1"></div>
                        </div>
                        <div className="decade-bead">
                            <div className="decade-bead__regular" id="1"></div>
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
                            // src={playing ? iconPause : iconPlay}
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
                                // max={0.999999} 
                                step='any' className="audio__loader-slider"
                                value={played}
                                onChange={this.handleSeekChange}
                            />
                        </div>
                        <div className="audio__loader-time">
                            {/* <Duration className="audio__loader-lapsed" seconds={duration * played} /> */}
                            <div className="audio__loader-lapsed">{played === 0 ? '0:00' : playedDisp}</div>
                            <div className="audio__loader-time-divider">/</div>
                            {/* <Duration className="audio__loader-duration" seconds={duration} /> */}
                            <div className="audio__loader-duration">{durationDisp}</div>
                        </div>
                    </div>
                    <div className="audio__volume-container">
                        <img className="audio__volume-icon"
                            id="audio-volume-icon"
                            src={iconVolume}
                            alt="volume icon"
                        />
                        <input type='range' className="audio__volume-slider" min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
                    </div>
                </div>
            </div>
        );
    };
};

export default Rosary;