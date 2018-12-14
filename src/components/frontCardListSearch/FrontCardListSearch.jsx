import React, { Component } from 'react';
import { PullToRefresh, SearchBar, WhiteSpace, Pagination, Icon } from "antd-mobile";
import { withRouter, Link } from "react-router-dom";
import { observer } from "mobx-react"
import { observable, action, runInAction } from "mobx"
import moment from 'moment';

import {CustomIcon} from "../../config/iconfont";
import PropTypes from "prop-types";
import {DATE_FORMAT, getColor} from "../../config/constants";
import {front} from "../../config/routeConstant";

const cardList = [
  {
    id: 0,
    title: "啦啦啦啦啦啦啦",
    titleUrl: "",
    titleUrlBlack: true, // url是否重开一个页面，true重开
    date: "",
    content: "这是内容3",
    isTop: true,
    tags: [
      {
        tagName: "标签名",
        tagId: 0,
      }
    ]
  }
];

class FrontCardListSearchState {
  @observable refreshing = false;
  @observable height = document.documentElement.clientHeight;
  @observable showSearch = false; // 是否显示搜索
  @observable pageInfo = {}; // 卡片内容：list + page
  @observable isNone = false; // 是否已经到底了（没有数据了）
  @observable type = ""; // 当前页面的内容（collect还是article）


  @action
  setRefreshing = (refreshing) => {
    this.refreshing = refreshing;
  };

  @action
  setShowSearch = (showSearch) => {
    this.showSearch = showSearch;
  };

  @action
  setPageInfo = (pageInfo) => {
    this.pageInfo = pageInfo;
  };

  @action
  setIsNone = (isNone) => {
    this.isNone = isNone;
  };

  @action
  setMore = (refreshing, showSearch) => {
    this.setRefreshing(refreshing);
    this.setShowSearch(showSearch);
  };

  @action
  setType = (type) => {
    this.type = type;
  };
}

const cardState = new FrontCardListSearchState();

@observer
class FrontCardListSearch extends Component {

  static propTypes = {
    pageInfo: PropTypes.object.isRequired, // 卡片内容
    nextPageData: PropTypes.func.isRequired, // 下一页数据
    bool: PropTypes.bool, // 是否拼接
    handleClickTag: PropTypes.func, // 点击标签时
    searchHandle: PropTypes.func,
  };

  componentWillReceiveProps = (props) => {
    const { bool } = props;
    let pageInfo = props.pageInfo;
    // bool为true 拼接
    if( bool ){
      if(cardState.pageInfo.list){
        pageInfo.list = [...cardState.pageInfo.list && cardState.pageInfo.list, ...pageInfo.list];
      }
    }else{
      // 如果不同则重置
      cardState.setIsNone(false);
    }

    cardState.setPageInfo(pageInfo);
  };

  tagClickHandle = (tagId, tagName, articleNum) => {
    // if( cardState.type === "collect" || cardState.type === "tagCollect" ){
    //   this.props.history.push(`${front}/tagCollect/${tagId}/${tagName}/${articleNum}`);
    // } else {
    //   this.props.history.push(`${front}/tagArticle/${tagId}/${tagName}/${articleNum}`);
    // }
    this.props.handleClickTag(tagId);
  };

  searchHandle = (value) => {
    this.props.searchHandle(value);
  };

  render() {
    return (
      <PullToRefresh
        damping={100}
        ref={el => this.ptr = el}
        style={{
          height: cardState.height - 500,
          overflow: 'auto',
        }}
        indicator={{ activate: '您好！', release: '正在为您准备...', finish: '好的！' }}
        direction={'up'}
        refreshing={cardState.refreshing}
        onRefresh={() => {
          cardState.setRefreshing(true);
          /*setTimeout(() => {
            cardState.setRefreshing(false);
          }, 500);*/
          if( !cardState.isNone ){
            if( cardState.pageInfo.nextPage !== 0 ){
              this.props.nextPageData(cardState.pageInfo.nextPage);
            }else {
              cardState.setIsNone(true);
            }
          }
          cardState.setRefreshing(false);
        }}
      >
        <SearchBar placeholder="客官需要点什么？？？" onChange={this.searchHandle}/>
        <div className="card-list">
        {
          cardState.pageInfo.list && cardState.pageInfo.list.map((item, index) => (
            <div key={index}>
              <WhiteSpace size="lg" />
              <div className="card-item">
                {
                  item.isTop ?
                    <div className="card-item-top">
                      <CustomIcon size="xxxl" type="zhiding4" />
                    </div> : ''
                }
                <header className="card-item-header">
                  {/*<span className="card-item-header-title">{item.title}</span>*/}
                  {
                    item.titleUrlBlack ?
                      <a className="card-item-header-title" href={item.titleUrl} target={item.titleUrlBlack ? "_blank" : ''}>{item.title}</a>
                      : <Link className="card-item-header-title" to={item.titleUrl} >{item.title}</Link>
                  }
                  {/*<a href={item.titleUrl} target={item.titleUrlBlack ? "_blank" : ''}>{item.title}</a>*/}
                  {/*<Link to={item.titleUrl} >{item.title}</Link>*/}
                  <div className="card-item-header-date">
                    <CustomIcon style={{ marginRight: '20px' }} size="xl" type="Group" />
                    {moment(item.date).format(DATE_FORMAT)}
                  </div>
                </header>
                <content className="card-item-content">
                  {item.content}
                </content>
                <footer className="card-item-footer">
                  <CustomIcon style={{ marginRight: '10px', color: '#666' }} size="xl" type="biaoqian2" />
                  {
                    item.tags ?
                      typeof(item.tags) === 'object' && !isNaN(item.tags.length) ?
                        item.tags.map((tagItem, tagIndex) => (
                          <span key={tagIndex} className="card-item-footer-tag" style={getColor(tagItem.tagName)} onClick={this.tagClickHandle.bind(this, tagItem.id, tagItem.tagName, tagItem.articleNum)}>{tagItem.tagName}</span>
                        ))
                        :
                        <span className="card-item-footer-tag" style={getColor(item.tags.tagName)} onClick={this.tagClickHandle.bind(this, item.tags.id, item.tags.tagName, item.tags.articleNum)}>{item.tags.tagName}</span>
                      : ''
                  }
                </footer>
              </div>
            </div>
          ))
        }
        </div>
        {
          cardState.isNone ? <div className="none">已经没有了呢，做人不能贪心哦( $ _ $ )。</div> : ''
        }
      </PullToRefresh>
    );
  }
}

export default withRouter(FrontCardListSearch);
