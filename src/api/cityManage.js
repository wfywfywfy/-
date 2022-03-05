import request from '@/utils/request'
// 城市管理

export function cityTree(data) {
  return request({
    url: '/admin/v1/city/cityTree',
    method: 'post',
    data
  })
}