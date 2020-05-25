import fetch from '@/api/fetch'

// type=1文章点赞 flag 1 点赞 -1 取消
export function docDianZan (id, userId, flag) {
  let url = '/kukacms/visitor/updateDocumentDianzan.htm?documentId=' + id + '&flag=' + flag + '&type=1&userId=' + userId
  return fetch({
    url: url,
    method: 'post'
  })
}
