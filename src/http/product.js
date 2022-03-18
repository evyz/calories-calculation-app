import { $authHost } from ".";
export const getCategories = async () => {
  const { data } = await $authHost.get("api/category");
  return data;
};
