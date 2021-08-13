import request from "@/utils/request";

export function getSwipers() {
  return request({
    url: "/home/swiper",
    method: "get",
  });
}

export function getGroups(params: string) {
  return request({
    url: "/home/groups",
    method: "get",
    params,
  });
}

export function getNews(params: string) {
  return request({
    url: "/home/news",
    method: "get",
    params,
  });
}
