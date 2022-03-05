import request from '@/utils/request'

export function reportList(data) {
  return request({
    url: '/admin/v1/poor/reportList',
    method: 'post',
    data
  })
}

export function reportListt(data) {
  return request({
    url: '/admin/v1/poor/reportListt',
    method: 'post',
    data
  })
}
export function addreport(data) {
  return request({
    url: '/admin/v1/poor/addreport',
    method: 'post',
    data
  })
}
export function report(data) {
  return request({
    url: '/admin/v1/poor/report',
    method: 'post',
    data
  })
}
export function transactionList(query) {
  return request({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params: query
  })
}