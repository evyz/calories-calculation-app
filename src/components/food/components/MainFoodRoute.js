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
  Animated,
} from "react-native";
import { AppContext } from "../../../store";
import {
  LIGHT_COLOR,
  LIGHT_GREEN_COLOR,
  GREEN_COLOR,
  GREY_COLOR,
} from "../../../styles/colors";
import { getCategories, getEachProduct } from "../../../http/product";
import { Shadow } from "react-native-shadow-2";
import { shadowOpt } from "../../loader/Loader";
import ApiLoader from "../../loader/ApiLoader";
import { useRef } from "react";

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
    getCategories()
      .then((data) => {
        setCats(data.rows);
      })
      .finally(() => setIsLoading(false));
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
    await getEachProduct({ count: 40, page: 1, cats: chosed })
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
                {cats.map((obj) => (
                  <View key={obj.id}>
                    <TouchableOpacity
                      key={obj.id}
                      style={[styles.eachCat]}
                      onPress={() => updateSelection(obj.name)}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            chosed.find((item) => item === obj.name) !==
                              undefined
                              ? "red"
                              : "black",
                        }}
                      >
                        {obj.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      <View style={styles.outerInput}>
        <Shadow {...litleShadowOpt} startColor="#f5f5f5">
          <View style={styles.search}>
            <TextInput
              placeholder="Поиск"
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
        <Shadow {...litleShadowOpt} startColor="#f0f0f0">
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
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {search &&
              search.map((obj) => (
                <Shadow
                  viewStyle={styles.foodRow}
                  key={obj.id}
                  {...litleShadowOpt}
                >
                  <Text>{obj.name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      user.setIsSelectedProduct(obj);
                      navigation.navigate("EachFoodRoute");
                    }}
                    style={styles.kcal}
                  >
                    <Text>
                      {obj?.kcal}ккал {`(${obj?.grams} гр.)`}
                    </Text>
                    <Text></Text>
                  </TouchableOpacity>
                </Shadow>
              ))}

            <Shadow
              {...litleShadowOpt}
              // shadowOpacity={0.5}

              viewStyle={[
                styles.searchFood,
                { justifyContent: "center", marginVertical: 10, width: 350 },
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
          </View>
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
    backgroundColor: LIGHT_COLOR,
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
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  scroll: {
    width: "100%",
    height: "100%",
    paddingTop: 50,
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
    width: "25%",
    height: 40,
    borderWidth: 3,
    borderColor: LIGHT_GREEN_COLOR,
    borderRadius: 30,
    paddingEnd: 2,
    marginLeft: 10,
  },
  eachCat: {
    display: "flex",
    width: 75,
    height: 60,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GREEN_COLOR,
    borderRadius: 30,
  },
  allCat: {
    display: "flex",
    width: "90%",
    height: 300,
    marginLeft: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingLeft: 20,
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
    width: 320,
    height: 50,
    backgroundColor: LIGHT_COLOR,
    marginTop: 20,
    borderRadius: 30,
    paddingLeft: 20,
    // borderWidth: 1,
    // borderColor: GREY_COLOR,
    // paddingRight: 20,
    // paddingLeft: 10,
    overflow: "hidden",
  },
});

export default MainFoodRoute;
