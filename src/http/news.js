import { $host, $authHost } from ".";

export const getNews = async () => {
  const { data } = await $authHost.get("api/news");
  return data;
};
