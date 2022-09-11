import React from "react";
import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext } from "react";
import CheckBox from "@react-native-community/checkbox";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Animated,
} from "react-native";
import { AppContext } from "../../../store";
import {
  LIGHT_COLOR,
  LIGHT_GREEN_COLOR,
  GREEN_COLOR,
  GREY_COLOR,
  DARK_GREY_COLOR,
  LIGTH_BG_COLOR,
} from "../../../styles/colors";
import { getCategories, getEachProduct } from "../../../http/product";
import { Shadow } from "react-native-shadow-2";
import { shadowOpt } from "../../loader/Loader";
import ApiLoader from "../../loader/ApiLoader";
import { useRef } from "react";
import { BOLD_FONT, LIGTH_FONT } from "../../../styles/fonts";
import { SvgXml } from "react-native-svg";

export const litleShadowOpt = {
  startColor: "#f7f7f7",
  offset: [0, 0],
  radius: 50,
  distance: 10,
  opacity: 0.5,
};

const MainFoodRoute = observer(({ navigation }) => {
  const { user } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  const [value, setValue] = useState("");
  const [search, setSearch] = useState([]);
  const [food, setFood] = useState(false);
  const [cats, setCats] = useState([]);
  const [chosed, setChosed] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [isOpenedFilters, setIsOpenedFilters] = useState(false);
  const isActiveFilters = useRef(new Animated.Value(1)).current;
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [activePage, setActivePage] = useState(1);

  const xml = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L10.5 10.5" stroke="white" stroke-linecap="round"/>
<path d="M10.5 1L1 10.5" stroke="white" stroke-linecap="round"/>
</svg>
`;

  useEffect(() => {
    if (isActiveFilters) {
      Animated.timing(isActiveFilters, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(isActiveFilters, {
        toValue: -400,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpenedFilters]);

  useEffect(() => {
    if (!user.categories.length) {
      getCategories({ page: 1, count: 40 })
        .then((data) => {
          setCats(data.rows);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
      setCats(user.categories);
    }
  }, []);

  const updateSelection = (name) => {
    if (chosed.length > 0) {
      let arr = [];
      let status = false;
      chosed.forEach((item) => {
        if (item !== name) {
          arr.push(item);
        } else {
          status = true;
        }
      });
      if (!status) {
        arr.push(name);
      }
      setChosed(arr);
      return;
    }
    setChosed([name]);
  };

  const getProducts = async () => {
    setIsLoading(true);
    let filter = {
      count: 40,
      page: activePage,
      name: value,
    };
    if (chosed.length) {
      filter.cats = chosed;
    }
    await getEachProduct(filter)
      .then((data) => {
        setSearch(data.rows);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.main}>
      {isLoading && <ApiLoader />}

      {isOpenedFilters && (
        <TouchableOpacity
          style={styles.windowFilters}
          onPress={() => setIsOpenedFilters(false)}
        >
          <TouchableOpacity activeOpacity={1}>
            <View style={styles.categories}>
              <View style={styles.allCat}>
                <ScrollView
                  style={styles.catsScroll}
                  contentContainerStyle={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {cats.map((obj) => (
                    <TouchableOpacity
                      key={obj.id}
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      onPress={() => updateSelection(obj.name)}
                    >
                      <View key={obj.id} style={[styles.eachCat]}>
                        {chosed.find((item) => item === obj.name) !==
                          undefined && (
                          <SvgXml xml={xml} width={"70%"} height={"70%"} />
                        )}
                      </View>

                      <Text
                        style={{
                          fontSize: 14,
                          color: DARK_GREY_COLOR,
                        }}
                      >
                        {obj.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      <View style={styles.outerInput}>
        <Shadow {...litleShadowOpt} startColor='#f5f5f5'>
          <View style={styles.search}>
            <TextInput
              placeholder='Поиск'
              value={value}
              onChangeText={setValue}
            />

            <TouchableOpacity
              onPress={() => getProducts()}
              style={styles.button}
            >
              <Text>Найти</Text>
            </TouchableOpacity>
          </View>
        </Shadow>
        <Shadow {...litleShadowOpt} distance={5} startColor='#f0f0f0'>
          <View style={styles.filterButton}>
            <TouchableOpacity
              onPress={() => setIsOpenedFilters(true)}
              style={styles.filterInnerButton}
            >
              <Text style={styles.filterText}>Категории</Text>
            </TouchableOpacity>
          </View>
        </Shadow>
      </View>

      <View style={styles.allSearched}>
        <ScrollView style={styles.scroll}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              display: "flex",
              marginBottom: 100,
            }}
          >
            {search &&
              search.map((obj) => (
                <Shadow
                  viewStyle={[
                    styles.foodRow,
                    search.length < 10 && { height: 100, borderRadius: 24 },
                  ]}
                  key={obj.id}
                  {...litleShadowOpt}
                  distance={0}
                  startColor='rgba(0,0,0,0)'
                >
                  {/* <View style={[styles.foodRow]}> */}
                  <View style={{ width: "40%" }}>
                    <Text>{obj.name}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      user.setIsSelectedProduct(obj);
                      navigation.navigate("EachFoodRoute");
                    }}
                    style={[
                      styles.kcal,
                      search.length < 10 && {
                        width: "45%",
                        height: 100,
                        borderTopLeftRadius: 35,
                        borderBottomLeftRadius: 35,
                      },
                    ]}
                  >
                    {search.length < 10 && (
                      <View
                        style={{
                          width: 100,
                          height: 100,
                          backgroundColor: GREEN_COLOR,
                          position: "absolute",
                          left: -25,
                          borderRadius: 100,
                        }}
                      ></View>
                    )}
                    <Text
                      style={{ color: LIGHT_COLOR, fontFamily: LIGTH_FONT }}
                    >
                      {obj?.kcal}ккал {`(${obj?.grams} гр.)`}
                    </Text>
                  </TouchableOpacity>
                  {/* </View> */}
                </Shadow>
              ))}
            <Shadow
              {...litleShadowOpt}
              distance={0}
              startColor='rgba(0,0,0,0)'
              viewStyle={[
                styles.searchFood,
                {
                  justifyContent: "center",
                  marginVertical: 10,
                  width: 350,
                  marginBottom: 50 + 55,
                },
              ]}
            >
              <Text>Не нашли нужный продукт?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("NewFoodRoute")}
              >
                <Text
                  style={{
                    color: GREEN_COLOR,
                    textDecorationColor: GREEN_COLOR,
                    textDecorationLine: "underline",
                  }}
                >
                  Добавьте его.
                </Text>
              </TouchableOpacity>
            </Shadow>
            {/* <Shadow
              {...litleShadowOpt}
              distance={0}
              startColor='rgba(0,0,0,0)'
              viewStyle={[
                styles.searchFood,
                {
                  justifyContent: "center",
                  marginVertical: 10,
                  width: 350,
                  marginBottom: 50,
                },
              ]}
            >
              <Text>Не нашли нужный продукт?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("NewFoodRoute")}
              >
                <Text
                  style={{
                    color: GREEN_COLOR,
                    textDecorationColor: GREEN_COLOR,
                    textDecorationLine: "underline",
                  }}
                >
                  Добавьте его.
                </Text>
              </TouchableOpacity>
            </Shadow> */}
          </View>
          <View
            style={{ display: "flex", alignItems: "center", width: "100%" }}
          ></View>
          <View style={{ height: 50 }}></View>
          {/* </View> */}
        </ScrollView>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: LIGTH_BG_COLOR,
  },
  mainAlert: {
    width: "100%",
    height: "100%",
    backgroundColor: LIGHT_COLOR,
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    top: 0,
    left: 0,
  },
  allSearched: {
    width: "120%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  scroll: {
    width: "100%",
    height: "100%",

    paddingTop: 20,

    // alignItems: "center",
    // justifyContent: "center",

    // backgroundColor: "green",
  },
  searchFood: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
    backgroundColor: LIGHT_COLOR,
    marginTop: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: GREY_COLOR,
    overflow: "hidden",
  },
  kcal: {
    width: "50%",
    height: "100%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    backgroundColor: GREEN_COLOR,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: 47,
    borderWidth: 1.5,
    borderColor: GREEN_COLOR,
    borderRadius: 30,
    paddingEnd: 2,
    marginLeft: 10,
  },
  eachCat: {
    display: "flex",
    width: 20,
    height: 20,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GREEN_COLOR,
    borderRadius: 3,
  },
  allCat: {
    display: "flex",
    width: "90%",
    height: 300,
    marginLeft: 7,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingLeft: 20,
  },
  catsScroll: {
    width: "100%",
    height: "100%",
  },
  categories: {
    // marginTop: 40,
    width: 350,
    height: 350,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    backgroundColor: LIGHT_COLOR,
    borderRadius: 25,
    marginBottom: 50,
  },
  search: {
    borderRadius: 25,
    borderColor: GREEN_COLOR,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    width: 350,
    height: 50,
    backgroundColor: LIGHT_COLOR,
    // marginTop: 30,
    borderBottomLeftRadius: 0,
    position: "relative",
  },
  filterButton: {
    width: 100,
    height: 40,

    backgroundColor: LIGHT_COLOR,
    borderRadius: 25,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    zIndex: 4,

    // position: 'absolute',

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  filterInnerButton: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  outerInput: {
    width: 350,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    marginTop: "20%",
  },
  windowFilters: {
    width: "100%",
    height: "100%",

    backgroundColor: "rgba(0,0,0,0.3)",

    position: "absolute",
    top: 0,
    left: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  foodRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 350,
    height: 50,
    backgroundColor: LIGHT_COLOR,
    marginTop: 20,
    borderRadius: 30,
    paddingLeft: 20,
    overflow: "hidden",

    // borderWidth: 1,
    // borderColor: GREY_COLOR,
    // paddingRight: 20,
    // paddingLeft: 10,
  },
});

export default MainFoodRoute;
