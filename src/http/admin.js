import { $authHost } from ".";

export const getUsers = async ({ page, limit }) => {
  const { data } = await $authHost.get('/api/admin/user')
  return data
}

export const getNotCofirmedProduct = async (page) => {
  page = page || 1
  const { data } = await $authHost.get(`/api/admin/product/not-confirmed?page=${page}`)
  return data
}

export const confirmProduct = async (id) => {
  if (!id) { return }
  const { data } = await $authHost.post(`/api/admin/product/confirm/${id}`)
  return data
}