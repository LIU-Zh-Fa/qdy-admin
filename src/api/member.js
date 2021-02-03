import request from '@/utils/request'

export function getList(params){
  return request({
    url: "/ca/getMemeberList",
    method: "get",
    params: params
  })
}

