import request from '@/utils/request'



export function jobList(data) {
  return request({
    url: '/admin/v1/team/jobList',
    method: 'post',
    data
  })
}
export function editlogjob(data) {
  return request({
    url: '/admin/v1/team/editlogjob',
    method: 'post',
    data
  })
}
export function addlogjob(data) {
  return request({
    url: '/admin/v1/team/addlogjob',
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