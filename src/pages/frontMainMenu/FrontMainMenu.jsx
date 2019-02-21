import React, { Component } from 'react';
import {action, observable} from "mobx";
import {observer} from "mobx-react";
import {front} from "../../config/routeConstant";
import {withRouter} from "react-router-dom";
import {CustomIcon} from "../../config/iconfont";
import homeImg from "../../image/home.png";


class FrontMainMenuState {
  @observable show = false;

  @action
  setShow = (show) => {
    this.show = show;
  }
}

const mainState = new FrontMainMenuState();
const navBtn = [
  { type: 'shouye', url: '/' },
  { type: 'zuopin', url: '/' },
  { type: 'guidang1', url: '/archives' },
  // { type: 'biaoqian', url: '/tags' },
  { type: 'shoucang1', url: '/collect' },
  // { type: 'pinglun1', url: '/' },
  // { type: 'jiaoyinzujifangke', url: '/' },
];
const c = 200; // 第三边(斜边)
let navBtnState = [];

@observer
class FrontMainMenu extends Component {

  componentWillMount() {
    let edgeObj;
    for (let i = 0, len = navBtn.length; i < len; i++) {
      const navBtnObj = {};
      navBtnObj.type = navBtn[i].type;
      navBtnObj.url = navBtn[i].url;
      edgeObj = this.getPoint(90 / (navBtn.length - 1) * i);
      navBtnObj.left = `-${edgeObj.left}px`;
      navBtnObj.top = `-${edgeObj.top}px`;
      navBtnObj.timeLapseStart = i;
      navBtnObj.timeLapseEnd = `${(navBtn.length - 1 - i) * 0.1}s`;
      navBtnState.push(navBtnObj);
    }
  }

  handleUrlClick = (url, event) => {
    const parentEle = event.target.parentElement;
    parentEle.style.transform = 'rotate(-720deg) scale(2)';
    parentEle.style.opacity = '0.1';
    parentEle.style.transition = '0.5s';

    parentEle.addEventListener('transitionend', transitionEndFun);
    this.props.history.push(`${front}${url}`);
    // 点击时动画
    function transitionEndFun() {
      // console.log(parentEle);
      console.log(parentEle);
      parentEle.style.transition = '0.3s ';
      parentEle.style.transform = 'rotate(-720deg) scale(1)';
      parentEle.style.opacity = '1';
      // 动画完成后移除
      parentEle.removeEventListener('transitionend', transitionEndFun);
    }
  };

  // 已知第三边 和 一个角
  getPoint = (deg) => {
    const x = Math.round(c * Math.sin(deg * Math.PI / 180));
    const y = Math.round(c * Math.cos(deg * Math.PI / 180));
    return { left: x, top: y };
  };

  homeBtnClick = () => {
    const { show } = mainState;
    mainState.setShow(!show);
  };

  render() {
    return (
      <div className="nav-wrap">
        <div className="all-nav-btn">
          {
            mainState.show ? navBtnState.map((item, index) => (
              <div key={index} className="nav-btn" style={{ left: item.left, top: item.top, transition: `1s 0.${item.timeLapseStart}s`, transform: 'rotate(-720deg) scale(1)' }} >
                <CustomIcon size="xxl" type={item.type} onClick={this.handleUrlClick.bind(this, item.url)} />
              </div>
            )) : navBtnState.map((item, index) => (
              <div key={index} className="nav-btn" style={{ left: '0px', top: '0px', transition: `1s ${item.timeLapseEnd}`, transform: 'rotate(0deg) scale(1)' }}>
                <CustomIcon size="xxl" type={item.type} />
              </div>
            ))
          }
        </div>
        <div className="home-btn" style={{ transform: mainState.show ? 'rotate(-720deg)' : 'rotate(0deg)' }} onClick={this.homeBtnClick}>
          <img src={homeImg} alt="导航" width={70} />
        </div>
      </div>
    );
  }
}

export default withRouter(FrontMainMenu);

