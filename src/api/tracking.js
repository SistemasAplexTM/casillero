import request from '@/utils/request'

export function getAllWarehouse(user_id, status_id) {
  var url = '/getAllWarehouse/' + user_id + '/' + status_id
  return request({
    url,
    method: 'get'
  })
}

export function getWarehouse(warehouse, status_id) {
  var url = '/getWarehouse/' + warehouse + '/' + status_id
  return request({
    url,
    method: 'get'
  })
}

export function uploadFile(agencyId, data) {
  var url = '/prealerta/' + agencyId + '/uploadFile'
  return request({
    url,
    method: 'post',
    data
  })
}
