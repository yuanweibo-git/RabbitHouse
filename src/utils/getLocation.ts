import { getCityName } from "@/api/searchHeader";

function getCurrentCity(): any {
  const location = JSON.parse(localStorage.getItem("BH_CITY") as string);
  if (!location) {
    return new Promise((resolve, reject) => {
      const curCity = new BMapGL.LocalCity();

      curCity.get(async (res: any) => {
        try {
          const result = await getCityName(res.name);

          localStorage.setItem("BH_CITY", JSON.stringify(result.data.body));
          resolve(result.data.body);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  return Promise.resolve(location);
}

export { getCurrentCity };
