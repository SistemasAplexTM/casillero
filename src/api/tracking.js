import request from '@/utils/request'

export function getTrackings(idStatus) {
  return request({
    url: 'http://4plbox.test/api/rastreo/getStatusReport/null/' + idStatus,
    method: 'get'
  })
}
