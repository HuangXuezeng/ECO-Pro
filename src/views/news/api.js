import fetch from '@/api/fetch'

// 获取文章
export function getDocumentInfo (id, userId) {
  let url = '/kukacms/visitor/getDocumentById.htm?id=' + id + "&userId=" + userId
  return fetch({
    url: url,
    method: 'post',
  })
}

// 阅读量计数 获取访问信息 app= 1 pc = 2
export function addPageView (id, docId) {
  let url = ''
  var is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
  if (!is_mobi) {
    url =`/kukacms/visitor/addPageView.htm?userId=${id}&documentId=${docId}&type=2`
  } else {
    url =`/kukacms/visitor/addPageView.htm?userId=${id}&documentId=${docId}&type=1`
  }
  return fetch({
    url: url,
    method: 'get'
  })
}