import { $authHost } from ".";
export const getCategories = async () => {
  const { data } = await $authHost.get("api/category");
  return data;
};
export const getEachProduct = async ({ count, page, cats, name }) => {
  const categories = cats;
  const result = await $authHost.post(
    "api/product/filters?" + `count=${count}&page=${page}`,
    {
      categories,
      name,
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

export const createNewProduct = async ({
  name,
  category,
  grams,
  fats,
  carbohydrates,
  proteins,
  kcal,
}) => {
  const { data } = await $authHost.post("/api/product/", {
    name,
    category,
    grams,
    fats,
    carbohydrates,
    proteins,
    kcal,
  });

  return data;
};

export const calculateCaloriesToApi = async (id, grams, date) => {
  const { data } = await $authHost.post(`/api/user-product/${id}`, {
    date, grams
  })

  return data
}