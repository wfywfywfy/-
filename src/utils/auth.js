import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const userInfo1 = 'userInfo'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function getUserInfo() {
  return Cookies.get(userInfo1)
}

export function setUserInfo(userInfo) {
  return Cookies.set(userInfo1, userInfo)
}

export function removeUserInfo() {
  return Cookies.remove(userInfo1)
}