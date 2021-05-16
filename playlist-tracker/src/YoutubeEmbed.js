import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";


function YoutubeEmbed(props) {

    const playerOpts = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 1,
            enablejsapi: 1,
            fs: 0
        }
    }

    const [embedId, setEmbedId] = useState();

    useEffect(() => {
        setEmbedId(props.embedId)
    }, [props.embedId]);

    return (
        <div className="video-responsive" >
            <YouTube
                videoId={embedId}
                containerClassName="embed embed-youtube"
                onStateChange={(e) => checkElapsedTime(setEmbedId, e)}
                opts={playerOpts}
            />
        </div >
    );

}

function checkElapsedTime(setEmbedId, e) {
    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    if (currentTime / duration > 0.95) {
        console.log(currentTime / duration);
        changeVideo(setEmbedId, "2uXS20iWve4")
    }
};

function changeVideo(setEmbedId, newEmbedId) {
    setEmbedId(newEmbedId);
}



export default YoutubeEmbed;
