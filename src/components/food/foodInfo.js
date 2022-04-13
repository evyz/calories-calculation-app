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

const FoodInfo = observer(({ navigation }) => {
  return <View style={styles.main}></View>;
});
const styles = StyleSheet.create({
  main: {
    width: "100%",
    backgroundColor: LIGHT_COLOR,
  },
});
export default FoodInfo;
