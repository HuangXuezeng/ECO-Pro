import fetch from '@/api/fetch'

export function getOneList () {
  let url = '/kukacms/visitor/getOneNewsList.htm'
  return fetch({
    url: url,
    method: 'get'
  })
}