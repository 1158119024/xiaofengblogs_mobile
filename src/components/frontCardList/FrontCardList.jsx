import React, { Component } from 'react';
import { WhiteSpace } from "antd-mobile";
import PropTypes from 'prop-types';

import { CustomIcon } from "../../config/iconfont";

const cardList = [
  {
    id: 0,
    title: "啦啦啦啦啦啦啦",
    date: "",
    content: "这是内容3",
    isTop: true,
    tags: [
      {
        articleNum: 1,
        createTime: 1543375546000,
        id: 233,
        tagName: "Centos7",
        userId: 1,
      }
    ]
  },{
    id: 0,
    title: "啦啦啦啦啦啦啦",
    date: "",
    content: "这是内容2",
    isTop: true,
    tags: [
      {
        tagName: "标签名",
        tagId: 0,
      }
    ]
  },{
    id: 0,
    title: "啦啦啦啦啦啦啦",
    date: "",
    content: "这是内容1",
    isTop: false,
    tags: [
      {
        tagName: "标签名",
        tagId: 0,
      }
    ]
  },{
    id: 0,
    title: "啦啦啦啦啦啦啦",
    date: "",
    content: "这是内容1",
    isTop: false,
    tags: [
      {
        tagName: "标签名",
        tagId: 0,
      }
    ]
  },{
    id: 0,
    title: "啦啦啦啦啦啦啦",
    date: "",
    content: "这是内容1",
    isTop: false,
    tags: [
      {
        tagName: "标签名",
        tagId: 0,
      }
    ]
  },{
    id: 0,
    title: "啦啦啦啦啦啦啦",
    date: "",
    content: "这是内容1",
    isTop: false,
    tags: [
      {
        tagName: "标签名",
        tagId: 0,
      }
    ]
  },{
    id: 0,
    title: "啦啦啦啦啦啦啦",
    date: "",
    content: "这是内容1",
    isTop: false,
    tags: [
      {
        tagName: "标签名",
        tagId: 0,
      }
    ]
  },{
    id: 0,
    title: "啦啦啦啦啦啦啦",
    date: "",
    content: "这是内容1",
    isTop: false,
    tags: [
      {
        tagName: "标签名",
        tagId: 0,
      }
    ]
  },{
    id: 0,
    title: "啦啦啦啦啦啦啦",
    date: "",
    content: "这是内容1",
    isTop: false,
    tags: [
      {
        tagName: "标签名",
        tagId: 0,
      }
    ]
  },{
    id: 0,
    title: "啦啦啦啦啦啦啦",
    date: "",
    content: "这是内容1",
    isTop: false,
    tags: [
      {
        tagName: "标签名",
        tagId: 0,
      }
    ]
  }
];

export default class FrontCardList extends Component {

  static propTypes = {
    cardList: PropTypes.array.isRequired, // 卡片内容
  };

  componentWillReceiveProps = (props) => {
    console.log(props.cardList)
  };

  render() {
    return (
      <div className="card-list">
        {
          cardList.map((item, index) => (
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
                  <span className="card-item-header-title">{item.title}</span>
                  <div className="card-item-header-date">
                    <CustomIcon style={{ marginRight: '20px' }} size="xl" type="Group" />
                    {/*{moment("").format(DATE_FORMAT)}*/}
                    2015-10
                  </div>
                </header>
                <content className="card-item-content">
                  {item.content}
                </content>
                <footer className="card-item-footer">
                  <CustomIcon style={{ marginRight: '10px', color: '#666' }} size="xl" type="biaoqian2" />
                  {
                    item.tags.map((tagItem, tagIndex) => (
                      <span key={tagIndex} className="card-item-footer-tag">{tagItem.tagName}</span>
                    ))
                  }
                </footer>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}
