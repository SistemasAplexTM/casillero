import request from '@/utils/request'

export function getNotification () {
  return request({
    url: '/getNotification',
    method: 'get'
  })
}

export function viewedAll () {
  return request({
    url: '/viewedAllNotification',
    method: 'get'
  })
}

export function cant () {
  return request({
    url: '/cantNotification',
    method: 'get'
  })
}
