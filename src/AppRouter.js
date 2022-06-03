import { View, Text, StyleSheet, Linking } from "react-native";
import { AuthComponents, PublicComponents } from "./utils/components";
import { LoaderComponent } from "./components/loader/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React, { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "./store";
import { observer } from "mobx-react-lite";
import AlphaLoader from "./components/loader/AlphaLoader";
import { me, refreshToken } from "./http/user";
import { getNews } from "./http/news";
import { getLastsAuth, setLastsAuth } from "./storage/last.auth";

export default AppRouter = observer(() => {
  const { newsStore } = useContext(AppContext);

  const Stack = createNativeStackNavigator();
  const AuthStack = createBottomTabNavigator();

  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    refreshToken()
      .then(async (data) => {
        if (data?.token) {
          await AsyncStorage.setItem("token", data?.token);
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
    return <AlphaLoader />;
  }

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {user.isLoading && <AlphaLoader />}

      <NavigationContainer>
        {user.isAuth ? (
          <AuthStack.Navigator>
            {AuthComponents.map((i) => (
              <AuthStack.Screen
                options={{
                  tabBarStyle: {
                    height: i.name !== "page" && 75,
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
