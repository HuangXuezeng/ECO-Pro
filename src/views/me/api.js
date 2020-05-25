import fetch from '@/api/fetch'
import qs from 'qs'

// 获取用户信息
export function getUserInfo (id) {
  let url = '/kukacms/visitor/findUserById.htm?userId=' + id + '&useId=' + id
  return fetch({
    url: url,
    method: 'post'
  })
}

// 修改用户信息
export function updataUserInfo (data) {
  let url = '/kukacms/visitor/updateNickName.htm'
  return fetch({
    url: url,
    method: 'post',
    data: qs.stringify(data),
  })
}