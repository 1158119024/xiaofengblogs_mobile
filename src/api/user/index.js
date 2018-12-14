import axiosService from '../index';

import { usernameGetFun } from '../../config/constants';

// ----------------------前台----------------------
// 获取用户详细信息与基本信息
export async function getUserDetails() {
  return axiosService({
    url: `/xiaofeng/user/getUserDetails/${usernameGetFun()}`,
    method: 'get',
  });
}
