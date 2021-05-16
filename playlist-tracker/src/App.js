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
  const timeout = 10000 //10 seconds
  setTimeout(() => {
    window.location.href = "/video";
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
        <YoutubeEmbed embedId="JRvLn-A_2dM" />
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

  const [progress, setProgress] = useState(5.0);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/summary" component={() => <SummaryView />} />
          <Route path="/video" component={() => <VideoView progress={progress} />} />
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
