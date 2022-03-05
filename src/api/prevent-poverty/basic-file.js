import request from '@/utils/request'

export function backobjList(data) {
  return request({
    url: '/admin/v1/poor/backobjList',
    method: 'post',
    data
  })
}
//带条件查询
export function backobjListt(data) {
  return request({
    url: '/admin/v1/poor/backobjListt',
    method: 'post',
    data
  })
}


export function addbackobj(data) {
  return request({
    url: '/admin/v1/poor/addbackobj',
    method: 'post',
    data
  })
}

export function editbackobj(data) {
  return request({
    url: '/admin/v1/poor/editbackobj',
    method: 'post',
    data
  })
}


export function delbackobj(data) {
  return request({
    url: '/admin/v1/poor/delbackobj',
    method: 'post',
    data
  })
}