import React from "react";

import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { GREEN_COLOR, GREY_COLOR } from "../../styles/colors";
import { BOLD_FONT } from "../../styles/fonts";
export default TitleComponent = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <View style={styles.topComponents}>
        <Text style={styles.wellcome}>Расчёт калорий</Text>

        <View
          style={[styles.circle, { transform: [{ scale: 1 }], marginTop: 30 }]}
        ></View>
      </View>
      <View style={{ width: "100%", height: "30%" }}>
        <View style={styles.auth}>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={{ fontSize: 18 }}>Авторизация</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.reg}> */}
        <View style={styles.auth}>
          <TouchableOpacity
            onPress={() => navigation.navigate("registerStep1")}
          >
            <Text style={{ fontSize: 18 }}>Регистрация</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
  },
  topComponents: {
    flexDirection: "column",
    width: "100%",
    // height: "100%",
    display: "flex",
    alignItems: "center",
  },
  wellcome: {
    fontSize: 24,
    fontFamily: BOLD_FONT,
  },
  auth: {
    width: 300,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GREEN_COLOR,
    borderBottomColor: GREEN_COLOR,
    borderRadius: 30,
  },
  reg: {
    width: 300,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GREEN_COLOR,
    borderBottomColor: GREEN_COLOR,
    borderRadius: 30,
  },

  circle: {
    width: 200,
    height: 200,

    borderRadius: 100,
    backgroundColor: GREY_COLOR,
  },
});
