import { $authHost } from ".";
export const getCategories = async () => {
  const { data } = await $authHost.get("api/category");
  return data;
};
export const getEachProduct = async ({ count, page, cats }) => {
  const categories = cats;
  const result = await $authHost.post(
    "api/product/filters?" + `count=${count}&page=${page}`,
    {
      categories,
    }
  );

  return result.data;
};

export const getCaloriesFromDate = async ({ date }) => {
  const { data } = await $authHost.get("/api/date/", {
    date,
  });
  return data;
};
