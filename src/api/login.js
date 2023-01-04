import request from '@/utils/request'

export function login(username, password, agency_id, remember) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: {
      email: username,
      password,
      agencia_id: agency_id,
      remember_me: remember
    }
  })
}

export function user() {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'api/auth/logout',
    method: 'get'
  })
}

export function getLogo(agency_id) {
  return request({
    url: '/getLogo/' + agency_id,
    method: 'get'
  })
}


