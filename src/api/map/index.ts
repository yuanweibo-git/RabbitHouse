import request from "@/utils/request";

// 查询房源数据
export function getHouseData(id: string) {
  return request({
    url: "/area/map",
    method: "get",
    params: {
      id,
    },
  });
}
