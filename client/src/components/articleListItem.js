import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';


export default class artilceListIem extends PureComponent{
  pathId = this.props;
  theArticle = this.props.allArticles.find(x => {
    return x.id===Number(this.props.cur)
  });
  render(){
    return(
      <>
        <Link className="article-list-item" to={`/articles/${this.theArticle.id}`}>
          <h3>{this.theArticle.title}</h3>
          <p>{this.theArticle.content[0].substr(0,150)}...</p>
        </Link> 
      </>
    )
  }
};