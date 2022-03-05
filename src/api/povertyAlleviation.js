import request from '@/utils/request'
//  扶贫成效

export function helpPoorResults(data) {
  return request({
    url: '/admin/v1/news/helpPoorResults',
    method: 'post',
    data
  })
}