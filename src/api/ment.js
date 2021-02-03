import request from '@/utils/request'

export function getList(params){
  return request({
    url: "/ca/getSettleMentList",
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
