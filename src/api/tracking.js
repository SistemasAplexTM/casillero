import request from '@/utils/request'

export function getTrackings(data, idStatus, user_id) {
  var url = 'http://localhost:8000/api/rastreo/getStatusReport/'+ data +'/' + idStatus + '/' + user_id
  if (data != null) {
    var url = 'http://localhost:8000/api/rastreo/getStatusReport/'+ data
  }
  return request({
    url,
    method: 'get'
  })
}
