import request from "@/utils/request";

// 获取轮播图
export function getSwipers() {
  return request({
    url: "/home/swiper",
    method: "get",
  });
}

// 获取租房小组数据
export function getGroups(area: string) {
  return request({
    url: "/home/groups",
    method: "get",
    params: {
      area,
    },
  });
}

// 获取热点新闻
export function getNews(area: string) {
  return request({
    url: "/home/news",
    method: "get",
    params: {
      area,
    },
  });
}
