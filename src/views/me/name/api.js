import fetch from '@/api/fetch'
import qs from 'qs'

// 修改用户信息
export function updataUserInfo (data) {
  let url = '/kukacms/visitor/updateNickName.htm'
  return fetch({
    url: url,
    method: 'post',
    data: qs.stringify(data),
  })
}

// 判断昵称唯一性
export function nickIsHave (nick) {
  let url = '/kukacms/visitor/findMemberByNickName.htm?nickName=' + nick
  return fetch({
    url: url,
    method: 'post'
  })
}