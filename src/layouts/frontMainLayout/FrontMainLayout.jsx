import React, { Component } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import { observer } from "mobx-react"
import { observable, action, runInAction } from "mobx"
import 'animate.css';

import './frontMainLayout.css';
import FrontHeaderPage from "../../pages/frontHeaderPage/FrontHeaderPage";
import FrontCollectListPage from "../../pages/frontCollectListPage";
import FrontArticleListPage from "../../pages/frontArticleListPage";
import {front, mobile} from "../../config/routeConstant";
import FrontArticleDetailsPage from "../../pages/frontArticleDetailsPage";
import FrontArchivesListPage from "../../pages/frontArchivesListPage/FrontArchivesListPage";

let startX;
let startY;

class FrontMainLayoutState {

}

const mainState = new FrontMainLayoutState();

class FrontMainLayout extends Component {

  touchStart = (ev) => {
    startX = ev.touches[0].pageX;
    startY = ev.touches[0].pageY;
  };

  touchEnd = (ev) => {
    var endX, endY;
    endX = ev.changedTouches[0].pageX;
    endY = ev.changedTouches[0].pageY;
    var direction = this.GetSlideDirection(startX, startY, endX, endY);
    switch(direction) {
      case 0:
        console.log("无操作");
        break;
      case 1:
        // 向上
        console.log("up");
        break;
      case 2:
        // 向下
        console.log("down");
        break;

      default:
    }
  };

  GetSlideDirection = (startX, startY, endX, endY) => {
    var dy = startY - endY;
    //var dx = endX - startX;
    var result = 0;
    if(dy>0) {//向上滑动
      result=1;
    }else if(dy<0){//向下滑动
      result=2;
    }
    else
    {
      result=0;
    }
    return result;
  };

  handleSimpleChange = () => {

  };

  render() {
    return (
      <div className="front-layout">
        <div className="front-layout-header animated fadeInDown faster">
          <FrontHeaderPage />
        </div>
        <div className="front-layout-content animated linear fadeInUp faster" onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
          <Switch>
            <Route path={`${front}/collect/:tagId?/:tagName?/:articleNum?/:type?`} component={FrontCollectListPage} />
            <Route path={`${front}/article/:archivesTime?`} exact component={FrontArticleListPage} />
            <Route path={`${front}/archives`} exact component={FrontArchivesListPage} />
            <Route path={`${front}/details/:id`} component={FrontArticleDetailsPage} />

            <Route path="/" component={FrontArticleListPage} />
          </Switch>
        </div>
        <div className="front-layout-footer">

        </div>
      </div>
    );
  }
}

export default withRouter(FrontMainLayout);

