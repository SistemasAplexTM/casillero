import request from '@/utils/request'

export function getCity(queryString) {
  return request({
    url: '/getSelectCity/' + queryString,
    method: 'get'
  })
}
