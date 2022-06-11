const roles = [
  { system_name: "user", en: "user", ru: 'пользователь' },
  { system_name: "admin", en: "admin", ru: 'администратор' },
]

export const getRole = (system_name, value) => {
  if (value === "system_name" || value === "en" || value === "ru") {
    return roles.find(role => role.system_name === system_name)[value]
  }
  return null
}