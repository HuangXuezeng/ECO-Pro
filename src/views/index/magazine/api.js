import fetch from '@/api/fetch'
import qs from 'qs'

// 获取当期期刊 id
export function getCurrentMagazine () {
  let url = '/kukacms/visitor/getCuMagazine.htm'
  return fetch({
    url: url,
    method: 'get'
  })
}

export function getNav () {
  return new Promise((resolve, reject) => {
    getCurrentMagazine().then(res => {
      let url = '/kukacms/visitor/getTabNavigator.htm?magazine=' + res.data.type
      fetch({
        url: url,
        method: 'get'
      }).then(res => {
        if (res.data) {
          resolve(res.data)
        } else {
          reject('获取数据失败')
        }
      })
    })
  })
}

// 获取期刊栏目文章列表
export function getDocumentList (typeId, page) {
  let url = '/kukacms/visitor/getDocumentAuditPage.htm'
  let data = {
    typeId: typeId,
    curPage: page,
    magazine: 'curr'
  }
  return fetch({
    url: url,
    method: 'post',
    data: qs.stringify(data)
  })
}