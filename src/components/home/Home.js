import React from "react";
import { useState, useEffect, useContext, useMemo } from "react";
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
import { SvgUri, SvgCssUri } from "react-native-svg";
import { url } from "../../http";
import Page from "./page/Page";
import ApiLoader from "../loader/ApiLoader";

import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs().locale("ru");

const Home = observer(({ navigation }) => {
  const { newsStore } = useContext(AppContext);

  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedNews, setSelectedNews] = useState({});

  useEffect(() => {
    if (newsStore.news.length < 1) {
      return getNews()
        .then((data) => {
          setNews(data?.rows);
        })
        .finally(() => setIsLoading(false));
    }
    setNews(newsStore.news);
    setIsLoading(false);
  }, []);

  return (
    <View style={styles.main}>
      {isLoading && <ApiLoader />}

      {selectedNews?.id && (
        <Page news={selectedNews} setNews={setSelectedNews} />
      )}

      <View style={styles.header}>
        <View>
          <TouchableOpacity
            style={{
              alignItems: "flex-start",
              position: "absolute",
              top: 30,
              left: 20,
            }}
            onPress={() => navigation.navigate("TitleComponent")}
          >
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textHeader}>Что нового?</Text>
      </View>
      <View style={styles.fakeIcon}></View>

      <View style={styles.newsContainer}>
        <ScrollView contentContainerStyle={styles.newsScroller}>
          {news.map((block) => (
            <View key={block?.id} style={styles.outerNewsBlock}>
              {/* <Shadow {...shadowOpt} startColor={"#e3e3e3"}> */}
              <TouchableOpacity
                onPress={() => setSelectedNews(block)}
                key={block.id}
                style={[
                  styles.newsBlock,
                  { backgroundColor: block.background },
                ]}
              >
                <Text style={styles.newsHeader}>{block.name}</Text>
                <Text style={styles.time}>
                  {dayjs(block.createdAt).format("DD MMMM")}
                </Text>
                <View style={styles.newsIco}>
                  {block?.ico && (
                    <SvgCssUri
                      uri={url + block?.ico}
                      width="100%"
                      height="100%"
                    />
                  )}
                </View>
              </TouchableOpacity>
              {/* </Shadow> */}
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
    paddingBottom: "3%",
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
  newsIco: {
    width: 75,
    height: 75,

    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
export default Home;
