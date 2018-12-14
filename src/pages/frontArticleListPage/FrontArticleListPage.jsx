import React, { Component } from 'react';
import { observer } from "mobx-react"
import { observable, action, runInAction } from "mobx"
import {PullToRefresh, Button, SearchBar, WingBlank, Toast} from 'antd-mobile';

import { getArticles } from '../../api/article';
import FrontCardList from "../../components/frontCardList/FrontCardList";
import {withRouter} from "react-router-dom";
import FrontCardListSearch from "../../components/frontCardListSearch/FrontCardListSearch";
import {articleListToCardList} from "../../components/cardFormatConver";

class FrontArticleListPageState {
  @observable data = {};
  @observable pageNum = 1;
  @observable archivesTime; // 归档时间
  @observable tagId; // 标签id
  @observable bool = false; // 是否拼接
  @observable searchTitle; // 搜索的标题

  @action
  getArticlesAction = (bool = false) => {
    Toast.loading("loading", 0);
    getArticles({ pageNum: this.pageNum, archivesTime: this.archivesTime, tagId: this.tagId, title: this.searchTitle }).then(res => {
      runInAction("获取用户文章列表信息", () => {
        Toast.hide();
        this.data = res.data.data;
        this.bool = bool;
      });
    });
  };

  @action
  setPageNum = (pageNum) => {
    this.pageNum = pageNum;
  };

  @action
  setArchivesTime = (archivesTime) => {
    this.archivesTime = archivesTime;
  };

  @action
  setTagId = (tagId) => {
    this.tagId = tagId;
  };

  @action
  setSearchTitle = (searchTitle) => {
    this.searchTitle = searchTitle;
  };

  @action
  resetParams = (tagId, pageNum, archivesTime) => {
    this.tagId = tagId;
    this.pageNum = pageNum;
    this.archivesTime = archivesTime;
  }
}

const articleState = new FrontArticleListPageState();

@observer
class FrontArticleListPage extends Component {

  componentWillMount() {
    const { archivesTime } = this.props.match.params;
    articleState.resetParams('',1 , archivesTime);
    articleState.setSearchTitle();
    articleState.getArticlesAction();
  }

  // props发生改变时重置
  componentWillReceiveProps = (props) => {
    articleState.resetParams('',1 , '');
    articleState.getArticlesAction();
  };

  // 下一页
  nextPageData = (pageNum) => {
    articleState.setPageNum(pageNum);
    articleState.getArticlesAction(true);
  };

  // 点击标签时
  handleClickTag = (tagId) => {
    if( tagId === articleState.tagId ){
      articleState.resetParams(tagId,1 , '');
    }else{
      articleState.resetParams(tagId,1 ,'');
      articleState.getArticlesAction(false);
    }
  };

  // 搜索
  searchHandle = (searchTitle) => {
    articleState.setPageNum(1);
    articleState.setSearchTitle(searchTitle);
    articleState.getArticlesAction(false);
  };

  render() {
    console.log(articleState.data && articleState.data.list);
    return (
        <div>
          <FrontCardListSearch
            pageInfo={articleListToCardList(articleState.data)}
            nextPageData={this.nextPageData}
            handleClickTag={this.handleClickTag}
            searchHandle={this.searchHandle}
            bool={articleState.bool}
          />
        </div>
    );
  }
}

export default withRouter(FrontArticleListPage);
