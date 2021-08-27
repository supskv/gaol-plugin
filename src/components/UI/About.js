import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Link } from '@material-ui/core'

function About() {
  const useStyles = makeStyles((theme) => ({
    spaceTop: {
      marginTop: '30px',
    },
  }))
  const classes = useStyles()
  return (
    <div>
      <Card style={{ paddingBottom: 0 }}>
        <CardContent>
          <Typography variant="h6" color="textSecondary">Gaol Overlay</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Developed by <Link color="primary" underline="none" href="https://na.finalfantasyxiv.com/lodestone/character/31961672/" target="_blank">Supskv</Link>.
          </Typography>
          <Typography variant="h6" color="textSecondary" className={classes.spaceTop}>Github</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            See the latest code, changelog, and readme on Github. You can also submit bug reports or feature requests.
          </Typography>
          <Link underline="none" href="https://github.com/supskv/gaol-plugin" target="_blank">https://github.com/supskv/gaol-plugin</Link>
          <Typography variant="subtitle2" color="textSecondary" className={classes.spaceTop}>
            version 0.1.20-alpha
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default About