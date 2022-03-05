import request from '@/utils/request'
// 贫困户帮扶

// 贫困现状
export function poorSituation(data) {
  return request({
    url: '/admin/v1/poor/poorSituation',
    method: 'post',
    data
  })
}

// 贫困人口统计
export function poorStatistics(data) {
  return request({
    url: '/admin/v1/poor/poorStatistics',
    method: 'post',
    data
  })
}

// 贫困人口信息
export function poorInformation(data) {
  return request({
    url: '/admin/v1/poor/poorInformation',
    method: 'post',
    data
  })
}
//