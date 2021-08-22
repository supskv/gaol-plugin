import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import { Paper, Typography } from '@material-ui/core'
import { alpha, makeStyles } from '@material-ui/core/styles'
import Countdown from 'react-countdown'

import { connect as gaolConnect, disconnect as gaolDisconnect } from "./gaolAdapter"
import * as gaolService from './gaolService'
import {
  selectNumber,
  fetchUserConfig,
  updateGaol,
  selectError,
} from './gaolSlice'
import './Gaol.css'


const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '5px 8px',
      background: alpha('#000000', 0.5),
      // background: alpha(theme.palette.background.default, 0.8),
      // borderRadius: '10%',
    },
    msgRoot: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    msg: {
      fontSize: '9px',
    },
    order: {
      color: theme.palette.success.main,
    },
    timer: {
      fontSize: '10px',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }
});

function Gaol() {
  const number = useSelector(selectNumber)
  const errorMsg = useSelector(selectError)
  const classes = useStyles();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserConfig())
    const listeners = [
      { name: 'LogLine', event: gaolEvent },
    ]
    gaolConnect(listeners)
    return () => gaolDisconnect(listeners)
  }, [])

  const gaolEvent = useCallback((data) => {
    const { rawLine } = data
    if (!gaolService.isGaolLog(rawLine)) return
    dispatch(fetchUserConfig()).then(() => {
      dispatch(updateGaol(rawLine))
    })
  }, [])


  const openWindowSetting = () => {
    let querystring = String(window.location.search)
    let joiner = (querystring.indexOf("?") !== -1) ? "&" : "?"
    querystring = `${querystring}${joiner}`
    let href = window.location.href
    window.open(`${href}settings`, "", "width=630,height=870,location=no,menubar=yes");
  }

  const toNumberString = () => {
    if (number > -1) {
      return number || "Eating Titan's ass."
    }
    return "N/A"
  }

  const isCountdown = () => {
    if (number > -1) {
      return true
    }
    return false
  }


  return (
    <Paper className={classes.root} variant="outlined" elevation={3}>
      <div className={classes.msgRoot}>
        <Typography variant="p">
          Gaol:
          <span> </span>
          <Typography variant="subtitle1" className={classes.order} display="inline">{toNumberString()}</Typography>
          <span> </span>
          {isCountdown() && (
            <Countdown
              date={Date.now() + 10000}
              intervalDelay={0}
              precision={2}
              renderer={props => (
                <Typography variant="subtitle1" className={classes.timer} display="inline">
                  {`${props.seconds}.${props.milliseconds}`}
                </Typography>
              )}
            />
          )}
        </Typography>
        <Typography variant="body2" className={classes.msg} color="error">{errorMsg || ''}</Typography>
      </div>
      <div>
        <IconButton aria-label="setting" size="small" onClick={() => openWindowSetting()}>
          <SettingsIcon />
        </IconButton>
      </div>
    </Paper>
  );
}

export default Gaol;
