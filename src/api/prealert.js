import request from '@/utils/request'

export function getAllPrealert(agency_id, consignee_id) {
  return request({
    url: '/getAllPrealert/' + agency_id + '/'+ consignee_id,
    method: 'get'
  })
}

export function setPrealert(data) {
  return request({
    url: '/setPrealert',
    method: 'post',
    data
  })
}

export function getCantPrealert(agency_id, consignee_id) {
 return request({
  url: '/getCantPrealert/' + agency_id + '/'+ consignee_id,
  method: 'get'
 })
}
