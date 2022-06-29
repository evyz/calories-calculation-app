import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { BOLD_FONT, LIGTH_FONT, MEDIUM_FONT } from "../../../../styles/fonts";
import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, Animated } from "react-native";
import { createNewProduct, getCategories } from "../../../../http/product";

import { GREEN_COLOR, LIGHT_COLOR } from "../../../../styles/colors";
import MainFoodRoute from "../MainFoodRoute";
import ApiLoader from "../../../loader/ApiLoader";
// import { getCategories, getEachProduct } from "../../../../http/product";
// import { Shadow } from "react-native-shadow-2";
// import { shadowOpt } from "../../../loader/Loader";
// import ApiLoader from "../../../loader/ApiLoader";
// import { useRef } from "react";
// import { Colors } from "react-native/Libraries/NewAppScreen";

const NewFood = ({ navigation }) => {
  const NewProdCats = async () => {
    setGetCategoryOf(true);
  };

  const [getCategoryOf, setGetCategoryOf] = useState(false);
  const [categoryList, setCaregoryList] = useState([]);
  const [typed, setTyped] = useState("");
  const [inputError, setInputError] = useState(false);
  const [inputError2, setInputError2] = useState(false);
  const [inputError3, setInputError3] = useState(false);
  const [inputError4, setInputError4] = useState(false);
  const [inputError5, setInputError5] = useState(false);
  const [inputError6, setInputError6] = useState(false);
  const [name, setName] = useState("");
  const [ccal, setCcal] = useState(0);
  const [belk, setBelk] = useState(0);
  const [jiry, setJiry] = useState(0);
  const [ugl, setUgl] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCategories().then((data) => {
      console.log(data);
      setCaregoryList(data.rows);
    });
  }, []);

  useEffect(() => {
    if (typed.length > 0) {
      setInputError(false);
    }
    if (name.length > 0) {
      setInputError2(false);
    }
    if (ccal > 0) {
      setInputError3(false);
    }
    if (belk > 0) {
      setInputError4(false);
    }
    if (jiry > 0) {
      setInputError5(false);
    }
    if (ugl > 0) {
      setInputError6(false);
    }
  }, [typed, name, ccal, belk, jiry, ugl]);

  const CheckOut = async () => {
    if (typed.length === 0) {
      return setInputError(true);
    }
    if (name.length === 0) {
      return setInputError2(true);
    }
    if (ccal === 0) {
      return setInputError3(true);
    }
    if (belk === 0) {
      return setInputError4(true);
    }
    if (jiry === 0) {
      return setInputError5(true);
    }
    if (ugl === 0) {
      return setInputError6(true);
    }
    setIsLoading(true);
    await createNewProduct({
      name,
      category: typed,
      grams: 100,
      fats: jiry,
      carbohydrates: ugl,
      proteins: belk,
      kcal: ccal,
    })
      .then((data) => {
        console.log(data);
        setName("");
        setTyped("");
        setCcal("");
        setUgl("");
        setJiry("");
        setBelk("");
        alert("Продукт был успешно создан!");
        navigation.navigate("mainFoodRoute");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.main}>
      {isLoading && <ApiLoader />}
      {getCategoryOf && (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: 0,
            left: 0,
            zIndex: 10000,
            paddingTop: 30,
          }}
        >
          <View
            style={{
              width: "90%",
              height: "80%",
              backgroundColor: LIGHT_COLOR,
              borderRadius: 25,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: BOLD_FONT,
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              Укажите категорию продукта:
            </Text>

            <View
              style={{
                width: "100%",
                height: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ScrollView style={{ width: "80%" }}>
                {categoryList.map((category) => (
                  <View
                    style={{ width: "80%", marginTop: 30 }}
                    key={category.id}
                  >
                    <View
                      style={{
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        display: "flex",
                      }}
                    >
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          backgroundColor: GREEN_COLOR,
                          borderRadius: 60,
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                          display: "flex",
                          marginRight: 10,
                        }}
                      ></View>
                      <TouchableOpacity
                        onPress={() => {
                          setTyped(category.name);
                          setGetCategoryOf(false);
                          setInputError(true);
                        }}
                      >
                        <Text style={{ fontSize: 16, fontFamily: MEDIUM_FONT }}>
                          {category.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setGetCategoryOf(false)}
            style={{
              width: "100%",
              height: "150%",
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
            }}
          ></TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={{ paddingTop: 30 }}
        onPress={() => navigation.navigate("mainFoodRoute")}
      >
        <Text>Назад</Text>
      </TouchableOpacity>
      <Text
        style={{
          marginTop: 7,
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
          marginTop: 10,
          fontSize: 16,
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 20,
          fontFamily: LIGTH_FONT,
        }}
      >
        Выберите категорию продукта:
      </Text>

      <View style={[styles.typeArea, { position: "relative" }]}>
        <TouchableOpacity
          onPress={() => setGetCategoryOf(!getCategoryOf)}
          style={[
            {
              width: "100%",
              height: "100%",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            inputError && styles.emptyInput,
          ]}
        >
          <Text>{typed}</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 20,
          fontFamily: LIGTH_FONT,
        }}
      >
        Введите название продукта:
      </Text>

      <View style={styles.typeArea}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={[
            { width: "100%", height: "100%", textAlign: "center" },
            inputError2 && styles.emptyInput,
          ]}
        ></TextInput>
      </View>
      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 20,
          fontFamily: LIGTH_FONT,
        }}
      >
        Введите количество калорий на 100г продукта:
      </Text>
      <View style={styles.typeArea}>
        <TextInput
          value={ccal}
          onChangeText={setCcal}
          style={[
            { width: "100%", height: "100%", textAlign: "center" },
            inputError3 && styles.emptyInput,
          ]}
        ></TextInput>
      </View>

      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 20,
          fontFamily: LIGTH_FONT,
        }}
      >
        Введите количество белков на 100г продукта:
      </Text>

      <View style={styles.typeArea}>
        <TextInput
          value={belk}
          onChangeText={setBelk}
          style={[
            { width: "100%", height: "100%", textAlign: "center" },
            inputError4 && styles.emptyInput,
          ]}
        ></TextInput>
      </View>
      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 20,
          fontFamily: LIGTH_FONT,
        }}
      >
        Введите количество жиров на 100г продукта:
      </Text>
      <View style={styles.typeArea}>
        <TextInput
          value={jiry}
          onChangeText={setJiry}
          style={[
            { width: "100%", height: "100%", textAlign: "center" },
            inputError5 && styles.emptyInput,
          ]}
        ></TextInput>
      </View>
      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 20,
          fontFamily: LIGTH_FONT,
        }}
      >
        Введите количество углеводов на 100г продукта:
      </Text>
      <View style={styles.typeArea}>
        <TextInput
          value={ugl}
          onChangeText={setUgl}
          style={[
            {
              width: "100%",
              height: "100%",
              textAlign: "center",
            },
            inputError6 && styles.emptyInput,
          ]}
        ></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => CheckOut()}
        style={{
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          width: 200,
          height: 50,
          borderRadius: 25,
          borderColor: GREEN_COLOR,
          backgroundColor: GREEN_COLOR,
          marginTop: 15,
          marginLeft: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontFamily: MEDIUM_FONT }}>
          Создать продукт
        </Text>
      </TouchableOpacity>
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
    borderWidth: 2,
    borderColor: GREEN_COLOR,

    backgroundColor: LIGHT_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyInput: {
    width: 200,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: LIGHT_COLOR,
  },
});
export default NewFood;
