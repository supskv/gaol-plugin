import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

import PartyPanel from '../components/UI/PartyPanel'
import About from '../components/UI/About'
import ImXExport from '../components/UI/ImXExport'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Setting() {
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    root: {
      background: theme.palette.background.default,
      height: 'inherit',
    },
    // background: {
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   width: '100%',
    //   height: '100%',
    //   zIndex: 0,
    //   background: theme.palette.background.default,
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   opacity: 1,
    // }
    tabpanel: {
      height: '100vh',
    }
  }))
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  const handleChangeIndex = (index) => {
    setValue(index)
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Import/Export" {...a11yProps(1)} />
          <Tab label="About" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction} className={classes.tabpanel}>
          <PartyPanel />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} className={classes.tabpanel}>
          <ImXExport />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction} className={classes.tabpanel}>
          <About />
        </TabPanel>
      </SwipeableViews>
    </div>
  )
}

export default Setting