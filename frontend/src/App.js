import React from 'react';
import './css/App.css';

import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router'; 

import Navbar from './components/Navbar';
import HomePage from './components/Homepage';
import InsPage from './components/InsPage';
import InsDetailPage from './components/InsDetailPage';
import ProfilePage from './components/ProfilePage';

class App extends React.Component {
  render() {
    return (
      <div className="App"> 
        <Navbar />
          <BrowserRouter>
            <Route path='/' component={HomePage} exact />
            <Route path='/ins' component={InsPage} exact />
            <Route path='/ins/:insid' component={InsDetailPage} exact />
            <Route path='/profile' component={ProfilePage}/>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
