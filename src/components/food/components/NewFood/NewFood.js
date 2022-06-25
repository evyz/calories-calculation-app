import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { BOLD_FONT, LIGTH_FONT } from "../../../../styles/fonts";
import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, Animated } from "react-native";

import { LIGHT_COLOR } from "../../../../styles/colors";
// import { getCategories, getEachProduct } from "../../../../http/product";
// import { Shadow } from "react-native-shadow-2";
// import { shadowOpt } from "../../../loader/Loader";
// import ApiLoader from "../../../loader/ApiLoader";
// import { useRef } from "react";
// import { Colors } from "react-native/Libraries/NewAppScreen";

const NewFood = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={{ paddingTop: 30 }}
        onPress={() => navigation.navigate("mainFoodRoute")}
      >
        <Text>Назад</Text>
      </TouchableOpacity>
      <Text
        style={{
          marginTop: 30,
          fontSize: 20,
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 20,
          fontStyle: BOLD_FONT,
        }}
      >
        Добавление продукта
      </Text>

      <Text
        style={{
          marginTop: 30,
          fontSize: 16,
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 20,
          fontStyle: LIGTH_FONT,
        }}
      >
        Выберите категорию продукта:
      </Text>
      <View style={styles.typeArea}>
        <TextInput
          style={{ width: "100%", height: "100%", textAlign: "center" }}
        ></TextInput>
      </View>
      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 20,
          fontStyle: LIGTH_FONT,
        }}
      >
        Введите название продукта:
      </Text>

      <View style={styles.typeArea}>
        <TextInput
          style={{ width: "100%", height: "100%", textAlign: "center" }}
        ></TextInput>
      </View>
      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 20,
          fontStyle: LIGTH_FONT,
        }}
      >
        Введите количество калорий на 100г продукта:
      </Text>
      <View style={styles.typeArea}>
        <TextInput
          style={{ width: "100%", height: "100%", textAlign: "center" }}
        ></TextInput>
      </View>

      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 20,
          fontStyle: LIGTH_FONT,
        }}
      >
        Введите количество белков на 100г продукта:
      </Text>
      <View style={styles.typeArea}>
        <TextInput
          style={{ width: "100%", height: "100%", textAlign: "center" }}
        ></TextInput>
      </View>
      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 20,
          fontStyle: LIGTH_FONT,
        }}
      >
        Введите количество жиров на 100г продукта:
      </Text>
      <View style={styles.typeArea}>
        <TextInput
          style={{ width: "100%", height: "100%", textAlign: "center" }}
        ></TextInput>
      </View>
      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 20,
          fontStyle: LIGTH_FONT,
        }}
      >
        Введите количество углеводов на 100г продукта:
      </Text>
      <View style={styles.typeArea}>
        <TextInput
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        ></TextInput>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  typeArea: {
    marginTop: 10,
    marginLeft: 20,
    width: 200,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: LIGHT_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
export default NewFood;
