import { $host, $authHost } from ".";

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password })
  return data
}

export const refreshToken = async () => {
  const { data } = await $authHost.get('api/user/refresh')
  return data
}