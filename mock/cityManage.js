const Mock = require('mockjs')
// 城市管理

export function cityTree(data) {
  return request({
    url: '/admin/v1/city/cityTree',
    type: 'post',
    response: config => {
		return {
		  code: 20000,
		  data: {
		    total: mockList.length,
		    items: pageList
		  }
		}
	}
  })
}