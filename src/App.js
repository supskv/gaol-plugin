import Home from './pages/Home'
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
            <Home />
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
