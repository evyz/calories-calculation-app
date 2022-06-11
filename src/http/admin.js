import { $authHost } from ".";

export const getUsers = async ({ page, limit }) => {
  const { data } = await $authHost.get('/api/admin/user')
  return data
}