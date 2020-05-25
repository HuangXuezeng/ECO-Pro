import fetch from '@/api/fetch'
import qs from 'qs'

export function submitEdit(data) {
  // let url = `/kukacms/api/complaint/detail/add.htm`
  return fetch({
    url: "/kukacms/api/complaint/detail/add.htm",
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getUserInfo(id) {
  let url = '/kukacms/visitor/findUserById.htm?userId=' + id + '&useId=' + id
  return fetch({
    url: url,
    method: 'post'
  })
}