import request from '@/utils/request'

export function getConfig(agency_id) {
  return request({
    url: '/getConfig/agency_publicity_' + agency_id,
    method: 'get'
  })
}
