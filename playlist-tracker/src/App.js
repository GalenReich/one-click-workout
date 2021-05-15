import './App.css';

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { LinearProgress, createMuiTheme, ThemeProvider } from '@material-ui/core';
import YoutubeEmbed from "./YoutubeEmbed";

var progress = 5;

const theme = createMuiTheme({
  overrides: {
    MuiLinearProgress: {
      root: {
        height: '5vh',
      },
    },
  },
});

function ProgressView() {
  const timeout = 10000 //10 seconds
  setTimeout(() => {
    window.location.href = "/video";
  }, timeout);
  return (
    <ThemeProvider theme={theme}>
      <title>Progress</title>
      <h1>Progress Screen</h1>
      <div className="Progress">
        <LinearProgress variant="determinate" value={progress} />
      </div>
    </ThemeProvider>
  );

}

function VideoView() {
  return (
    <ThemeProvider theme={theme}>
      <title>Video</title>
      <div className="Progress">
        <LinearProgress variant="determinate" value={progress} />
      </div>
      <div className="Youtube">
        <YoutubeEmbed embedId="JRvLn-A_2dM" playlistId="PLN99XDk2SYr63TcAMIkiBl3hnfa8GXR4l" />
        {/* <YoutubeEmbed embedId="PLN99XDk2SYr63TcAMIkiBl3hnfa8GXR4l" /> */}
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

function App() {

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Progress</Link>
            </li>
            <li>
              <Link to="/video">Video</Link>
            </li>
            <li>
              <Link to="/summary">Summary</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/summary" component={() => <SummaryView />} />
          <Route path="/video" component={() => <VideoView />} />
          <Route path="/" component={() => <ProgressView />} />
        </Switch>
      </div>
    </Router >
  );
}

export default App;
