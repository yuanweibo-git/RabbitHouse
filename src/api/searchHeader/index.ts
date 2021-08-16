import request from "@/utils/request";

export function getCityName(params: string) {
  return request({
    url: "/area/info",
    method: "get",
    params,
  });
}
