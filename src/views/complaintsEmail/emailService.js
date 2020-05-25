import fetch from '@/api/fetch'
import qs from 'qs'
//暴露设置获取首页资讯方法
export function getemail () {
    let url = `/kukacms/api/email/getEmailById.htm?id=1`
    return fetch({
      url: url,
      method: 'get'
    })
  }