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
import { Shadow } from "react-native-shadow-2";
import { shadowOpt } from "../../loader/Loader";

const MainFoodRoute = observer(({ navigation }) => {
  const { user } = useContext(AppContext);

  const [value, setValue] = useState("");
  const [search, setSearch] = useState([]);
  const [food, setFood] = useState(false);
  const [cats, setCats] = useState([]);
  const [chosed, setChosed] = useState([]);
  useEffect(() => {
    getCategories().then((data) => {
      setCats(data.rows);
    });
  }, []);

  const getProducts = async () => {
    await getEachProduct({ count: 40, page: 1, cats: chosed }).then((data) => {
      setSearch(data);
      console.log(data.count);
    });
  };

  // alert("a");

  // return (
  //   <View style={{ backgroundColor: "red", width: "100%", height: "100%" }}>
  //     <Text>A</Text>
  //   </View>
  // );

  console.log(user.isSelectedProduct); // --- Здесь состояние продукта

  return (
    <View style={styles.main}>
      <Shadow {...shadowOpt} startColor="#EBEBEB">
        <View style={styles.search}>
          <TextInput
            placeholder="Поиск"
            value={value}
            onChangeText={setValue}
          />

          <TouchableOpacity onPress={() => getProducts()} style={styles.button}>
            <Text>Найти</Text>
          </TouchableOpacity>
        </View>
      </Shadow>
      <Shadow {...shadowOpt} startColor="#EBEBEB">
        <View style={styles.categories}>
          <View style={styles.allCat}>
            {cats.map((obj) => (
              <TouchableOpacity
                key={obj.id}
                style={[styles.eachCat]}
                onPress={() => setChosed([obj.name])}
              >
                <Text
                  style={{ color: chosed[0] === obj.name ? "red" : "black" }}
                >
                  {obj.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Shadow>
      <View style={styles.allSearched}>
        <ScrollView style={styles.scroll}>
          <Text>{search?.count}</Text>
          {search?.rows &&
            search?.rows.map((obj) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    user.setIsSelectedProduct(obj);
                    navigation.navigate("EachFoodRoute");
                  }}
                  key={obj.id}
                  style={styles.searchFood}
                >
                  <Text>{obj.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
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
    justifyContent: "space-around",
    backgroundColor: LIGHT_COLOR,
  },
  allSearched: {
    width: "90%",
    height: "100%",
    // backgroundColor: "red",
    flex: 1,
  },
  scroll: {
    width: "100%",
    height: "100%",
    // backgroundColor: "green",
  },
  searchFood: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: 50,
    backgroundColor: GREEN_COLOR,
    marginTop: 20,
    borderRadius: 30,
    paddingRight: 20,
    paddingLeft: 10,
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
    width: 50,
    height: 50,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  allCat: {
    display: "flex",
    width: "90%",
    height: 250,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingLeft: 20,
  },
  categories: {
    marginTop: 50,
    width: 350,
    height: 330,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    backgroundColor: LIGHT_COLOR,
    borderRadius: 25,
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
    marginTop: 85,
  },
});

export default MainFoodRoute;
