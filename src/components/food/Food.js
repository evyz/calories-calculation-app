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
import { color } from "react-native-reanimated";
// import { createBottomTabNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DrawerActions } from "@react-navigation/native";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { foodRouter } from "./foodRouter";
import MainFoodRoute from "./components/MainFoodRoute";

const Tab = createBottomTabNavigator();
const FoodComponent = observer(({ navigation }) => {
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
  return (
    <View style={styles.main}>
      {/* <Shadow {...shadowOpt} startColor="#F3F3F3"> */}
      {/* <View style={styles.categories}>
        <View style={styles.allCat}>
          {cats.map((obj) => (
            <TouchableOpacity
              key={obj.id}
              style={[styles.eachCat]}
              onPress={() => setChosed([obj.name])}
            >
              <Text style={{ color: chosed[0] === obj.name ? "red" : "black" }}>
                {obj.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View> */}

      <Tab.Navigator
        screenOptions={{
          drawerPosition: "right",
          drawerStyle: {
            width: 240,
          },
          headerStyle: {
            height: 0,
            opacity: 0,
          },
          headerTitleStyle: {
            fontSize: 0,
            color: "red",
          },
          swipeEdgeWidth: 0,
          tabBarStyle: {
            height: 0,
          },
        }}
      >
        {foodRouter.map((route) => (
          <Tab.Screen
            key={route.name}
            name={route.name}
            component={route.component}
          ></Tab.Screen>
        ))}
      </Tab.Navigator>
    </View>
  );
});
export default FoodComponent;

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
});
// backgroundColor: "red",
//   },
//   allSearched: {
//     width: "90%",
//     height: "100%",
//     // backgroundColor: "red",
//     flex: 1,
//   },
//   scroll: {
//     width: "100%",
//     height: "100%",
//     // backgroundColor: "green",
//   },
//   searchFood: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     width: "100%",
//     height: 50,
//     backgroundColor: GREEN_COLOR,
//     marginTop: 20,
//     borderRadius: 30,
//     paddingRight: 20,
//     paddingLeft: 10,
//   },
//   button: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "25%",
//     height: 40,
//     borderWidth: 3,
//     borderColor: LIGHT_GREEN_COLOR,
//     borderRadius: 30,
//     paddingEnd: 2,
//     marginLeft: 10,
//   },
//   eachCat: {
//     display: "flex",
//     width: 50,
//     height: 50,
//     margin: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   allCat: {
//     display: "flex",
//     width: "90%",
//     height: 250,
//     margin: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     flexWrap: "wrap",
//     paddingLeft: 20,
//   },
//   categories: {
//     marginTop: 50,
//     width: "90%",
//     height: 330,
//     flexDirection: "row",
//     display: "flex",
//     alignItems: "center",
//     backgroundColor: "#DCDCDC",
//     borderRadius: 25,
//   },
//   search: {
//     borderRadius: 25,
//     borderColor: GREEN_COLOR,
//     flexDirection: "row",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingLeft: 20,
//     width: "90%",
//     height: 50,
//     backgroundColor: "#DCDCDC",
//     marginTop: 85,
//   },
