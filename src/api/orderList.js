import request from '@/utils/request'

export function getList(params){
  return request({
    url: "/ca/getOrderList",
    method: "get",
    params: params
  })
}
export function checkPickCode(params){
    return request({
        url: "/cb/verification",
        method: "get",
        params: params
    })
}
export function orderDetail(params){
    return request({
        url: "/cb/getOrderInfo",
        method: "get",
        params: params
    })
}