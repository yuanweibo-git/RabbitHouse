import request from "@/utils/request";

// 获取筛选条件
export function getCondition(id: string) {
  return request({
    url: "/houses/condition",
    method: "get",
    params: {
      id,
    },
  });
}
