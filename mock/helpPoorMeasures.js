const Mock = require('mockjs')
// 扶贫措施

// 新闻列表
export function newsList(data) {
  return request({
    url: '/admin/v1/news/newsList',
    method: 'post',
    data
  })
}

// 扶贫成效
export function helpPoorResults(data) {
  return request({
    url: '/admin/v1/news/helpPoorResults',
    method: 'post',
    data
  })
}
