import fetch from '@/api/fetch'

// 判断首页
export function ifOne () {
  let url = '/kukacms/visitor/getDicById.htm?id=1'
  return fetch({
    url: url,
    method: 'get'
  })
}