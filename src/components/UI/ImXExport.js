import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import LZString from 'lz-string'

import * as convert from 'xml-js'
import * as utilConvert from '../../utils/xml-js'
import local from '../../plugins/localForage'
import {
  updateConfig
} from '../../features/gaol/gaolSlice'

function ImXExport() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const useStyles = makeStyles((theme) => ({
    spaceTop: {
      marginTop: '30px',
    },
    actionDiv: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 10,
    },
    cancelBtn: {
      margin: '0px 10px',
    },
    importInput: {
      width: '100%',
    }
  }))
  const classes = useStyles()


  const textHandle = (e) => {
    setText(e.target.value)
    console.log(text)
  }

  const importHandle = () => {
    try {
      const xml = LZString.decompressFromEncodedURIComponent(text)
      let result = convert.xml2js(xml)
      if (!result) throw `The reault of the compress is invalid, result: ${result}`
      let playerElements = result.elements[0].elements
      let players = playerElements.map(item => item.elements[0].text)
      dispatch(updateConfig({ players }))
      alert('Imported Successful.')
    } catch (e) {
      alert("Cannot import, please try again.")
      console.error(e)
    }
  }

  const exportHandle = async () => {
    if (true) {
      const gaolUserConfig = await local.getItem('gaol')
      let nplayers = gaolUserConfig.players
      let jsonXML = utilConvert.array2PriorityJsonXML(nplayers)
      let xml = convert.js2xml(jsonXML)
      const encrypt = LZString.compressToEncodedURIComponent(xml)
      setText(encrypt)
    }
  }

  return (
    <div>
      <Card style={{ paddingBottom: 0 }}>
        <CardHeader
          title={`Import / Export`}
          titleTypographyProps={{
            variant: 'h6',
          }}
          // subheader="The ones who are suffering in UwU."
        />
        <CardContent>
          <TextField
            id="import-field"
            label="Paste text here"
            multiline
            rows={10}
            className={classes.importInput}
            variant="outlined"
            size="small"
            value={text}
            onChange={textHandle}
          />
          <div className={classes.actionDiv}>
            <Button variant="contained" color="secondary" className={classes.cancelBtn} onClick={importHandle}>Import</Button>
            <Button variant="contained" color="primary" onClick={exportHandle}>Export</Button>
          </div>
          <Typography variant="subtitle2" color="textSecondary" className={classes.spaceTop}>
            - Import: Paste the code and click on import
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            - Export: Generate code and copy to others
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default ImXExport