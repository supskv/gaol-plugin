import Gaol from './features/gaol/Gaol'
import Setting from './pages/Setting'
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Gaol />
          </Route>
          <Route path="/settings">
            <Setting />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
