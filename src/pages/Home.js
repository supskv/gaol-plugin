import { useContext } from 'react';
import { OverlayContext } from '../components/overlay/OverlayContext';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import './Home.css';

// async function sleep (time) {
//   return new Promise((resolve) => setTimeout(resolve, time));
// }

function Home() {
  const overlay = useContext(OverlayContext)

  const openWindowSetting = () => {
		let querystring = String(window.location.search)
		let joiner      = (querystring.indexOf("?") !== -1) ? "&" : "?"
		querystring = `${querystring}${joiner}`
    let href = window.location.href
		window.open(`${href}settings`, "", "width=680,height=860,location=no,menubar=yes");
  }

  return (
    <div className="App">
      <header className="App-header">
        Your gaol: {overlay.order || "N"}
        <IconButton aria-label="setting" onClick={() => openWindowSetting()}>
            <SettingsIcon />
        </IconButton>
      </header>
    </div>
  );
}

export default Home;
