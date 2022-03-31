import { $authHost } from ".";
export const getCategories = async () => {
  const { data } = await $authHost.get("api/category");
  return data;
};
export const getEachProduct = async (count, page) => {
  const { data } = await $authHost.get(
    `api/product?count=${count}&page=${page}`
  );
  return data;
};
