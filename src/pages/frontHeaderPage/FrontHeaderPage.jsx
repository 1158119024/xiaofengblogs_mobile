import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { observer } from "mobx-react"
import { observable, action, runInAction } from "mobx"
import { PullToRefresh, Toast } from "antd-mobile";

import { getUserDetails } from '../../api/user';
import { CustomIcon } from "../../config/iconfont";
import {front, userDetails} from "../../config/routeConstant";


class FrontHeaderPageState {
  @observable data = {};
  @observable refreshing = false;

  @action
  initUserData = () => {

    getUserDetails().then((res => {
      runInAction("获取头部用户信息", () => {

        console.log(res.data);
        this.data = res.data;
      });
    }));
  };

  @action
  setRefreshing = (refreshing) => {
    this.refreshing = refreshing;
  }

}

const headerState = new FrontHeaderPageState();

@observer
class FrontHeaderPage extends Component {

  componentWillMount() {
    // headerState.name = "马路上捡的程序员";
    headerState.initUserData();
  }

  shouyeClick = () => {
    this.props.history.push("/");
  };

  articleClick = () => {
    this.props.history.push(`${front}/article`);
  };

  archiveClick = () => {
    this.props.history.push(`${front}/archives`);
  };

  tagsClick = () => {
    Toast.fail("该功能未开放!", 1.5);
  };

  collectClick = () => {
    this.props.history.push(`${front}/collect`);
  };

  render() {
    return (
        <div>
          <PullToRefresh
            damping={60}
            indicator={{ deactivate: '上拉可以刷新' }}
            direction={"down"}
            refreshing={headerState.refreshing}
            onRefresh={() => {
              headerState.setRefreshing(true);
              setTimeout(() => {
                headerState.setRefreshing(false);
                // const { history } = this.props;
                // history.push(userDetails);
              }, 1000);
            }}
          >
          {/*<Button type='primary' onClick={this.handleClick}>学习</Button>*/}
            <div className="header-image-div">
              <img className="header-image" src={headerState.data.data && headerState.data.data.image} alt=""/>
            </div>
            <div className="header-username">{headerState.data.data && headerState.data.data.aliasname}</div>
            <div className="header-icon">
              <CustomIcon size="xxl" type="shouye" onClick={this.shouyeClick} />
              <CustomIcon size="xxl" type="zuopin" onClick={this.articleClick} />
              <CustomIcon size="xxl" type="guidang1" onClick={this.archiveClick} />
              <CustomIcon size="xxl" type="biaoqian" onClick={this.tagsClick} />
              <CustomIcon size="xxl" type="shoucang1" onClick={this.collectClick} />
              {/*<div className="header-collapse-btn">
                <CustomIcon size="xxl" type="top-1-copy" />
              </div>*/}
            </div>

          </PullToRefresh>
        </div>
    );
  }
}

export default withRouter(FrontHeaderPage);
