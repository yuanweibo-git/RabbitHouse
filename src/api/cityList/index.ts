import request from "@/utils/request";

export function getCityList(level: number = 1) {
  return request({
    url: "/area/city",
    method: "get",
    params: {
      level,
    },
  });
}

export function getCityHot() {
  return request({
    url: "/area/hot",
    method: "get",
  });
}
