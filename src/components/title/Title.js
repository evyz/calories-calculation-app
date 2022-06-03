import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { GREEN_COLOR, GREY_COLOR, LIGHT_COLOR } from "../../styles/colors";
import { BOLD_FONT, MEDIUM_FONT } from "../../styles/fonts";

import { getLastsAuth } from "../../storage/last.auth";

export default TitleComponent = ({ navigation }) => {
  const [isLoginAlert, setIsLoginAlert] = useState(false);

  const getArr = async () => {
    return await getLastsAuth();
  };

  // useEffect(() => {
  //   getArr().then((arr) => {
  //     console.log(arr);

  //     if (arr.length > 0) {
  //       setIsLoginAlert(true);
  //     }
  //   });
  // }, []);

  return (
    <View style={styles.main}>
      {isLoginAlert && <View style={styles.loginAlert}></View>}

      <View style={styles.topComponents}>
        <Text style={styles.wellcome}>Добро пожаловать!</Text>

        <View
          style={[styles.circle, { transform: [{ scale: 1 }], marginTop: 30 }]}
        ></View>
        <View
          style={{
            width: "90%",
            height: "30%",
            flexDirection: "column",
          }}
        >
          <Text
            style={{ marginTop: 40, fontSize: 18, fontFamily: MEDIUM_FONT }}
          >
            Начните пользоваться приложением
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontFamily: MEDIUM_FONT }}>
              прямо сейчас
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.positionObjs}>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: MEDIUM_FONT,
                color: LIGHT_COLOR,
              }}
            >
              Авторизация
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("registerStep1")}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: MEDIUM_FONT,
                color: LIGHT_COLOR,
              }}
            >
              Регистрация
            </Text>
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
  positionObjs: {
    flexDirection: "column",
    width: "100%",
    height: "30%",
    display: "flex",
    alignItems: "center",
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
    marginTop: 20,
  },
  buttons: {
    width: "90%",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GREEN_COLOR,
    borderBottomColor: GREEN_COLOR,
    borderRadius: 30,
    marginTop: 10,
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
  loginAlert: {
    width: "90%",
    height: 50,

    backgroundColor: GREEN_COLOR,

    position: "absolute",
    bottom: 0,
    left: 0,
  },
});
