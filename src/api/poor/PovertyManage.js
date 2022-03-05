
import request from '@/utils/request'

export function helpList(data) {
  return request({
    url: '/admin/v1/poor/helpList',
    method: 'post',
    data
  })
}

