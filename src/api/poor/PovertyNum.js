
import request from '@/utils/request'

export function poorStatistics(data) {
  return request({
    url: '/admin/v1/poor/poorStatistics',
    method: 'post',
    data
  })
}

export function transactionList(query) {
  return request({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params: query
  })
}