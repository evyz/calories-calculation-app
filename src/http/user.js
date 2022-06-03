import { $host, $authHost } from ".";

export const login = async (email, password) => {
  const { data, config } = await $host.post("/api/user/login", {
    email,
    password,
  });
  return data;
};

export const register = async (name, email, password) => {
  const { data } = await $host.post("/api/user/register", {
    name,
    email,
    password,
  });
  return data;
};

export const refreshToken = async () => {
  const { data } = await $authHost.get("/api/user/refresh");
  return data;
};

export const logout = async () => {
  const { data } = await $authHost.post("/api/user/logout");
  return data;
};

export const me = async () => {
  const { data } = await $authHost.get("/api/user/me");
  return data;
};

export const getAvatars = async ({ count, page }) => {
  const { data } = await $authHost.get(
    `/api/avatar/get-all?count=${count}&&page=${page}`
  );
  return data;
};

export const getColors = async () => {
  const { data } = await $authHost.get(`/api/avatar/colors`);
  return data;
};

export const uploadAvatar = async ({ path, color }) => {
  const { data } = await $authHost.post(`/api/avatar/`, { path, color });
  return data;
};

export const getAvatar = async () => {
  const { data } = await $authHost.get(`/api/avatar/`);
  return data;
};

export const changePassword = async ({ password, newPassword }) => {
  const { data } = await $authHost.post("/api/user/change-password", {
    password,
    newPassword,
  });
  return data;
};
