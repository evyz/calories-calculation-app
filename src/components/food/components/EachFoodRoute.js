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
import { BOLD_FONT, LIGTH_FONT, MEDIUM_FONT } from "../../../styles/fonts";
import { Shadow } from "react-native-shadow-2";
import { shadowOpt } from "../../loader/Loader";

const EachFoodRoute = observer(({ navigation }) => {
  const [foodName, setFoodName] = useState([]);
  const { user } = useContext(AppContext);

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={{
          alignItems: "flex-start",
          position: "absolute",
          top: 30,
          left: 20,
        }}
        onPress={() => navigation.navigate("mainFoodRoute")}
      >
        <Text>Back</Text>
      </TouchableOpacity>
      {/* <View style={{ width: "90%", height: "100%" }}> */}
      <Shadow {...shadowOpt} color={"black"}>
        <View style={styles.form}>
          <View style={styles.text}></View>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 24,
                color: "black",
                paddingLeft: 20,
                alignItems: "flex-start",
                fontFamily: BOLD_FONT,
              }}
            >
              {user.isSelectedProduct.name}
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 20,
                color: "black",
                paddingLeft: 20,
                alignItems: "flex-start",
                fontFamily: LIGTH_FONT,
              }}
            >
              Калорийность
            </Text>
          </View>
          <Shadow {...shadowOpt} startColor="#F3F3F3">
            <View style={[styles.kcal, { backgroundColor: LIGHT_COLOR }]}>
              <Text style={{ fontFamily: MEDIUM_FONT }}>Ккал: </Text>
              <Text>{user.isSelectedProduct?.kcal}</Text>
            </View>
          </Shadow>
          <View style={styles.mainContainer}>
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "black",
                  paddingLeft: 5,
                  alignItems: "flex-start",
                  fontFamily: LIGTH_FONT,
                }}
              >
                Состав
              </Text>
            </View>
            <Shadow {...shadowOpt} distance={5} startColor="#F3F3F3">
              <View style={[styles.container, { backgroundColor: "#F7D921" }]}>
                <Text style={{ fontFamily: BOLD_FONT, color: LIGHT_COLOR }}>
                  Жиры
                </Text>
                <Text style={{ color: LIGHT_COLOR, fontFamily: BOLD_FONT }}>
                  {user.isSelectedProduct.fats} г
                </Text>
              </View>
            </Shadow>
            <Shadow {...shadowOpt} distance={5} startColor="#F3F3F3">
              <View style={[styles.container, { backgroundColor: "#B0CB1F" }]}>
                <Text style={{ fontFamily: BOLD_FONT, color: LIGHT_COLOR }}>
                  Белки
                </Text>
                <Text style={{ color: LIGHT_COLOR, fontFamily: BOLD_FONT }}>
                  {user.isSelectedProduct.proteins} г
                </Text>
              </View>
            </Shadow>
            <Shadow {...shadowOpt} distance={5} startColor="#F3F3F3">
              <View style={[styles.container, { backgroundColor: "#5B5B5B" }]}>
                <Text style={{ fontFamily: BOLD_FONT, color: LIGHT_COLOR }}>
                  Углеводы
                </Text>
                <Text style={{ color: LIGHT_COLOR, fontFamily: BOLD_FONT }}>
                  {user.isSelectedProduct.carbohydrates} г
                </Text>
              </View>
            </Shadow>
            {/* <Shadow {...shadowOpt} distance={5} startColor="#F3F3F3">
              <View style={[styles.container, { backgroundColor: "#A2D9F7" }]}>
                <Text style={{ fontFamily: MEDIUM_FONT }}>Вода</Text>
              </View>
            </Shadow> */}
            {/* <Shadow {...shadowOpt} distance={5} startColor="#F3F3F3">
              <View style={[styles.container, { backgroundColor: "#B2B3B3" }]}>
                <Text style={{ fontFamily: MEDIUM_FONT }}>Зола</Text>
              </View>
            </Shadow> */}
          </View>
        </View>
      </Shadow>
      {/* </View> */}
    </View>
  );
});
const styles = StyleSheet.create({
  main: {
    flexDirection: "column",

    display: "flex",
    width: "100%",
    height: "100%",

    paddingTop: 60,
    paddingBottom: 60,

    alignItems: "center",
    backgroundColor: LIGHT_COLOR,
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: 370,
    height: "100%",
    justifyContent: "flex-start",
    // backgroundColor: "#DCDCDC",
    backgroundColor: LIGHT_COLOR,
    borderRadius: 30,
    paddingTop: 20,
    alignItems: "center",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    height: "60%",
    // backgroundColor: "#DCDCDC",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: 330,
    height: 50,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 30,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  kcal: {
    display: "flex",
    flexDirection: "row",
    width: 330,
    height: 50,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  text: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 20,
    justifyContent: "space-between",
  },
});
export default EachFoodRoute;
