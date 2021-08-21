import { useContext } from 'react';
import { OverlayContext } from '../components/overlay/OverlayContext';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import './Home.css';
import { Paper, Typography } from '@material-ui/core'
import { alpha, makeStyles } from '@material-ui/core/styles'
import Countdown from 'react-countdown'

const useStyles = makeStyles((theme) => {
  // console.log(theme)
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

function Home() {
  const classes = useStyles();
  const overlay = useContext(OverlayContext)

  const openWindowSetting = () => {
    let querystring = String(window.location.search)
    let joiner = (querystring.indexOf("?") !== -1) ? "&" : "?"
    querystring = `${querystring}${joiner}`
    let href = window.location.href
    window.open(`${href}settings`, "", "width=630,height=870,location=no,menubar=yes");
  }


  return (
    <Paper className={classes.root} variant="outlined" elevation={3}>
      <div className={classes.msgRoot}>
        <Typography variant="p">
          Gaol:
          <span> </span>
          <Typography variant="subtitle1" className={classes.order} display="inline">{overlay.order || "N/A"}</Typography>
          <span> </span>
          {!!overlay.order && (
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
        <Typography variant="body2" className={classes.msg} color="error">{overlay.errMsg || ''}</Typography>
      </div>
      <div>
        <IconButton aria-label="setting" size="small" onClick={() => openWindowSetting()}>
          <SettingsIcon />
        </IconButton>
      </div>
    </Paper>
  );
}

export default Home;
