import axiosService from '../index';

import { usernameGetFun } from '../../config/constants';

// 添加文章
export async function add(params) {
  return axiosService({
    url: '/xiaofeng/article/add',
    method: 'post',
    data: params,
  });
}
// 根据用户id获取文章列表
export async function getArticles(params) {
  params.userId = usernameGetFun();
  return axiosService({
    url: '/xiaofeng/article/getArticles',
    method: 'post',
    data: params,
  });
}

// 根据时间进行归档查询
export async function getArchivesByCreateTime(params) {
  params.userId = usernameGetFun();
  return axiosService({
    url: '/xiaofeng/article/getArchivesByCreateTime',
    method: 'post',
    data: params,
  });
}

// 以选中id为中，获取上中下三篇文章
export async function getArticleAndPreAndNextById(params) {
  params.userId = usernameGetFun();
  return axiosService({
    url: '/xiaofeng/article/getArticleAndPreAndNextById',
    method: 'post',
    data: params,
  });
}
