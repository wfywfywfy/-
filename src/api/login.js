import request from '@/utils/request'

//登录
export function login(data) {
  return request({
    url: '/admin/v1/poor/login',
    method: 'post',
    data
  })
}

