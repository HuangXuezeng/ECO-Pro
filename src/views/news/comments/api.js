import fetch from '@/api/fetch'

// 获取评论信息
export function getComment (id, page) {
  let url = '/kukacms/visitor/getDocumentCommentPage.htm?documentId=' + id + "&flag=2&curPage=" + page
  return fetch({
    url: url,
    method: 'post'
  })
}

// type=3文章评论点赞 flag 1 点赞 -1 取消
export function commentDianZan (id, userId, flag) {
  let url = '/kukacms/visitor/updateDocumentDianzan.htm?documentId=' + id + '&flag=' + flag + '&type=3&userId=' + userId
  return fetch({
    url: url,
    method: 'post'
  })
}