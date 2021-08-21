import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import GetAppIcon from '@material-ui/icons/GetApp'
import BackupIcon from '@material-ui/icons/Backup'
import { Button } from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { OverlayContext } from '../overlay/OverlayContext'
import * as convert from 'xml-js'
import * as utilConvert from '../../utils/xml-js'
import CharacterRow from './CharacterRow'
import * as Config from '../../config'

const useStyles = makeStyles((theme) => ({
  actionDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelBtn: {
    margin: '0px 10px',
  },
  dnone: {
    display: 'none'
  },
}));


function PartyPanel() {
  const overlay = React.useContext(OverlayContext)
  const [isReset, setIsReset] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectMe, setSelectMe] = React.useState(-1)
  const [players, setPlayers] = React.useState([''])
  const importFile = React.useRef(null)
  const tempExportLink = React.useRef(null)

  React.useEffect(() => {
    const fetchPlayers = async () => {
      const ugc = await Config.getConfig('gaol')

      if (ugc) {
        setPlayers(ugc.players)
        setSelectMe(ugc.meIndex)
      }
    }

    fetchPlayers()
  }, [isReset])

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const newMemberHandle = () => {
    handleMenuClose()
    if (players.length < Config.party.max.fullParty) {
      setPlayers(prev => [...prev, ""])
    }
  }

  const removeMemberHandle = (i) => {
    handleMenuClose()
    setPlayers(prev => prev.filter((p, pi) => pi !== i))
  }

  const onCLickImport = () => {
    importFile.current.click()
  }

  const importHandle = (event) => {
    event.stopPropagation()
    event.preventDefault()
    handleMenuClose()
    let file = event.target.files[0]
    let reader = new FileReader()
    reader.onload = function (event) {
      try {
        // The file's text will be printed here
        const xml = event.target.result
        let result = convert.xml2js(xml)
        if (!result) throw `The reault of file\'s content is invalid, result: ${result}`;
        let playerElements = result.elements[0].elements
        let nplayers = playerElements.map(item => item.elements[0].text)
        setPlayers(nplayers)
      } catch (e) {
        alert("Cannot import XML file, please try again.")
        console.error(e)
      }
    }

    reader.readAsText(file)
  }

  const onClickExport = async () => {
    try {
      handleMenuClose()
      let userGaolConfig = await Config.getConfig('gaol')
      let nplayers = userGaolConfig.players
      let jsonXML = utilConvert.array2PriorityJsonXML(nplayers)
      let xml = convert.js2xml(jsonXML)
      const file = new Blob([xml], { type: 'text/xml' })
      // const element = document.createElement("a")
      // element.href = URL.createObjectURL(file)
      // element.download = "Priority.xml"
      // document.body.appendChild(element) // Required for this to work in FireFox
      // element.click()

      const blobToDataURL = (blob, callback) => {
        var fileReader = new FileReader();
        fileReader.onload = function (e) { callback(e.target.result); }
        fileReader.readAsDataURL(blob);
      }

      blobToDataURL(file, (url) => {
        tempExportLink.current.href = url
        tempExportLink.current.innerText = url
        tempExportLink.current.download = "Priority.xml"
        tempExportLink.current.click()
      })
    } catch (e) {
      console.error(e)
    }
  }

  const onInput = (value, i) => {
    const nplayers = players.map((v, pi) => {
      if (pi === i) return value
      return v
    })
    setPlayers(nplayers)
  }

  const onChangeSelectMe = (value) => {
    setSelectMe(value)
  }

  const saveConfig = async () => {
    await Config.updatePlayersNMe(players, selectMe)
    await overlay.fetchUserConfig()
    overlay.setErrMsg('')
    alert("Saved successful.")
  }

  const resetConfig = () => {
    setIsReset(prev => !prev)
  }

  const getPartyType = () => {
    const { fullParty } = Config.party.max
    const n = players.length
    if (n === fullParty) {
      return "Full Party"
    } 
    return "Light Party"
  }

  const partyType = getPartyType()
  const classes = useStyles();
  const menuList = [
    { title: 'New', icon: <LibraryAddIcon fontSize="small" />, action: newMemberHandle, disabled: players.length >= Config.party.max.fullParty },
    { title: 'Import', icon: <BackupIcon fontSize="small" />, action: onCLickImport },
    { title: 'Export', icon: <GetAppIcon fontSize="small" />, action: onClickExport, disabled: true, display: true },
  ]

  return (
    <div>
      <Card style={{ paddingBottom: 0 }}>
        <CardHeader
          action={
            <IconButton onClick={handleMenuClick} aria-controls="simple-menu" aria-haspopup="true" aria-label="more">
              <MoreVertIcon />
            </IconButton>
          }
          title={`${partyType}`}
          titleTypographyProps={{
            variant: 'h6',
          }}
          subheader="The ones who are suffering in UwU."
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {menuList.map((obj, i) => {
            return (obj.display !== undefined ? obj.display : true) ? (
              <MenuItem
                key={i}
                onClick={obj.action}
                disabled={obj.disabled !== undefined ? obj.disabled : false}
              >
                <ListItemIcon>{obj.icon}</ListItemIcon>
                <ListItemText primary={obj.title} />
              </MenuItem>
            ) : ('')
          })}
        </Menu>
        <CardContent>
          {players.map((n, i) => (
            <CharacterRow
              key={i}
              selectMe={selectMe}
              index={i}
              name={n}
              onChangeSelectMe={onChangeSelectMe}
              onTextInput={onInput}
              removeHandle={removeMemberHandle}
              hiddenAction={players.length <= 1}
            />
          ))}
          {/* <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
          <FormControlLabel value="0" control={<Radio />} label={<CharacterInfo />} />
        </RadioGroup> */}
        </CardContent>
      </Card>
      <div className={classes.actionDiv}>
        <Button variant="contained" color="secondary" className={classes.cancelBtn} onClick={resetConfig}>Reset</Button>
        <Button variant="contained" color="primary" onClick={saveConfig}>Save</Button>
      </div>
      <input type="file" id="import" ref={importFile} className={classes.dnone} onChange={importHandle} />
      {/* <a href="#" id="tem_link" ref={tempExportLink}>sssss</a> */}
    </div>
  )
}

export default PartyPanel