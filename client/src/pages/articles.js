import React from "react"
import allArticles from "./article-content";
import ArticleList from '../components/articlesList'

const articles = () =>(
    <>
      <h1>Articles</h1>
      <ArticleList allArticles={allArticles}></ArticleList>
    </>
  );
export default articles;