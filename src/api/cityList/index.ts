import request from "@/utils/request";

// 获取城市列表数据
export function getCityList(level: number = 1) {
  return request({
    url: "/area/city",
    method: "get",
    params: {
      level,
    },
  });
}

// 查询热门城市
export function getCityHot() {
  return request({
    url: "/area/hot",
    method: "get",
  });
}
