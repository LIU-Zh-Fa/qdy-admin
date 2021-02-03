import request from '@/utils/request'

const api = "/api/dayin/cb";

/**
 * 登录
 * @param username
 * @param password
 * @param grant_type
 */
export const loginByUsername = (username, password) =>
  request({
    url: "/auth/login",
    method: "post",
    meta: {
      oauth: true
    },
    data: {
      userName: username,
      passWord: password,
      rememberMe: true
    }
  });
