import request from "../../utils/request";

export function getSwipers() {
  return request({
    url: "/home/swiper",
    method: "get",
  });
}
