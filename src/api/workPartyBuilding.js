import request from '@/utils/request'
//  党建工作

// 党组织机构

export function partyList(data) {
  return request({
    url: '/admin/v1/party/partyList',
    method: 'post',
    data
  })
}

// 党建活动

export function partyBuild(data) {
  return request({
    url: '/admin/v1/attachment/partyBuild',
    method: 'post',
    data
  })
}

// 政策文件
export function policyFile(data) {
  return request({
    url: '/admin/v1/attachment/policyFile',
    method: 'post',
    data
  })
}

// 主题教育
export function themeEducation(data) {
  return request({
    url: '/admin/v1/attachment/themeEducation',
    method: 'post',
    data
  })
}