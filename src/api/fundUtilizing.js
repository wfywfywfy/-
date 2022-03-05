import request from '@/utils/request'
// 资金使用
import request from '@/utils/request'

export function querySysUser(query) {
  return request({
    url: '/api/admin/sysuser/querySysUser',
    method: 'get',
    params: query
  })
}