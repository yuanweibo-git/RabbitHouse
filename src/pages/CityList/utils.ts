import { CityData, CityListType } from "./index";

// 左侧索引的高度
export const TITLE_HEIGHT = 36;
// 每个城市名称的高度
export const NAME_HEIGHT = 50;

/**
 * @description 过滤title名称
 * @param letter 过滤后的名称
 */
export const formatCityIndex = (letter: string) => {
  switch (letter) {
    case "#":
      return "当前定位";
    case "hot":
      return "热门城市";
    default:
      return letter;
  }
};

/**
 * @description 处理城市数据
 * @param list 请求到的城市列表
 * @returns {cityList, cityIndex} 左侧城市详情，右侧索引数据
 */
export const formatCityList = (list: CityData[]) => {
  const cityList: CityListType = {};

  list.forEach((item) => {
    let firstStr: string = item.short.substr(0, 1).toUpperCase();

    if (!cityList[firstStr]) cityList[firstStr] = [item];
    else cityList[firstStr].push(item);
  });

  const cityIndex: string[] = Object.keys(cityList).sort();

  return {
    cityList,
    cityIndex,
  };
};
