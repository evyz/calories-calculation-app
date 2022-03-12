import { $host, $authHost } from ".";

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password })
  return data
}