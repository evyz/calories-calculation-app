import React from "react";
import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
} from "react-native";
import { AppContext } from "../../../store";
import {
  LIGHT_COLOR,
  LIGHT_GREEN_COLOR,
  GREEN_COLOR,
  GREY_COLOR,
  RED_COLOR,
} from "../../../styles/colors";
import { getCategories, getEachProduct } from "../../../http/product";

const EachFoodRoute = ({ navigation }) => {
  return <View style={styles.main}></View>;
};
const styles = StyleSheet.create({
  main: {
    display: "flex",
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    backgroundColor: LIGHT_COLOR,
  },
});
export default EachFoodRoute;
