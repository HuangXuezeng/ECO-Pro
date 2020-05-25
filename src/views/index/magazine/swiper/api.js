import fetch from '@/api/fetch'

// 获取轮播信息
export function getCarouselList () {
  let url = '/kukacms/visitor/getCarouselList.htm?isCarousel=1'
  return fetch({
    url: url,
    method: 'post'
  })
}