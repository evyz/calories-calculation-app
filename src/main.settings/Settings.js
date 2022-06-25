import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
} from "react-native";
import { AppContext } from "../../store";
import {
  LIGHT_COLOR,
  LIGHT_GREEN_COLOR,
  GREEN_COLOR,
  GREY_COLOR,
  RED_COLOR,
} from "../../styles/colors";
import { observer } from "mobx-react-lite";
import { Shadow } from "react-native-shadow-2";
import { shadowOpt } from "../loader/Loader";
import { getNews } from "../../http/news";
import { BOLD_FONT } from "../../styles/fonts";
import { LIGTH_FONT } from "../../styles/fonts";
import { getCategories, getEachProduct } from "../../http/product";
import { color } from "react-native-reanimated";
// import { createBottomTabNavigator } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { foodRouter } from "./foodRouter";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainFoodRoute from "./components/MainFoodRoute";

const Settings = observer(({ navigation }) => {
  return (
    <View>
      <Text>Привет</Text>
    </View>
  );
});

export default Settings;
