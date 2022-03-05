const Mock = require('mockjs')


export function poorList(data) {
  return request({
    url: '/admin/v1/poor/poorList',
    method: 'post',
    data
  })
}