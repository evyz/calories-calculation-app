import React, { useRef, useEffect } from 'react'

import { View, Text, StyleSheet, Button, Animated } from "react-native";
import { DARK_GREY_COLOR, GREY_COLOR } from "../../styles/colors";
import { BOLD_FONT } from "../../styles/fonts";

export default TitleComponent = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.wellcome}>Расчёт калорий</Text>

      <View style={[styles.circle, { transform: [{ scale: 1 }] }]}></View>

      <Text>TitleComponent</Text>
      <Button
        title="АВТОРИЗАЦИЯ"
        onPress={() => navigation.navigate("login")}
      />
      <Button
        title="Регистрация"
        onPress={() => navigation.navigate("registerStep1")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wellcome: {
    fontSize: 24,
    fontFamily: BOLD_FONT
  },
  circle: {
    width: 200,
    height: 200,

    borderRadius: 100,
    backgroundColor: GREY_COLOR,
  },
});
