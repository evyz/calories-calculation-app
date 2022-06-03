import AsyncStorage from "@react-native-async-storage/async-storage";

const getLastArr = async () => {
  return await AsyncStorage.getItem("calories@lasts_auth");
};

const setLastArr = async (value) => {
  return await AsyncStorage.setItem(
    "calories@lasts_auth",
    JSON.stringify(value)
  );
};

export const getLastsAuth = async () => {
  return await getLastArr();
};

export const setLastsAuth = async (value) => {
  let arr = await getLastArr();
  if (arr === null) {
    await setLastArr([value]);
  }

  if (arr.length > 0) {
    arr.push(value);
  } else {
    await setLastArr([value]);
  }

  console.log(await getLastsAuth());
};
