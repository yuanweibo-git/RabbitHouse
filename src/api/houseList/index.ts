import request from "@/utils/request";

type GetHousesInfo = {
  cityId: string;
  area?: string;
  subway?: string;
  rentType?: boolean;
  price?: string;
  more?: string;
  roomType?: string;
  oriented?: string;
  characteristic?: string;
  floor?: string;
  start?: number;
  end?: number;
};

export function getCondition(id: string) {
  return request({
    url: "/houses/condition",
    method: "get",
    params: {
      id,
    },
  });
}

export function getHousesList(params: GetHousesInfo) {
  return request({
    url: "/houses",
    method: "get",
    params: {
      ...params,
    },
  });
}
