import axiosService from '../index';

import { usernameGetFun } from '../../config/constants';

// --------------------------前台
// 条件查询
export async function getCollects(params) {
  params.userId = usernameGetFun();
  return axiosService({
    url: '/xiaofeng/collect/getCollectsByCondition',
    method: 'post',
    data: params,
  });
}
