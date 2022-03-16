import { $host, $authHost } from ".";

export const getNews = async () => {
  const { data } = await $authHost.get("/api/news");
  return data;
};

export const getOneNews = async ({ id }) => {
  const { data } = await $authHost.get(`/api/news/${id}`)
  return data
}

export const getIco = async ({ path }) => {
  const { data } = await $authHost.get(path)
  return data
}