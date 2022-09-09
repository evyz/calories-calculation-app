import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AppContext } from "../../store";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { profileRouter } from "./profileRouter";
import { BackHandler } from "react-native";
import { useRoute } from "@react-navigation/native";

import "react-native-gesture-handler";

const Profile = ({ navigation }) => {
  const { user } = useContext(AppContext);
  const route = useRoute();

  // function handleBackButtonClick() {
  //   // let isHere = profileRouter.find((check) => check.name === route.name);
  //   // if (isHere) {
  //   // }
  //   console.log(route.name);

  //   // navigation.navigate("main");
  //   return true;
  // }

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener(
  //       "hardwareBackPress",
  //       handleBackButtonClick
  //     );
  //   };
  // }, []);

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        drawerStyle: {
          width: 240,
        },
        headerStyle: {
          height: 0,
          opacity: 0,
        },
        headerTitleStyle: {
          fontSize: 0,
          color: "red",
        },
        swipeEdgeWidth: 0,
      }}
    >
      {profileRouter.map((i) => (
        <Drawer.Screen key={i.name} name={i.name} component={i.component} />
      ))}
    </Drawer.Navigator>
  );
};

export default Profile;
