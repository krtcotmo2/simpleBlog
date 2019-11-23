import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faCoffee} from '@fortawesome/free-solid-svg-icons';
import { log } from "util";

library.add(faThumbsUp, faCoffee);

const upVoteSection = ({articleID, votes, setArticleInfo}) => {

  const upvoteArticle = async () => {
    const data = { upVotes: votes+1 };
    const result = await fetch(`/api/articles/v2/${articleID}/upvote`, {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const body = await result.json();
    setArticleInfo(body);
  }
  return(
    <>      
      <p><strong>Up Voted:</strong> {votes === null ? `` : `${votes} times`} <button onClick={() => upvoteArticle()} ><FontAwesomeIcon icon="thumbs-up"/> Add Upvote</button></p>  
    </>
  );
}

export default upVoteSection;