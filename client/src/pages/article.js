import React,{PureComponent} from "react";
import allArticles from "./article-content";
import ListArticles from "../components/articlesList";
import FourOFour from "./fourOfour"
export default class article extends PureComponent{  
  pathId = this.props.match.params;
  theArticle = allArticles.find(x => x.id === Number(this.pathId.id));
  cntr = 0
  otherArticles = allArticles.filter(x => {    
    if(this.cntr < 3 && x.id !== Number(this.pathId.id)){
      this.cntr++;
      return true;
    }
    return false;
  }, this.cntr);
  render(){
    return(
      !this.theArticle ? 
      <FourOFour/> :
      <>
        <h1>{this.theArticle.title} </h1>
        <p><strong>Date:</strong> {this.pathId.month.toString()}/{this.pathId.date.toString()}/{this.pathId.year.toString()}</p>
        {this.theArticle.content.map( (par, i) => {
          return(
            <p key={i}>{par}</p>
          ) 
        })}
        <h3>Related Articles</h3>
        <div className="row" style={{display:'flex', flexDirection:'row'}}>
          <ListArticles allArticles={this.otherArticles}/>
        </div>
      </>
    );
    };
};