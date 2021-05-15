import React from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";


const YoutubeEmbed = ({ embedId, playlistId }) => {

    const opts = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 1,
            enablejsapi: 1,
            fs: 0
        }
    };

    const loadNewVideo = () => {
        embedId = "_OOaStQopUE";
    }

    const checkElapsedTime = (e) => {
        console.log(e.target.playerInfo.playerState);
        const duration = e.target.getDuration();
        const currentTime = e.target.getCurrentTime();
        if (currentTime / duration > 0.95) {
            console.log(currentTime / duration);
            loadNewVideo();
        }
    };

    return (
        <div className="video-responsive">
            <YouTube
                videoId={embedId}
                // list={playlistId}
                // listType="playlist"
                containerClassName="embed embed-youtube"
                onStateChange={(e) => checkElapsedTime(e)}
                opts={opts}
            />
        </div >
    );
}

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
