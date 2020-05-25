import fetch from '@/api/fetch'

// 获取往期期刊
export function getHistory (page) {
  let url = '/kukacms/visitor/getMagazinePage.htm?type=app&curPage=' + page
  return fetch({
    url: url,
    method: 'post'
  })
}