import request from '@/utils/request'

export function getList(params){
  return request({
    url: "/ca/getOpinionList",
    method: "get",
    params: params
  })
}
export function updateSettleMent(params){
  return request({
    url: "/ca/updateSettleMent",
    method: "POST",
    data: params
  })
}
export function getDetail(params){
  return request({
    url: "/ca/getDetail",
    method: "get",
    data: params
  })
}
