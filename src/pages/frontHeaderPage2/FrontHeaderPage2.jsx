import React, { Component } from 'react';

import './frontHeaderPage2.css';
import {action, observable, runInAction} from "mobx";
import {getUserDetails} from "../../api/user";
import {observer} from "mobx-react";
import {withRouter} from "react-router-dom";

class FrontHeaderPageState2 {
  @observable data = {};
  @observable show = false;

  @action
  initUserData = () => {
    getUserDetails().then((res => {
      runInAction("获取头部用户信息", () => {
        this.data = res.data;
      });
    }));
  };

  @action
  setShow = (show) => {
    this.show = show;
  }

}
const headerState = new FrontHeaderPageState2();

@observer
class FrontHeaderPage2 extends Component {

  componentWillMount() {
    headerState.initUserData();
  }

  render() {
    return (
        <div className="header-title-div">
          <span className="header-title">{headerState.data.data && headerState.data.data.aliasname}</span>
        </div>
    );
  }
}

export default withRouter(FrontHeaderPage2);
