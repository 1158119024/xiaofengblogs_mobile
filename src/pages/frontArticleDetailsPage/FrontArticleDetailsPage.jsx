import React, { Component } from 'react';
import { observer } from "mobx-react"
import { observable, action, runInAction } from "mobx"
import moment from 'moment';
import {withRouter} from "react-router-dom";
import {Toast} from "antd-mobile";


import {getArticleAndPreAndNextById, getArticles} from "../../api/article";
import {DATE_FORMAT, getColor} from "../../config/constants";
import './frontArticleDetailsPage.css';
import {CustomIcon} from "../../config/iconfont";
import {front} from "../../config/routeConstant";


class FrontArticleDetailsPageState {
  @observable data = {};
  @observable id = 0;

  @action
  setData = (data) => {
    this.data = data;
  };

  @action
  setId = (id) => {
    this.id = id;
  };

  @action
  getArticleDetailsById = () => {
    Toast.loading("loading", 0);
    getArticleAndPreAndNextById({ id: this.id }).then(res => {
      runInAction("获取用户文章详细信息", () => {
        Toast.hide();
        this.data = res.data.data;
        console.log(this.data);
      });
    });
  }
}

const detailsState = new FrontArticleDetailsPageState();

@observer
class FrontArticleDetailsPage extends Component {

  componentWillMount() {
    const { id } = this.props.match.params;
    detailsState.setId(id);
    detailsState.getArticleDetailsById();
  }

  componentWillReceiveProps = (props) => {
    const { id } = props.match.params;
    if (id && id !== detailsState.id) {
      detailsState.setId(id);
      detailsState.getArticleDetailsById();
    }
  };

  articleContentHandle = (content) => {
    if( content ){
      content = content.replace(/font-size:(\d\d)px/g, "")
        .replace(/<code>/g, "<code style='overflow-y: auto; display: block'>")
        .replace(/background-color:#ffffff/g, "");
      return content;
    }
    return '';
  };

  // 跳转上下一篇
  handleArticleClick = (id) => {
    const { history } = this.props;
    history.push(`${front}/details/${id}`);
  };

  render() {
    console.log(detailsState.data);
    return (
        <div>
          <div className="article-details-header">
            <span className="article-title">{detailsState.data.title}</span>
            <div className="article-tags">
              <CustomIcon style={{ marginRight: '10px', color: '#666' }} size="xxl" type="biaoqian2" />
              {
                detailsState.data.tagList && detailsState.data.tagList.map((item, index) => (
                  <span key={item.id} className="card-item-footer-tag" style={getColor(item.tagName)}>{item.tagName}</span>
                ))
              }
              <div style={{ float: 'right' }}>
                <CustomIcon style={{ marginRight: '7px' }} size="xl" type="fuhao-yuedu" />
                <span>{detailsState.data.browseNum}</span>
              </div>
            </div>
          </div>

          <div className="article-details-content">
            <hr/>
            <div className="article-content" dangerouslySetInnerHTML={{ __html: this.articleContentHandle(detailsState.data.content) }}></div>
            <div className="article-details-content-time">
              <CustomIcon style={{ marginRight: '10px' }} size="xl" type="Group" />
              <span>{moment(detailsState.data.createTime).format(DATE_FORMAT)}</span>
            </div>
            <hr/>
            <div className="article-details-content-footer">
              <div className="article-details-content-footer-opt">
                {
                  detailsState.data.prevArticleEntity ?
                    <div
                      className="article-details-content-footer-div article-details-content-footer-pre"
                      onClick={this.handleArticleClick.bind(this, detailsState.data.prevArticleEntity.id)}
                    >
                      <CustomIcon type="tikushaonv-shangxiayige" />
                      <span className="content-footer">
                      {detailsState.data.prevArticleEntity.title}
                    </span>
                    </div>
                    : ''
                }

                {
                  detailsState.data.nextArticleEntity ?
                    <div
                      className="article-details-content-footer-div article-details-content-footer-next"
                      onClick={this.handleArticleClick.bind(this, detailsState.data.nextArticleEntity.id)}
                    >
                    <span className="content-footer">
                      {detailsState.data.nextArticleEntity.title}
                    </span>
                      <CustomIcon type="xiayige" />
                    </div>
                    : ''
                }
              </div>
            </div>
          </div>
          <div className="article-details-footer">

          </div>
        </div>
    );
  }
}

export default withRouter(FrontArticleDetailsPage);
