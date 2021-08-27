import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
  characterRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '7px 6px',
  },
  no: {
    marginRight: '6px',
  }
}));

function CharacterRow({ name = "", selectMe, index, onChangeSelectMe, onTextInput, removeHandle, hiddenAction }) {

  const classes = useStyles();
  return (
    <div className={classes.characterRow}>
      <div>
        <Typography className={classes.no} variant="body2" component="span">{index + 1}</Typography>
        <Radio size="small" checked={selectMe === index} value={index} onChange={() => onChangeSelectMe(index)} />
        <TextField label="Character Name" value={name} type="text" variant="outlined" size="small" onChange={(e) => onTextInput(e.target.value, index)} />
      </div>
      {!hiddenAction && (
        <IconButton aria-label="remove" color="secondary" size="small" onClick={() => removeHandle(index)}>
          <DeleteIcon />
        </IconButton>
      )}
    </div>
  )
}

export default CharacterRow