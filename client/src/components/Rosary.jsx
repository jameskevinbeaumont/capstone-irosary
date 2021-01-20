import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Duration from './Duration';
//import { audioSync } from 'audio-sync-with-text';
import iconPlay from '../assets/icons/Icon-play.svg';
import iconPause from '../assets/icons/Icon-pause.svg';
import iconVolume from '../assets/icons/Icon-volume.svg';

class Rosary extends Component {
    _isMounted = false;

    state = {
        url: null,
        playing: true,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0
    };

    load = url => {
        this.setState({
            url,
            played: 0,
            loaded: 0
        });
    };

    componentDidMount() {
        this._isMounted = true;
    };

    componentDidUpdate() {
    };

    componentWillUnmount() {
        this._isMounted = false;
    };

    handlePlay = () => {
        console.log('onPlay');
        this.setState({ playing: true });
    };

    handlePause = () => {
        console.log('onPause');
        this.setState({ playing: false });
    };

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing });
    };

    handleVolumeChange = e => {
        this.setState({ volume: parseFloat(e.target.value) });
    };

    handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted });
    };

    handleSetPlaybackRate = e => {
        this.setState({ playbackRate: parseFloat(e.target.value) });
    };

    handleSeekMouseDown = e => {
        this.setState({ seeking: true });
    };

    handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) });
    };

    handleSeekMouseUp = e => {
        this.setState({ seeking: false });
        this.player.seekTo(parseFloat(e.target.value));
    };

    handleProgress = state => {
        console.log('onProgress', state);
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state);
        };
    };

    handleEnded = () => {
        console.log('onEnded');
        this.setState({ playing: this.state.loop });
    };

    handleDuration = (duration) => {
        console.log('onDuration', duration);
        this.setState({ duration });
    };

    ref = player => {
        this.player = player;
    };

    render() {
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
                        <section className="background"></section>
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
                    <ReactPlayer url="http://localhost:3000/assets/media/tue-fri-sorrowful.m4a" id="audio-player"
                        controls={true} width={310} height={50}
                        volume={.5} playbackRate={1} />
                </div>
                <div className="audio__controls">
                    <div className="audio__play-container">
                        <img className="audio__play-icon" id="audio-play-icon"
                            src={iconPlay}
                            alt="play icon"
                        />
                    </div>
                    <div className="audio__loader-container">
                        <div className="audio__loader">
                            <progress id="progress" value="0" max="100">
                            </progress>
                        </div>
                        <div className="audio__loader-time">
                            <div className="audio__loader-lapsed" id="audio-loader-lapsed">0:00</div>
                            <div className="audio__loader-time-divider">/</div>
                            <div className="audio__loader-duration">0:00</div>
                        </div>
                    </div>
                    <div className="audio__volume-container">
                        <img className="audio__volume-icon"
                            id="audio-volume-icon"
                            src={iconVolume}
                            alt="volume icon"
                        />
                    </div>
                </div>
            </div>
        );
    };
};

export default Rosary;