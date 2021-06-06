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
import ls from 'local-storage'

import courseData from "./data.json";

var data;
try {
  data = ls.get('coursedata');
}
catch (e) {
  console.log('No started course found, loading new course');
  data = courseData;
}

if (data == null) {
  data = courseData;
  console.log('No started course found, loading new course');
}

const sessionIdx = data.findIndex(function (el) { return el.watched == false });
console.log("Session idx: ", sessionIdx);

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

const ImageList = (props) => {
  const urls = data[sessionIdx].videos.thumbnails
  const images = urls.map((url) => {
    return <img key={url} src={url} alt={url} />;
  });

  return <div className="image-list">{images}</div>;
};

Date.prototype.getDateWithoutTime = function () {
  return new Date(this.toDateString());
}

function countStreak() {
  let day = new Date(data[sessionIdx - 1].watched).getDateWithoutTime();
  let streak = 0;
  for (let idx = sessionIdx - 1; idx >= 0; idx--) {
    let dayPrev = new Date(data[idx].watched).getDateWithoutTime();
    console.log(idx, data[idx].watched, dayPrev);
    if (day - dayPrev == 86400000 || day - dayPrev == 0) {
      streak++;
      day = dayPrev;
    }
    else {
      break;
    }
  }
  return streak;
}

const Achievements = (props) => {

  const days = countStreak();

  return (
    <div class="achievement">
      <div class="image">
        <img src="/diamond.svg"></img>
      </div>
      <div class="text">
        <h2>{days} Day Streak!</h2>
      </div>
    </div>
  )
}

function ProgressView(props) {
  const timeout = 10000 //10 seconds
  setTimeout(() => {
    console.log(window.location)
    if (window.location.pathname == "/") {
      window.location.href = "/video";
    }
  }, timeout);
  const sessionName = data[sessionIdx].name;
  const thumbnails = data[sessionIdx].videos.thumbnails;
  return (
    <ThemeProvider theme={theme}>
      <title>Progress</title>
      <h1>{sessionName}</h1>
      <ImageList />
    </ThemeProvider >
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
      <Achievements />
    </ThemeProvider>
  );
}

function doNextThing(setEmbedId, videoIdx, setVideoIdx, videoFinished, setVideoFinished) {
  console.log(data);
  console.log(window.location.pathname)
  if (window.location.pathname == "/summary") {
    return
  }
  if (videoFinished === true) {
    if (videoIdx >= 0) {
      data[sessionIdx].videos.watched[videoIdx] = Date.now();
    }
    videoIdx = videoIdx + 1;
    if (videoIdx < data[sessionIdx].videos.id.length) {
      setVideoIdx(videoIdx);
      setEmbedId(data[sessionIdx].videos.id[videoIdx]);
      setVideoFinished(false);
      ls.set('coursedata', data)
    } else {
      data[sessionIdx].watched = Date.now();
      ls.set('coursedata', data)
      window.location.href = "/summary";
    }

  }
}

function App() {

  const [progress, setProgress] = useState(5.0);
  const [embedId, setEmbedId] = useState("");
  const [videoFinished, setVideoFinished] = useState(true);
  const [videoIdx, setVideoIdx] = useState(-1);

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
      </div>
    </Router >
  );
}

export default App;
