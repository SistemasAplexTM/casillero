import request from '@/utils/request'

export function login(username, password, remember) {
  return request({
    url: 'http://localhost:8000/api/auth/login',
    method: 'post',
    data: {
      email: username,
      password,
      remember_me: remember
    }
  })
}

export function user() {
  return request({
    url: 'http://localhost:8000/api/user',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'api/auth/logout',
    method: 'get'
  })
}
