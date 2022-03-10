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

const RegIcons = observer(({ navigation }) => {
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedIcon, setSelectedIcon] = useState(false);
  const [unselectedColor, setUnselectedColor] = useState([
    { color: "#FFABAB" },
    { color: "#FFDAAB" },
    { color: "#DDFFAB" },
    { color: "#ABE4FF" },
    { color: "#D9ABFF" },
    { color: "#ABC2FF" },
    { color: "#ABFFB8" },
    { color: "#FFBFAB" },
  ]);
  const [unselectedIcon, setUnselectedIcon] = useState([
    { icon: "1" },
    { icon: "2" },
    { icon: "3" },
    { icon: "4" },
  ]);

  return (
    <View style={styles.mainBlock}>
      <View style={styles.text}>
        <Text style={{ fontSize: 24, color: "black" }}>
          Редактируйте профиль
        </Text>
      </View>
      <View style={[styles.icon, { backgroundColor: selectedColor.color }]}>
        <Text>{selectedIcon.icon}</Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontSize: 18 }}>Выберите аватар</Text>
      </View>
      <View style={styles.mainIcons}>
        {unselectedIcon.map((y) => (
          <TouchableOpacity
            style={styles.miniIcon}
            onPress={() => setSelectedIcon(y)}
          >
            <Text>{y.icon}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Выберите цвет</Text>
      </View>
      <View style={styles.mainColors}>
        {unselectedColor.map((y) => (
          <TouchableOpacity
            onPress={() => setSelectedColor(y)}
            style={[styles.miniColors, { backgroundColor: y.color }]}
          ></TouchableOpacity>
        ))}
      </View>
      <View style={styles.next}>
        <TouchableOpacity onPress={() => navigation.navigate("registerStep3")}>
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
  mainTopBlock: {
    width: "90%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    borderColor: GREEN_COLOR,
  },
});
export default RegIcons;
