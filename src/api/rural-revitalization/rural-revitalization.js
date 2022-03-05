
import request from '@/utils/request'

export function villageinfoList(data) {
  return request({
    url: '/admin/v1/poor/villageinfoList',
    method: 'post',
    data
  })
}

//详情页
export function villageinfo(data) {
  return request({
    url: '/admin/v1/poor/villageinfo',
    method: 'post',
    data
  })
}
export function addvillageinfo(data) {
  return request({
    url: '/admin/v1/poor/addvillageinfo',
    method: 'post',
    data
  })
}
export function editvillageinfo(data) {
  return request({
    url: '/admin/v1/poor/editvillageinfo',
    method: 'post',
    data
  })
}
export function delvillageinfo(data) {
  return request({
    url: '/admin/v1/poor/delvillageinfo',
    method: 'post',
    data
  })
}