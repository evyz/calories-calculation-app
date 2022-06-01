import { $authHost } from ".";
export const getCategories = async () => {
  const { data } = await $authHost.get("api/category");
  return data;
};
export const getEachProduct = async ({ count, page, cats }) => {
  const categories = cats;
  const result = await $authHost.get(
    "api/product?" + `count=${count}&page=${page}`,
    { categories }
  );

  console.log(cats);

  return result.data;
};
