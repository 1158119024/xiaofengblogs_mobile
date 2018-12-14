
/* 文章list转cardList */
import {front} from "../config/routeConstant";

export const articleListToCardList = (pageInfo) => {
  let page = {};
  let cardList = [];
  if( !pageInfo || !pageInfo.list ){
    return {};
  }
  const articleList = pageInfo.list;
  for( let i = 0, len = articleList.length; i < len; i++ ){
    let article = articleList[i];
    let cardObj = {};
    cardObj.id = article.id;
    cardObj.title = article.title;
    cardObj.titleUrl = `${front}/details/${article.id}`;
    cardObj.titleUrlBlack = false;
    cardObj.date = article.createTime;
    cardObj.content = article.content;
    cardObj.isTop = article.isTop;
    cardObj.tags = article.tagList;
    cardList.push(cardObj);
  }
  page.list = cardList;
  page.pageNum = pageInfo.pageNum;
  page.nextPage = pageInfo.nextPage;
  page.lastPage = pageInfo.lastPage;
  return page;
};

/* 收藏list转cardList */
export const collectListToCardList = (pageInfo) => {
  let page = {};
  let cardList = [];
  if( !pageInfo || !pageInfo.list ){
    return {};
  }
  const collectList = pageInfo.list;
  for( let i = 0, len = collectList.length; i < len; i++ ){
    let article = collectList[i];
    let cardObj = {};
    cardObj.id = article.id;
    cardObj.title = article.title;
    cardObj.titleUrl = article.url;
    cardObj.titleUrlBlack = true;
    cardObj.date = article.createTime;
    cardObj.content = article.readme;
    cardObj.isTop = article.isTop;
    cardObj.tags = article.tagsEntity;
    cardList.push(cardObj);
  }
  page.list = cardList;
  page.pageNum = pageInfo.pageNum;
  page.nextPage = pageInfo.nextPage;
  page.lastPage = pageInfo.lastPage;
  console.log(page);
  return page;
};
