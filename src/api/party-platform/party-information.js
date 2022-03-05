import request from '@/utils/request'


//党建活动start
export function partyinfolist(data) {
  return request({
    url: '/admin/v1/city/partyinfolist',
    method: 'post',
    data
  })
}


export function addpartyinfo(data) {
  return request({
    url: '/admin/v1/city/addpartyinfo',
    method: 'post',
    data
  })
}


export function editpartyinfo(data) {
  return request({
    url: '/admin/v1/city/editpartyinfo',
    method: 'post',
    data
  })
}


export function delpartyinfo(data) {
  return request({
    url: '/admin/v1/city/delpartyinfo',
    method: 'post',
    data
  })
}

//党建活动end


//政策文件start
export function xczxfilelist(data) {
  return request({
    url: '/admin/v1/city/xczxfilelist',
    method: 'post',
    data
  })
}


export function addfileinfo(data) {
  return request({
    url: '/admin/v1/city/addfileinfo',
    method: 'post',
    data
  })
}


export function editfileinfo(data) {
  return request({
    url: '/admin/v1/city/editfileinfo',
    method: 'post',
    data
  })
}


export function delfileinfo(data) {
  return request({
    url: '/admin/v1/city/delfileinfo',
    method: 'post',
    data
  })
}

//政策文件end

//主题教育start
export function xczxeducationlist(data) {
  return request({
    url: '/admin/v1/city/xczxeducationlist',
    method: 'post',
    data
  })
}


export function editeducationinfo(data) {
  return request({
    url: '/admin/v1/city/editeducationinfo',
    method: 'post',
    data
  })
}


export function addeducationinfo(data) {
  return request({
    url: '/admin/v1/city/addeducationinfo',
    method: 'post',
    data
  })
}


export function deleducationinfo(data) {
  return request({
    url: '/admin/v1/city/deleducationinfo',
    method: 'post',
    data
  })
}

//主题教育end
export function bb(data) {
  return request({
    url: '/admin/v1/poor/reportList',
    method: 'post',
    data
  })
}

export function aa(params) {
  return request({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params
  })
}