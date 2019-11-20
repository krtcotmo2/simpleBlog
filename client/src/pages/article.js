import React, {useState, useEffect} from "react";
import CommentList from "../components/articleComments";
import CommentForm from "../components/commentForm";
import allArticles from "./article-content";
import ListArticles from "../components/articlesList";
import UpVoteSection from "../components/upVoteSection"
import FourOFour from "./fourOfour";

const Article = ({match}) => { 
  const pathId = match.params;
  const theArticle = allArticles.find(x => x.id === Number(pathId.id));
  const [articleInfo, setArticleInfo] = useState({ upVotes: null, comments: []});
  
  useEffect( () => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${pathId.id}`);
      const body = await result.json();
      setArticleInfo(body);
    }
    fetchData();
  },[pathId.id]);
  
  let cntr = 0;
  const otherArticles = allArticles.filter(x => {    
    if(cntr < 3 && x.articleID !== Number(pathId.id)){
      cntr++;
      return true;
    }
    return false;
  }, cntr);
  
    return(
      !theArticle ? 
      <FourOFour/> :
      <>
        <h1>{theArticle.title} </h1>
        <UpVoteSection setArticleInfo={setArticleInfo} articleID={pathId.id} votes={articleInfo.upVotes}/>
        {theArticle.content.map( (par, i) => {
          return(
            <p key={i}>{par}</p>
          ) 
        })} 
        <CommentList comments={articleInfo.comments}/>
        <CommentForm articleID={pathId.id} setArticleInfo={setArticleInfo}/>
        <h3>Related Articles</h3>
        <div className="row" style={{display:'flex', flexDirection:'row'}}>
          <ListArticles allArticles={otherArticles}/>
        </div>
      </>
    );
  
};

export default Article;