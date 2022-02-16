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
import { useRoute } from "@react-navigation/native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const RegIcons = observer(({ navigation }) => {
  return (
    <View style={styles.mainBlock}>
      <View style={styles.text}>
        <Text style={{ fontSize: 24, color: "black" }}>
          Редактируйте профиль
        </Text>
      </View>
      <View style={styles.icon}></View>
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontSize: 18 }}>Выберите аватар</Text>
      </View>
      <View style={styles.mainIcons}>
        <View style={styles.miniIcon}></View>
        <View style={styles.miniIcon}></View>
        <View style={styles.miniIcon}></View>
        <View style={styles.miniIcon}></View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Выберите цвет</Text>
      </View>
      <View style={styles.mainColors}>
        <View
          style={[styles.miniColors, { backgroundColor: "#FFABAB" }]}
        ></View>
        <View
          style={[styles.miniColors, { backgroundColor: "#FFDAAB" }]}
        ></View>
        <View
          style={[styles.miniColors, { backgroundColor: "#ABE4FF" }]}
        ></View>
        <View
          style={[styles.miniColors, { backgroundColor: "#DDFFAB" }]}
        ></View>
        <View
          style={[styles.miniColors, { backgroundColor: "#D9ABFF" }]}
        ></View>
        <View
          style={[styles.miniColors, { backgroundColor: "#ABC2FF" }]}
        ></View>
        <View
          style={[styles.miniColors, { backgroundColor: "#ABFFB8" }]}
        ></View>
        <View
          style={[styles.miniColors, { backgroundColor: "#FFBFAB" }]}
        ></View>
      </View>
      <View style={styles.next}>
        <TouchableOpacity onPress={() => setIsConfirmed(true)}>
          <Text style={{ fontSize: 18, color: LIGHT_COLOR }}>Далее</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  mainBlock: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: LIGHT_COLOR,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  next: {
    height: 50,
    width: "90%",
    margin: 5,
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 24,
    marginTop: 120,
    backgroundColor: GREEN_COLOR,
    borderColor: GREEN_COLOR,
  },
  miniIcon: {
    width: 75,
    height: 75,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: GREEN_COLOR,
  },
  miniColors: {
    width: 75,
    height: 75,
    borderRadius: 150,
    borderWidth: 3,
    margin: 5,
    borderColor: GREEN_COLOR,
  },
  mainColors: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    height: 75,
    marginTop: 10,
    flexWrap: "wrap",
  },
  mainIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    height: 75,
    marginTop: 10,
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 310,
    height: 30,
    marginTop: 60,
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    width: 200,
    height: 200,
    borderWidth: 3,
    borderRadius: 150,
  },
});
export default RegIcons;
