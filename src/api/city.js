import request from '@/utils/request'

export function getCity() {
  return request({
    url: '/getSelectCity',
    method: 'get'
  })
}
