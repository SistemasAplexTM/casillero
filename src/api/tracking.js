import request from '@/utils/request'

export function getAllWarehouse(user_id, status_id) {
  var url = 'http://localhost:8000/api/getAllWarehouse/' + user_id + '/' + status_id
  return request({
    url,
    method: 'get'
  })
}

export function getWarehouse(warehouse, status_id) {
  var url = 'http://localhost:8000/api/getWarehouse/' + warehouse + '/' + status_id
  return request({
    url,
    method: 'get'
  })
}
