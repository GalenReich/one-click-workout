import React from "react";
import YouTube from "react-youtube";


function YoutubeEmbed(props) {

    const embedId = props.embedId;
    const setVideoFinished = props.setVideoFinished;

    const playerOpts = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 1,
            enablejsapi: 1,
            fs: 0
        }
    }

    return (
        <div className="video-responsive" >
            <YouTube
                videoId={embedId}
                containerClassName="embed embed-youtube"
                onEnd={(e) => setVideoFinished(true)}
                opts={playerOpts}
            />
        </div >
    );

}

export default YoutubeEmbed;
