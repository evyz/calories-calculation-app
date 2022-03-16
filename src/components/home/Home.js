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

const Home = observer(({ navigation }) => {
  const [news, setNews] = useState([
    { id: 1, title: "1", path: "aaa" },
    { id: 2, title: "2", path: "aaa" },
    { id: 3, title: "3", path: "aaa" },
    { id: 4, title: "4", path: "aaa" },
    { id: 5, title: "5", path: "aaa" },
    { id: 6, title: "6", path: "aaa" },
    { id: 7, title: "7", path: "aaa" },
    { id: 8, title: "8", path: "aaa" },
    { id: 9, title: "9", path: "aaa" },
    { id: 10, title: "10", path: "aaa" },
  ]);

  useEffect(() => {
    getNews().then((data) => {
      console.log(data?.rows);
      setNews(data?.rows);
    });
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Что нового?</Text>
      </View>
      <View style={styles.fakeIcon}></View>
      <View style={styles.newsContainer}>
        <ScrollView contentContainerStyle={styles.newsScroller}>
          {news.map((block) => (
            <View style={styles.outerNewsBlock}>
              <Shadow {...shadowOpt} startColor={"#e3e3e3"}>
                <TouchableOpacity
                  key={block.id}
                  style={[
                    styles.newsBlock,
                    { backgroundColor: block.background },
                  ]}
                >
                  <Text style={styles.newsHeader}>{block.name}</Text>
                  <Text style={styles.time}>{block.createdAt}</Text>
                </TouchableOpacity>
              </Shadow>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: LIGHT_COLOR,
  },
  time: {
    fontFamily: LIGTH_FONT,
    paddingLeft: 15,
  },
  fakeIcon: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    height: 40,
    backgroundColor: GREEN_COLOR,
    borderRadius: 30,
    marginTop: 20,
  },
  textHeader: {
    fontFamily: BOLD_FONT,
    marginTop: 70,
    fontSize: 20,
  },
  newsHeader: {
    fontFamily: BOLD_FONT,
    paddingTop: 20,
    paddingLeft: 15,
  },
  header: {
    width: "100%",
    height: "15%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  newsContainer: {
    width: "100%",
    height: "85%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  newsScroller: {
    paddingTop: "3%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  outerNewsBlock: {
    marginTop: 18,
    marginBottom: 18,
  },
  newsBlock: {
    width: 164,
    height: 215,
    backgroundColor: LIGHT_GREEN_COLOR,
    borderRadius: 23,
  },
});
export default Home;
