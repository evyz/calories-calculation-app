import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { GREEN_COLOR, GREY_COLOR, LIGHT_COLOR } from "../../styles/colors";
import { BOLD_FONT, MEDIUM_FONT } from "../../styles/fonts";

import { getLastsAuth } from "../../storage/last.auth";
import LastAuth from "./lastAuth";

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
          style={{
            width: "90%",
            height: "30%",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              fontFamily: MEDIUM_FONT,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Начните пользоваться приложением
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              // width: "100%",
              // alignItems: "center",
              // justifyContent: "center",
              // textAlign: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: MEDIUM_FONT,
                width: "100%",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              прямо сейчас
            </Text>
          </View>
        </View>
        <LastAuth navigation={navigation} />
      </View>

      <View style={styles.positionObjs}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("login")}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: MEDIUM_FONT,
                color: LIGHT_COLOR,
                // width: "100%",
                // height: "100%",
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              Авторизация
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
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

  loginAlert: {
    width: "90%",
    height: 50,

    backgroundColor: GREEN_COLOR,

    position: "absolute",
    bottom: 0,
    left: 0,
  },
});
