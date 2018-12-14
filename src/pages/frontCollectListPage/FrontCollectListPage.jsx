import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { observer } from "mobx-react"
import { observable, action, runInAction } from "mobx"
import {getCollects} from "../../api/collect";
import {collectListToCardList} from "../../components/cardFormatConver";
import FrontCardListSearch from "../../components/frontCardListSearch/FrontCardListSearch";
import {Toast} from "antd-mobile";

class FrontCollectListPageState {
  @observable data = {};
  @observable pageNum = 1;
  @observable tagId;
  @observable bool = false;
  @observable searchTitle; // 搜索的标题

  @action
  getCollectsAction = (bool = false) => {
    Toast.loading("loading", 0);
    getCollects({ pageNum: this.pageNum, tagId: this.tagId, title: this.searchTitle }).then(res => {
      runInAction("获取用户收藏列表信息", () => {
        Toast.hide();
        this.data = res.data.data;
        this.bool = bool;
        console.log(this.data);
      });
    });
  };

  @action
  setPageNum = (pageNum) => {
    this.pageNum = pageNum;
  };
  @action
  setTagId = (tagId) => {
    this.tagId = tagId;
  };

  @action
  setSearchTitle = (searchTitle) => {
    this.searchTitle = searchTitle;
  };
}

const collectState = new FrontCollectListPageState();

@observer
class FrontCollectListPage extends Component {

  componentWillMount() {
    collectState.setPageNum(1);
    collectState.setTagId();
    collectState.getCollectsAction();
  }

  // props发生改变时重置
  componentWillReceiveProps = (props) => {
    collectState.setPageNum(1);
    collectState.setTagId();
    collectState.getCollectsAction();
  };

  nextPageData = (pageNum) => {
    collectState.setPageNum(pageNum);
    collectState.getCollectsAction(true);
  };

  handleClickTag = (tagId) => {
    if( tagId === collectState.tagId ){
      collectState.setPageNum(1);
      collectState.setTagId(tagId);
    }else{
      collectState.setPageNum(1);
      collectState.setTagId(tagId);
      collectState.getCollectsAction(false);
    }
  };

  // 搜索
  searchHandle = (searchTitle) => {
    collectState.setPageNum(1);
    collectState.setSearchTitle(searchTitle);
    collectState.getCollectsAction(false);
  };

  render() {
    console.log(collectState.data && collectState.data.list)
    return (
        <div>
          <FrontCardListSearch
            pageInfo={collectListToCardList(collectState.data)}
            nextPageData={this.nextPageData}
            handleClickTag={this.handleClickTag}
            searchHandle={this.searchHandle}
            bool={collectState.bool}
          />
        </div>
    );
  }
}

export default withRouter(FrontCollectListPage);
