import React from 'react';
import ReactDOM from 'react-dom'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline"
import './index.css';
import App from './App';
import * as Config from './config'
import { store } from './app/store'
import { Provider } from 'react-redux'
import * as GaolService from './features/gaol/gaolService'

// Config.boostrap()

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
