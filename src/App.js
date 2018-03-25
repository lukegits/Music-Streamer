import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Album from './components/Album';
import Landing from './components/Landing';
import Library from './components/Library';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header>
      <nav>
          <Link to='/' className="landinglink">Landing </Link>
          <Link to='/Album' className="landinglink">Album </Link>
          <Link to='/library' className="landinglink">Library </Link>
        </nav>
           <h1>Bloc Jams</h1>
         </header>
         <main>
         <Route exact path="/" component={Landing} />
         <Route path="/Albums" component={Album} />
        <Route path="/library" component={Library} />
        <Route path="/album/:slug" component={Album} />

         </main>
      </div>
    );
  }
}

export default App;
