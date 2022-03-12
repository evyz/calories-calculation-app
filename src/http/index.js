import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://lzcalories.ru/'

const $host = axios.create({
  baseURL: url
})

const $authHost = axios.create({
  baseURL: url
})

const authInterceptor = async config => {
  config.headers.authorization = `Bearer ${await AsyncStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
  $host,
  $authHost
}