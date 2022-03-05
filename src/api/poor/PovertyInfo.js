
import request from '@/utils/request'
//表格数据
export function poorinfoList(data) {
  return request({
    url: '/admin/v1/poor/poorinfoList',
    method: 'post',
    data
  })
}
export function addpoorinfo(data) {
  return request({
    url: '/admin/v1/poor/addpoorinfo',
    method: 'post',
    data
  })
}
export function editpoorinfo(data) {
  return request({
    url: '/admin/v1/poor/editpoorinfo',
    method: 'post',
    data
  })
}
export function delpoorinfo(data) {
  return request({
    url: '/admin/v1/poor/delpoorinfo',
    method: 'post',
    data
  })
}
export function poorInformation(data) {
  return request({
    url: '/admin/v1/poor/poorInformation',
    method: 'post',
    data
  })
}


export function bb(data) {
  return request({
    url: '/admin/v1/poor/seepoorinfo',
    method: 'post',
    data
  })
}


export function aa(params) {
  return request({
    url: '/admin/v1/poor/addpoorinfo',
    method: 'get',
    params
  })
}