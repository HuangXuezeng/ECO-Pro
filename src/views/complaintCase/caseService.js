import fetch from '@/api/fetch'
import qs from 'qs'
//设置获取资讯方法
export function getCase() {
    let url = `/kukacms/api/complaint/news/page.htm?curPage=1&sizePage=100`
    return fetch({
      url: url,
      method: 'get'
    })
  }
  export function getCaseinfo(id) {
    let url = `/kukacms/api/complaint/news/getById.htm?id=${id}`
    return fetch({
      url: url,
      method: 'get'
    })
  }