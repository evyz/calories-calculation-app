import { iconsContent } from "./foodIconsContent";

const getIcons = (name) => {
  name = name || "cheeze";
  let ligth = iconsContent.icons
    .find((icon) => icon.type === "ligth")
    .arr.find((check) => check.name === name).data;
  let active = iconsContent.icons
    .find((icon) => icon.type === "green")
    .arr.find((check) => check.name === name).data;

  return { ligth, active };
};

export { getIcons };
