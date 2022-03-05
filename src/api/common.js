import request from '@/utils/request'

//城市结构
export function cityTree(data) {
  return request({
    url: '/admin/v1/city/cityTree',
    method: 'post',
    data
  })
}

//党组织结构
export function partyTree(data) {
  return request({
    url: '/admin/v1/city/partyTree',
    method: 'post',
    data
  })
}


export function aa(data) {
  return request({
    url: '/admin/v1/poor/poorList',
    method: 'post',
    data
  })
}

export function bb(query) {
  return request({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params: query
  })
}