import React, { useRef, useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { AppContext } from "../../../store";
import {
  LIGHT_COLOR,
  LIGHT_GREEN_COLOR,
  GREEN_COLOR,
  GREY_COLOR,
  RED_COLOR,
} from "../../../styles/colors";
import {
  calculateCaloriesToApi,
  getCategories,
  getEachProduct,
} from "../../../http/product";
import { BOLD_FONT, LIGTH_FONT, MEDIUM_FONT } from "../../../styles/fonts";
import { Shadow } from "react-native-shadow-2";
import { shadowOpt } from "../../loader/Loader";
import DatePicker from "react-native-datepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import ActiveBottomSheetProduct from "./bottomsheet/activeBottomSheet";
import BottomSheetProduct from "./bottomsheet/bottomSheetProduct";
import ArrowLeft from "../../Arrows/ArrowLeft";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const EachFoodRoute = observer(({ navigation }) => {
  const [foodName, setFoodName] = useState([]);
  const { user } = useContext(AppContext);

  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [grams, setGrams] = useState(0);

  const [isOpened, setIsOpened] = useState(false);

  const calculateCalories = async () => {
    setIsOpened(true);
    // let dateFormat = dayjs(`${date}T${hours}:${minutes}`).format();
    // await calculateCaloriesToApi(user.isSelectedProduct.id, grams, dateFormat).then(data => {
    //   console.log(data)
    // })
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.main}>
        <BottomSheetProduct
          product={user.isSelectedProduct}
          isOpened={isOpened}
          setIsOpened={setIsOpened}
          user={user}
        />
        <TouchableOpacity
          style={{
            alignItems: "flex-start",
            position: "absolute",
            top: 30,
            left: 20,
          }}
          onPress={() => navigation.navigate("mainFoodRoute")}
        >
          <ArrowLeft />
        </TouchableOpacity>
        <Shadow {...shadowOpt} color={"black"}>
          <View style={styles.form}>
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
            <Shadow {...shadowOpt} startColor='#F3F3F3'>
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
              <Shadow {...shadowOpt} distance={5} startColor='#F3F3F3'>
                <View
                  style={[styles.container, { backgroundColor: "#F7D921" }]}
                >
                  <Text style={{ fontFamily: BOLD_FONT, color: LIGHT_COLOR }}>
                    Жиры
                  </Text>
                  <Text style={{ color: LIGHT_COLOR, fontFamily: BOLD_FONT }}>
                    {user.isSelectedProduct.fats} г
                  </Text>
                </View>
              </Shadow>
              <Shadow {...shadowOpt} distance={5} startColor='#F3F3F3'>
                <View
                  style={[styles.container, { backgroundColor: "#B0CB1F" }]}
                >
                  <Text style={{ fontFamily: BOLD_FONT, color: LIGHT_COLOR }}>
                    Белки
                  </Text>
                  <Text style={{ color: LIGHT_COLOR, fontFamily: BOLD_FONT }}>
                    {user.isSelectedProduct.proteins} г
                  </Text>
                </View>
              </Shadow>
              <Shadow {...shadowOpt} distance={5} startColor='#F3F3F3'>
                <View
                  style={[styles.container, { backgroundColor: "#5B5B5B" }]}
                >
                  <Text style={{ fontFamily: BOLD_FONT, color: LIGHT_COLOR }}>
                    Углеводы
                  </Text>
                  <Text style={{ color: LIGHT_COLOR, fontFamily: BOLD_FONT }}>
                    {user.isSelectedProduct.carbohydrates} г
                  </Text>
                </View>
              </Shadow>

              <TouchableOpacity
                onPress={() => calculateCalories()}
                style={{
                  paddingVertical: 18 / 2,
                  paddingHorizontal: 32 / 2,
                  backgroundColor: GREEN_COLOR,
                  borderRadius: 8,
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    fontFamily: BOLD_FONT,
                    fontSize: 16,
                    color: LIGHT_COLOR,
                  }}
                >
                  Расчитать калории
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Shadow>
      </View>
    </GestureHandlerRootView>
  );
});
const styles = StyleSheet.create({
  main: {
    flexDirection: "column",

    display: "flex",
    width: "100%",
    height: "100%",

    paddingTop: 90,
    paddingBottom: 60,

    alignItems: "center",
    backgroundColor: LIGHT_COLOR,
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: 370,
    height: "95%",
    // marginTop: "5%",
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
