import request from "@/utils/request";

export function getSwipers() {
  return request({
    url: "/home/swiper",
    method: "get",
  });
}

export function getGroups(area: string) {
  return request({
    url: "/home/groups",
    method: "get",
    params: {
      area,
    },
  });
}

export function getNews(area: string) {
  return request({
    url: "/home/news",
    method: "get",
    params: {
      area,
    },
  });
}
