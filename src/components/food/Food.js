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
import { getCategories } from "../../http/product";

const FoodComponent = observer(({ navigation }) => {
  const [value, setValue] = useState("");
  const [cats, setCats] = useState([]);
  useEffect(() => {
    getCategories().then((data) => {
      setCats(data.rows);
    });
  }, []);
  return (
    <View style={styles.main}>
      <View style={styles.search}>
        <TextInput placeholder="Поиск" value={value} onChangeText={setValue} />
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
  eachCat: {
    width: 50,
    height: 50,
    backgroundColor: GREEN_COLOR,
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
    backgroundColor: "grey",
    borderRadius: 25,
  },
  search: {
    borderRadius: 25,
    borderColor: GREEN_COLOR,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 20,
    width: "90%",
    height: 50,
    backgroundColor: "grey",
    marginTop: 85,
  },
});
