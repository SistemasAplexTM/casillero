import request from '@/utils/request'

export function update(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data
  })
}

export function find(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

export function getContacts(id) {
  return request({
    url: '/user/contacts/' + id,
    method: 'get'
  })
}

export function setContacts(id, data) {
  return request({
    url: '/user/setContacts/' + id,
    method: 'post',
    data
  })
}

export function sendPasswordReset(data) {
  return request({
    url: '/auth/password/email',
    method: 'post',
    data
  })
}

export function validateToken(data) {
  return request({
    url: '/auth/password/validate-token',
    method: 'post',
    data
  })
}

export function updatePassword(data) {
  return request({
    url: '/auth/password/reset',
    method: 'post',
    data
  })
}
