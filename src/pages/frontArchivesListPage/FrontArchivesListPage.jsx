import React, { Component } from 'react';
import { observer } from "mobx-react"
import { observable, action, runInAction } from "mobx"

import {CustomIcon} from "../../config/iconfont";
import {getColorRandom} from "../../config/constants";
import './frontArchivesListPage.css';
import {getArchivesByCreateTime} from "../../api/article";
import {Toast} from "antd-mobile";
import {withRouter} from "react-router-dom";
import {front} from "../../config/routeConstant";

class FrontArchivesListPageState {
  @observable data = [];

  @action
  getArchivesAction = () => {
    Toast.loading("loading", 0);
    getArchivesByCreateTime({}).then(res => {
      runInAction("获取用户归档信息", () => {
        Toast.hide();
        this.data = res.data.data;
        console.log(res.data)
      });
    })
  }
}

const archivesState = new FrontArchivesListPageState();

@observer
class FrontArchivesListPage extends Component {

  componentWillMount() {
    archivesState.getArchivesAction();
  }

  handleClick = (archivesTime) => {
    this.props.history.push(`${front}/article/${archivesTime}`);
  };

  render() {
    console.log(archivesState && archivesState.data);
    return (
        <div>
          {
            archivesState && archivesState.data.map((item, index) => (
              <div className="archives-item" key={index}>
                <div className="archives-header">
                  <CustomIcon style={{ marginRight: 10, color: '#666'}} size="xxl" type="guidang" />
                  <span className="archives-header-title"> 存档 ({item.year})</span>
                </div>
                <div className="archives-month-list">
                  {
                    item.list.map((monthItem, monthIndex) => (
                      <div className="archives-month-item" key={monthIndex} onClick={this.handleClick.bind(this, monthItem.createTime)}>
                        <CustomIcon className="archives-icon" size="xxxl" style={getColorRandom()} type="biaoqian3" />
                        <span className="archives-month-item-span">{`${monthItem.createTime.replace('-', '年')}月(${monthItem.count})`}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
    );
  }
}

export default withRouter(FrontArchivesListPage);
