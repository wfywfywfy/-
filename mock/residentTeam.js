const Mock = require('mockjs')
// 驻村工作队

// 工作队信息管理
export function teamList(data) {
  return request({
    url: '/admin/v1/team/teamList',
    method: 'post',
    data
  })
}
