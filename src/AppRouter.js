import {
  View,
  Text,
  StyleSheet,
  Linking,
  Platform,
  Alert,
  Button,
} from "react-native";
import { AuthComponents, PublicComponents } from "./utils/components";
import { LoaderComponent } from "./components/loader/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";

import AppLoading from "expo-app-loading";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { AppContext } from "./store";
import { observer } from "mobx-react-lite";
import AlphaLoader from "./components/loader/AlphaLoader";
import { me, refreshToken } from "./http/user";
import { getNews } from "./http/news";
import { getLastsAuth, setLastsAuth } from "./storage/last.auth";
import { getCaloriesFromDate } from "./http/product";
import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");

// import NotificationIndex from "./components/Notifications";
// import { w3cwebsocket as W3CWebSocket } from "websocket";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'lzcalories',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }

// async function schedulePushNotification() {

//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here' },
//       // sound: 'notifications-first.wav', // Provide ONLY the base filename
//     },
//     trigger: { seconds: 2 },
//   });
// }

export default AppRouter = observer(() => {
  const { newsStore } = useContext(AppContext);

  const [isPaused, setIsPaused] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [mobileNotif, setMobileNotif] = useState(null);

  const Stack = createNativeStackNavigator();
  const AuthStack = createBottomTabNavigator();

  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenFromStorage, setToken] = useState("");

  const netInfo = useNetInfo();

  // const ws = useRef('')

  // useEffect(() => {
  //   if (!isPaused && user.isAuth) {
  //     ws.current = new WebSocket(`ws://lzcalories.ru/api/ws?authorization=${tokenFromStorage}`); // создаем ws соединение
  //     ws.current.onopen = () => console.log("Соединение открыто");  // callback на ивент открытия соединения
  //     ws.current.onclose = () => console.log("Соединение закрыто"); // callback на ивент закрытия соединения

  //     gettingData();
  //   }

  //   return () => ws.current?.close(); // кода меняется isPaused - соединение закрывается
  // }, [ws, isPaused]);

  // const gettingData = useCallback(() => {
  //   if (!ws.current) return;

  //   ws.current.onmessage = e => {                //подписка на получение данных по вебсокету
  //     if (isPaused) return;
  //     const message = JSON.parse(e.data);
  //     console.log('---->>>>>', message);
  //     // setMobileNotif(message)
  //   };
  // }, [isPaused]);

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  useEffect(() => {
    if (netInfo.isConnected === false) {
      Alert.alert(
        "Ошибка: Internet disconnected",
        "Ошибка в подключении к интернету. Перезапустите мобильное приложение или проверьте интернет-соединение."
      );
      setIsLoading(true);
    } else if (netInfo.isConnected) {
      setIsLoading(false);
    }
  }, [netInfo]);

  useEffect(() => {
    setIsLoading(true);
    refreshToken()
      .then(async (data) => {
        if (data?.token) {
          await AsyncStorage.setItem("token", data?.token);
          setToken(data?.token);
          me().then((data) => {
            const obj = {
              avatar: {
                color: data["Avatars_Back"]?.color,
                ico: data["Avatars_Ico"],
              },
              role: data["Role"]?.name,
              profile: {
                createdAt: data?.createdAt,
                email: data?.email,
                id: data?.id,
                name: data?.name,
              },
            };
            user.setProfile(obj);
            getNews()
              .then((data) => {
                newsStore.setNews(data?.rows);
                newsStore.setCount(data?.count);
                getCaloriesFromDate({ date: dayjs().format() }).then((data) => {
                  user.setTodayCalories(data);
                });
              })
              .finally(() => setIsLoading(false));
          });
          user.setIsAuth(true);

          return;
        }
        return user.setIsAuth(false);
      })
      .finally(() => setIsLoading(false));
  }, [user]);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {user.isLoading && <AlphaLoader />}
      {isLoading && <AlphaLoader />}

      <NavigationContainer>
        {user.isAuth ? (
          <AuthStack.Navigator>
            {AuthComponents.map((i) => (
              <AuthStack.Screen
                options={{
                  tabBarStyle: {
                    height: i.name !== "page" && 60,
                  },
                  headerShown: false,
                  headerTitle: null,

                  tabBarIcon: ({ focused }) =>
                    i.name !== "page" && <i.icon focused={focused} />,
                  tabBarLabel: () => {
                    return null;
                  },
                }}
                // ЗАДАЧА: Настроить language.json со всеми компонентами
                //          для русификации.
                //          Также настроить поиск в массиве нужного
                //          компонента с русификацией и передавать
                //          объект с выбранным языком из AsyncStorage
                key={i.name}
                name={i.name}
                component={i.component}
              />
            ))}
          </AuthStack.Navigator>
        ) : (
          <Stack.Navigator>
            {PublicComponents.map((i) => (
              <Stack.Screen
                options={{
                  headerShown: false,
                  headerTitle: null,
                  tabBarLabel: () => {
                    return null;
                  },
                }}
                key={i.name}
                name={i.name}
                component={i.component}
              />
            ))}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
