import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
} from "react-native";
import { AppContext } from "../../store";
import {
  LIGHT_COLOR,
  LIGHT_GREEN_COLOR,
  GREEN_COLOR,
  GREY_COLOR,
  RED_COLOR,
} from "../../styles/colors";
import { observer } from "mobx-react-lite";
import { Shadow } from "react-native-shadow-2";
import { shadowOpt } from "../loader/Loader";
import { getNews } from "../../http/news";
import { BOLD_FONT } from "../../styles/fonts";
import { LIGTH_FONT } from "../../styles/fonts";
import { getCategories, getEachProduct } from "../../http/product";

const FoodComponent = observer(({ navigation }) => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState([]);
  const [food, setFood] = useState(false);
  const [cats, setCats] = useState([]);
  useEffect(() => {
    getCategories().then((data) => {
      setCats(data.rows);
    });
  }, []);
  useEffect(() => {
    if (food) {
      getEachProduct(40, 1).then((data) => {
        setSearch(data);
        console.log(data);
      });
    }
  }, [food]);

  return (
    <View style={styles.main}>
      <View style={styles.search}>
        <TextInput placeholder="Поиск" value={value} onChangeText={setValue} />

        <TouchableOpacity onPress={() => setFood(true)} style={styles.button}>
          <Text>Найти</Text>
        </TouchableOpacity>
      </View>
      {/* <Shadow {...shadowOpt} startColor="#F3F3F3"> */}
      <View style={styles.categories}>
        <View style={styles.allCat}>
          {cats.map((obj) => (
            <View key={obj.id} style={styles.eachCat}>
              <Text>{obj.name}</Text>
            </View>
          ))}
        </View>
      </View>
      {/* </Shadow> */}
      <View style={{ width: "90%", height: "30%" }}>
        <Text>{search?.count}</Text>
        {search?.rows &&
          search?.rows.map((obj) => (
            <View key={obj.id} style={styles.searchFood}>
              <Text>{obj.name}</Text>
            </View>
          ))}
      </View>
    </View>
  );
});
export default FoodComponent;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: LIGHT_COLOR,
  },
  searchFood: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 30,
    backgroundColor: GREY_COLOR,
    marginTop: 20,
  },
  button: {
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
    width: 50,
    height: 50,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  allCat: {
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
    width: "90%",
    height: 330,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
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
    width: "90%",
    height: 50,
    backgroundColor: "#DCDCDC",
    marginTop: 85,
  },
});
