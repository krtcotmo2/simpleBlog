import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';


export default class navBar extends PureComponent{
  render(){
    return(
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/articles">Articles</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/next">Next</Link></li>
        </ul>
      </nav>
    )
  }
}
