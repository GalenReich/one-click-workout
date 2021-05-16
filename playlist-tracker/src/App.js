import './App.css';

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { LinearProgress, createMuiTheme, ThemeProvider } from '@material-ui/core';
import YoutubeEmbed from "./YoutubeEmbed";

const style = getComputedStyle(document.body)
const theme = createMuiTheme({
  overrides: {
    MuiLinearProgress: {
      root: {
        height: '5vh',
      },
      colorPrimary: {
        "background-color": style.getPropertyValue('--progress-back'),
      },
      barColorPrimary: {
        "background-color": style.getPropertyValue('--progress-main'),
      },
    },
  },
});

function ProgressView(props) {
  const timeout = 3000 //3 seconds
  setTimeout(() => {
    console.log(window.location)
    if (window.location.pathname == "/") {
      window.location.href = "/video";
    }
  }, timeout);
  return (
    <ThemeProvider theme={theme}>
      <title>Progress</title>
      <h1>Progress Screen</h1>
      <div className="Progress">
        <LinearProgress variant="determinate" value={props.progress} />
      </div>
    </ThemeProvider>
  );

}

function VideoView(props) {
  return (
    <ThemeProvider theme={theme}>
      <title>Video</title>
      <div className="Progress">
        <LinearProgress variant="determinate" value={props.progress} />
      </div>
      <div className="Youtube">
        <YoutubeEmbed embedId={props.embedId} setVideoFinished={props.setVideoFinished} />
      </div>
    </ThemeProvider>
  );
}

function SummaryView() {
  return (
    <ThemeProvider theme={theme}>
      <title>Summary</title>
      <h1>Well done!</h1>
    </ThemeProvider>
  );
}

function doNextThing(setEmbedId, videoIdx, setVideoIdx, videoFinished, setVideoFinished) {

  const videoObj = {
    1: "jhsf1a4XG-U",
    2: "ypDwh2ShJ6A"
  }

  if (videoFinished === true) {
    videoIdx = videoIdx + 1;
    if (videoIdx in videoObj) {
      setVideoIdx(videoIdx);
      setEmbedId(videoObj[videoIdx]);
      setVideoFinished(false);
    } else {
      window.location.href = "/summary";
    }

  }
}

function App() {

  const [progress, setProgress] = useState(5.0);
  const [embedId, setEmbedId] = useState("JRvLn-A_2dM");
  const [videoFinished, setVideoFinished] = useState(true);
  const [videoIdx, setVideoIdx] = useState(0);

  useEffect(() => {
    doNextThing(setEmbedId, videoIdx, setVideoIdx, videoFinished, setVideoFinished);
  }, [videoFinished])

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/summary" component={() => <SummaryView />} />
          <Route path="/video" component={() => <VideoView progress={progress} embedId={embedId} setVideoFinished={setVideoFinished} />} />
          <Route path="/" component={() => <ProgressView progress={progress} />} />
        </Switch>

        <nav>
          <Link to="/">Progress</Link>
          <Link to="/video">Video</Link>
          <Link to="/summary">Summary</Link>
        </nav>
      </div>
    </Router >
  );
}

export default App;
