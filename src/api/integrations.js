import request from '@/utils/request'

export function getUrlZopim(agency_id) {
  return request({
    url: '/getUrlZopim/' + agency_id,
    method: 'get'
  })
}

export function getPaypal(agency_id) {
  return request({
    url: '/getPaypal/' + agency_id,
    method: 'get'
  })
}
