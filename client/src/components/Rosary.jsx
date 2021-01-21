import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Duration from './Duration';
//import { audioSync } from 'audio-sync-with-text';
import iconPlay from '../assets/icons/Icon-play.svg';
import iconPause from '../assets/icons/Icon-pause.svg';
import iconVolume from '../assets/icons/Icon-volume.svg';
import iconVolumeMute from '../assets/icons/Icon-volume-mute.png';

class Rosary extends Component {
    _isMounted = false;

    state = {
        url: null,
        playing: true,
        volume: 0.8,
        muted: false,
        played: 0,
        duration: 0,
        playbackRate: 1.0
    };

    load = url => {
        this.setState({
            url,
            played: 0,
        });
    };

    componentDidMount() {
        this._isMounted = true;
        this.load('http://localhost:3000/assets/media/tue-fri-sorrowful.m4a');
        let asOptions = {
            audioPlayer: 'react-player',
            subtitleContainer: 'prayer-text',
            subtitleFile: '../assets/media/tue-fri-sorrowful.vtt'
        }
        console.log(asOptions);
        //audioSync(asOptions);
    };

    componentDidUpdate() {
    };

    componentWillUnmount() {
        this._isMounted = false;
    };

    handlePlay = () => {
        this.setState({ playing: true });
    };

    handlePause = () => {
        this.setState({ playing: false });
    };

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing });
    };

    handleVolumeChange = (e) => {
        this.setState({ volume: parseFloat(e.target.value) });
    };

    handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted });
    };

    handleSetPlaybackRate = (e) => {
        this.setState({ playbackRate: parseFloat(e.target.value) });
    };

    handleSeekMouseDown = (e) => {
        console.log('SeekMouseDown');
        this.setState({ seeking: true });
    };

    handleSeekChange = (e) => {
        console.log('SeekChange: ', e.target.value);
        this.setState({ played: parseFloat(e.target.value) });
    };

    handleSeekMouseUp = (e) => {
        this.setState({ seeking: false });
        console.log('SeekMouseUp: ', e.target.value)
        this.player.seekTo(parseFloat(e.target.value));
    };

    handleProgress = (state) => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state);
        };
    };

    handleEnded = () => {
        this.setState({ playing: this.state.loop });
    };

    handleDuration = (duration) => {
        this.setState({ duration });
    };

    ref = player => {
        this.player = player;
    };

    render() {
        const { url, playing, volume, muted, played, duration, playbackRate } = this.state
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
                                    {/* Hail Mary, full of Grace, the Lord is with thee; */}
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
                    {/* <ReactPlayer url="http://localhost:3000/assets/media/tue-fri-sorrowful.m4a" id="audio-player"
                        controls={true} width={310} height={50}
                        volume={.5} playbackRate={1} /> */}
                    <ReactPlayer
                        ref={this.ref}
                        className='react-player'
                        id='react-player'
                        width={0} height={0}
                        url={url}
                        playing={playing}
                        playbackRate={playbackRate}
                        volume={volume}
                        muted={muted}
                        onPlay={this.handlePlay}
                        onPause={this.handlePause}
                        onSeek={e => console.log('onSeek', e)}
                        onEnded={this.handleEnded}
                        onError={e => console.log('onError', e)}
                        onProgress={this.handleProgress}
                        onDuration={this.handleDuration}
                    />
                </div>
                <div className="audio__controls">
                    <div className="audio__play-container">
                        <img className="audio__play-icon"
                            onClick={this.handlePlayPause}
                            id="audio-play-icon"
                            src={playing ? iconPause : iconPlay}
                            alt="play icon"
                        />
                    </div>
                    <div className="audio__loader-container">
                        <div className="audio__loader">
                            <input
                                type='range' min={0} max={0.999999} step='any' className="audio__loader-slider"
                                value={played}
                                onMouseDown={this.handleSeekMouseDown}
                                onChange={this.handleSeekChange}
                                onMouseUp={this.handleSeekMouseUp}
                            />
                            {/* <progress id="progress" value="0" max="100">
                            </progress> */}
                        </div>
                        <div className="audio__loader-time">
                            {/* <div className="audio__loader-lapsed" id="audio-loader-lapsed">{duration * played}</div> */}
                            <Duration className="audio__loader-lapsed" seconds={duration * played} />
                            <div className="audio__loader-time-divider">/</div>
                            <Duration className="audio__loader-duration" seconds={duration} />
                            {/* <div className="audio__loader-duration">{duration}</div> */}
                        </div>
                    </div>
                    <div className="audio__volume-container">
                        <img className="audio__volume-icon"
                            id="audio-volume-icon"
                            onClick={this.handleToggleMuted}
                            src={muted ? iconVolumeMute : iconVolume}
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