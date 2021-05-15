import React from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";


class YoutubeEmbed extends React.Component {

    constructor({ embedId, playlistId }) {
        super();
        this.state = {
            embedId: embedId
        }
        this.playlistId = playlistId;

        this.playerOpts = {
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                controls: 1,
                enablejsapi: 1,
                fs: 0
            }
        }

    }

    checkElapsedTime(e) {
        console.log(e.target.playerInfo.playerState);
        const duration = e.target.getDuration();
        const currentTime = e.target.getCurrentTime();
        if (currentTime / duration > 0.95) {
            console.log(currentTime / duration);
            this.changeVideo("2uXS20iWve4")
        }
    };

    changeVideo(embedId) {
        this.setState({ embedId: embedId });
    }

    render() {
        return (
            <div className="video-responsive" >
                <YouTube
                    videoId={this.state.embedId}
                    containerClassName="embed embed-youtube"
                    onStateChange={(e) => this.checkElapsedTime(e)}
                    opts={this.playerOpts}
                />
            </div >
        );
    };
}

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
