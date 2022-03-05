import request from '@/utils/request'



export function unitinfolist(data) {
  return request({
    url: '/admin/v1/unit/unitinfolist',
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