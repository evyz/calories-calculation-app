import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  BackHandler,
} from "react-native";
import { getIco, getOneNews } from "../../../http/news";
import { GREEN_COLOR, LIGHT_COLOR } from "../../../styles/colors";
import { BOLD_FONT, LIGTH_FONT } from "../../../styles/fonts";
import RenderHTML from "react-native-render-html";
import { SvgCss, SvgCssUri, SvgUri, SvgXml } from "react-native-svg";
import { url } from "../../../http";
import ApiLoader from "../../loader/ApiLoader";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowLeft from "../../Arrows/ArrowLeft";
dayjs().locale("ru");

const Page = ({ news, setNews }) => {
  const [data, setData] = useState({});
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);

  const cashNews = async (obj) => {
    await AsyncStorage.setItem("old_news", JSON.stringify(obj));
  };

  const getCashNews = async () => {
    return JSON.parse(await AsyncStorage.getItem("old_news"));
  };

  const isCashingNews = async (id) => {
    let check = await AsyncStorage.getItem("old_news");
    if (check) {
      check = JSON.parse(check);
      if (check?.id == id) {
        return true;
      }
      return false;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      news?.id && setNews(null);
      return true;
    });
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", () => {
        news?.id && setNews(null);
        return true;
      });
    };
  }, []);

  useEffect(() => {
    let check = isCashingNews(news?.id);
    check.then((res) => {
      if (res) {
        setIsLoading(false);
        setData(res);
        setIsLoading(false);
        getCashNews().then((result) => {
          setData(result);
        });
      } else {
        getOneNews({ id: news?.id })
          .then((data) => {
            setData(data);
          })
          .finally(() => setIsLoading(false));
      }
    });
  }, [news?.id]);

  const logo = useMemo(() => {
    const link = url + news?.ico;
    if (isLoading) {
      return;
    } else {
      return (
        <View style={styles.ico}>
          <SvgCssUri uri={link} width='100%' height='100%' />
        </View>
      );
    }
  }, [isLoading, news]);

  return (
    <View style={styles.main}>
      {isLoading && <ApiLoader />}
      <View style={[styles.header, { backgroundColor: news?.background }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              cashNews(data);
              setNews({});
            }}
          >
            <ArrowLeft />
          </TouchableOpacity>
          <View>
            <Text style={[{ fontFamily: LIGTH_FONT, fontSize: 14 }]}>
              {dayjs(news?.createdAt).format("DD MMMM, YYYY г.")}
            </Text>
            <Text style={[{ fontFamily: BOLD_FONT, fontSize: 28 }]}>
              {news?.name}
            </Text>
          </View>
          {news?.ico && logo}
        </View>
      </View>

      <View style={styles.content}>
        <ScrollView>
          {data?.News_Contents?.map(
            (block) =>
              block?.type === "html" && (
                <View key={block?.id}>
                  <RenderHTML
                    contentWidth={width}
                    source={{ html: block?.content }}
                  />
                </View>
              )
          )}
          {/* {data?.News_Links?.map(link =>
            <TouchableOpacity key={link?.id} onPress={() => alert(link?.link)}>
              {link?.type === 'telegram' && <TouchableOpacity style={[styles.socialIco, { backgroundColor: GREEN_COLOR }]}>
                <SvgXml width={25} height={25} xml={`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2458 25.7544L19.0932 33.6356C19.0932 33.6356 19.4492 34.373 19.8304 34.373C20.2116 34.373 25.8814 28.4746 25.8814 28.4746L32.1864 16.2966L16.3474 23.72L16.2458 25.7544Z" fill="#C8DAEA"/>
<path d="M20.0212 27.7756L19.4746 33.5848C19.4746 33.5848 19.2458 35.3648 21.0254 33.5848C22.805 31.8048 24.5084 30.4322 24.5084 30.4322" fill="#A9C6D8"/>
<path d="M11.8014 26.8911L0.961133 23.31C0.961133 23.31 -0.334398 22.7771 0.0827627 21.5686C0.168638 21.3194 0.341868 21.1074 0.860081 20.743C3.26199 19.0455 45.3175 3.71938 45.3175 3.71938C45.3175 3.71938 46.505 3.31368 47.2053 3.58352C47.3785 3.63789 47.5344 3.73796 47.657 3.87346C47.7796 4.00897 47.8645 4.17507 47.903 4.35476C47.9787 4.67214 48.0103 4.99867 47.997 5.32491C47.9937 5.60713 47.96 5.86872 47.9345 6.27892C47.6783 10.4691 40.0132 41.7421 40.0132 41.7421C40.0132 41.7421 39.5546 43.5721 37.9115 43.6348C37.5077 43.648 37.1054 43.5786 36.7287 43.4309C36.3519 43.2831 36.0083 43.0599 35.7184 42.7746C32.494 39.9625 21.3495 32.3686 18.8868 30.6986C18.8313 30.6602 18.7845 30.6102 18.7496 30.5519C18.7148 30.4936 18.6926 30.4285 18.6847 30.3608C18.6503 30.1848 18.8391 29.9667 18.8391 29.9667C18.8391 29.9667 38.2447 12.4777 38.761 10.6418C38.801 10.4995 38.65 10.4294 38.4471 10.4917C37.1583 10.9724 14.8152 25.2785 12.3492 26.8574C12.1717 26.9118 11.9841 26.9234 11.8014 26.8911V26.8911Z" fill="white"/>
</svg>
`} />
              </TouchableOpacity>}
            </TouchableOpacity>
          )} */}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",

    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,

    backgroundColor: LIGHT_COLOR,
  },
  header: {
    width: "100%",
    height: "25%",

    padding: 20,

    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  headerLeft: {
    width: "100%",
    height: "100%",

    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  content: {
    width: "100%",
    height: "75%",

    padding: 20,
  },
  ico: {
    width: 100,
    height: 100,

    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: -1,

    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  socialIco: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 5,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  back: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    paddingLeft: 0,
  },
});

export default Page;
