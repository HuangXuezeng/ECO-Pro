import fetch from '@/api/fetch'
import qs from 'qs'
//暴露设置获取首页资讯方法
export function getBanner (id) {
    let url = `/kukacms/api/complanit/getBannerById.htm?id=1`
    return fetch({
      url: url,
      method: 'get'
    })
  }