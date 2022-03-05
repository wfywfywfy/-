const Mock = require('mockjs')
// 乡村振兴

export function villageList(data) {
  return request({
    url: '/admin/v1/village/villageList',
    method: 'post',
    data
  })
}
