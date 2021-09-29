import request from "@/utils/request";

// 根据城市名称查询该城市信息
export function getCityName(params: string) {
  return request({
    url: "/area/info",
    method: "get",
    params,
  });
}
