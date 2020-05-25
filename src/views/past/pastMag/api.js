import fetch from '@/api/fetch'
import qs from 'qs'

export function getNav (id) {
  let url = '/kukacms/visitor/getTabNavigator.htm?magazine=' + id
  return fetch({
    url: url,
    method: 'get'
  })
}

// 获取期刊栏目文章列表
export function getDocumentList (typeId, page) {
  let url = '/kukacms/visitor/getDocumentAuditPage.htm'
  let data = {
    typeId: typeId,
    curPage: page,
    // magazine: magazine
  }
  return fetch({
    url: url,
    method: 'post',
    data: qs.stringify(data)
  })
}