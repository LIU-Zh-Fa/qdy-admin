import request from '@/utils/request'

export function getList(params){
  return request({
    url: "/ca/getSysMerchantList",
    method: "get",
    params: params
  })
}

export function tree(params){
  return request({
    url: "/ca/tree",
    method: "get",
    params: params
  })
}

export function merchantSave(params){
  return request({
    url: "/ca/merchantSave",
    method: "POST",
    data: params
  })
}
