import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./pages/home";
import NextPage from "./pages/nextPage";
import Article from "./pages/article";
import Articles from "./pages/articles";
import About from "./pages/about";
import FourOFour from "./pages/fourOfour";
import Navbar from "./components/navbar";



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div id="page-body"> 
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/next" component={NextPage} />
            <Route path="/articles/:id" component={Article} />
            <Route path="/articles" component={Articles} />
            <Route path="/about" component={About} />
            <Route component={FourOFour} />
          </Switch>    
        </div>
      </div>
    </Router>
  );
}

export default App;
