import React, { PureComponent } from 'react';
import ArticleListItem from '../components/articleListItem'

export default class articleList extends PureComponent{
  render(){
    return(
      <>
      {this.props.allArticles.map((art, key) => {
        return <ArticleListItem allArticles={this.props.allArticles} cur={art.id} key={key}/>
      })}
      </>
    );
  };
};
