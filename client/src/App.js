import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Topbar from './components/topbar/Topbar';
import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import Settings from './pages/settings/Settings';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Register from './pages/register/Register';
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          {user ? <Homepage /> : <Login />}
        </Route>
        <Route path='/register'>
          {user ? <Homepage /> : <Register />}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path='/write'>
          {!user ? <Login /> : <Write />}
        </Route>
        <Route path='/post'>
          <Single />
        </Route>
        <Route path='/settings'>
          {!user ? <Login /> : <Settings />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
