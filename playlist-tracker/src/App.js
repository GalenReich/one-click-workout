import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { LinearProgress, createMuiTheme, ThemeProvider } from '@material-ui/core';

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

function ProgressView() {
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

export default App;
