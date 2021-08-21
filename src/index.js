import React from 'react';
import ReactDOM from 'react-dom'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline"
import './index.css';
import App from './App';
import Overlay from './components/overlay/OverlayContext'
import * as Config from './config'

Config.boostrap()

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Overlay>
        <App />
      </Overlay>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
