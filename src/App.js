import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import'./App.scss';
import Header from './components/Header/Header';
//pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import AuthRoute from './util/AuthRoute';

import { AuthProvider } from './context/auth';
import SinglePost from './components/SinglePost/SinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home}/>
          <AuthRoute path="/login" exact component={Login}/>
          <AuthRoute path="/register" exact component={Register}/>
          <Route path="/post/:postId" exact component={SinglePost} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
