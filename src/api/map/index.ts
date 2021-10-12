import request from "@/utils/request";

// 查询房源数据
export function getHouseList(id: string) {
  return request({
    url: "/area/map",
    method: "get",
    params: {
      id,
    },
  });
}

// 查询房源详情
export function getHouseInfo(cityId: string) {
  return request({
    url: "/houses",
    method: "get",
    params: {
      cityId,
    },
  });
}
