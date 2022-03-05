import request from '@/utils/request'



export function teamList(data) {
  return request({
    url: '/admin/v1/team/teamList',
    method: 'post',
    data
  })
}
export function addteam(data) {
  return request({
    url: '/admin/v1/team/addteam',
    method: 'post',
    data
  })
}
export function editteam(data) {
  return request({
    url: '/admin/v1/team/editteam',
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