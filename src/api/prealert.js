import request from '@/utils/request'

export function getAllPrealert(agency_id, consignee_id) {
  return request({
    url: 'http://localhost:8000/api/getAllPrealert/' + agency_id + '/'+ consignee_id,
    method: 'get'
  })
}

export function setPrealert(data) {
  return request({
    url: 'http://localhost:8000/api/setPrealert',
    method: 'post',
    data
  })
}
