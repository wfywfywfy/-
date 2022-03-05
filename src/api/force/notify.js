import request from '@/utils/request'



export function tasklist(data) {
  return request({
    url: '/admin/v1/unit/tasklist',
    method: 'post',
    data
  })
}
export function addtask(data) {
  return request({
    url: '/admin/v1/unit/addtask',
    method: 'post',
    data
  })
}
export function edittask(data) {
  return request({
    url: '/admin/v1/unit/edittask',
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