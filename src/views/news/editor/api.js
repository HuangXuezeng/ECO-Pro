import fetch from '@/api/fetch'
import qs from 'qs'

// 发表评论
export function toComment (data) {
  let url = '/kukacms/visitor/addDocumentComment.htm'
  return fetch({
    url: url,
    method: 'post',
    data: qs.stringify(data)
  })
}