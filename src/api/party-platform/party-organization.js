import request from '@/utils/request'



export function partylist(data) {
  return request({
    url: '/admin/v1/city/partylist',
    method: 'post',
    data
  })
}
export function addparty(data) {
  return request({
    url: '/admin/v1/city/addparty',
    method: 'post',
    data
  })
}




export function bb(data) {
  return request({
    url: '/admin/v1/poor/reportList',
    method: 'post',
    data
  })
}

export function aa(params) {
  return request({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params
  })
}