import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'


function CustomMessage({ inputList }) {
  const useStyles = makeStyles((theme) => ({
    spaceTop: {
      marginTop: '30px',
    },
    inputRoot: {
      padding: '7px 6px',
    },
    inputMessage: {
      width: '75%',
    },
  }))
  const classes = useStyles()

  return (
    <Card style={{ paddingBottom: 0, marginTop: 20 }}>
      <CardHeader
        title={`Custom Message`}
        titleTypographyProps={{
          variant: 'h6',
        }}
      />
      <CardContent>
        {inputList.map((input, index) => (
          <div className={classes.inputRoot} key={index}>
            <TextField
              label={input.label}
              className={classes.inputMessage}
              variant="outlined"
              size="small"
              value={input.value}
              onChange={input.onChange}
            />
          </div>
        ))}
        <Typography variant="subtitle2" color="textSecondary" className={classes.spaceTop}>
          - The message is upto 20 characters
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CustomMessage