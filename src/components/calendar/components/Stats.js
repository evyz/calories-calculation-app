import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BOLD_FONT, LIGTH_FONT } from "../../../styles/fonts";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { getCaloriesFromDate } from "../../../http/product";
import { PieChart } from "react-native-chart-kit";
import { SvgUri, SvgXml } from "react-native-svg";
import bootsplashFirst from "../../../assets/icos/bootsplashs/first.svg";
import {
  BLUE_COLOR,
  GREEN_COLOR,
  LIGHT_COLOR,
  ORANGE_COLOR,
  PURPLE_COLOR,
  YELLOW_COLOR,
} from "../../../styles/colors";

export const rounded = function (number) {
  return +number.toFixed(2);
};

const Stats = ({ selectedDate, setSelectedDate, navigation }) => {
  const [data, setData] = useState({});
  const { height, width } = Dimensions.get("screen");
  const [diagram, setDiagram] = useState([]);

  console.log("bootsplashFirst ->", bootsplashFirst);

  const xmlIcon = `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" fill="none"/>
  <rect x="27" y="85" width="94" height="32" rx="16" fill="#EBC6BA"/>
  <rect x="10" y="53" width="94" height="32" rx="16" fill="#FFE5DD"/>
  <path d="M0 128C6.58 108.36 13.2 93 19.68 81L34.18 95.5C34.4456 95.7923 34.7677 96.0277 35.1268 96.192C35.486 96.3562 35.8747 96.4459 36.2696 96.4556C36.6644 96.4653 37.057 96.3948 37.4238 96.2484C37.7906 96.102 38.1239 95.8827 38.4035 95.6037C38.6831 95.3248 38.9032 94.9921 39.0505 94.6256C39.1978 94.2592 39.2693 93.8667 39.2605 93.4719C39.2518 93.077 39.1631 92.6881 38.9997 92.3285C38.8363 91.969 38.6017 91.6463 38.31 91.38L22.65 75.73C24.934 71.8143 27.4138 68.0162 30.08 64.35L54 88.25C54.2714 88.5226 54.594 88.739 54.9492 88.8865C55.3044 89.0341 55.6853 89.1101 56.07 89.11C56.8417 89.099 57.5795 88.791 58.13 88.25C58.4012 87.9788 58.6164 87.6569 58.7632 87.3026C58.9099 86.9483 58.9855 86.5685 58.9855 86.185C58.9855 85.8015 58.9099 85.4217 58.7632 85.0674C58.6164 84.7131 58.4012 84.3912 58.13 84.12L33.69 59.7C36.4706 56.2767 39.564 53.1197 42.93 50.27L67.44 74.79C67.7114 75.0626 68.034 75.279 68.3892 75.4265C68.7444 75.5741 69.1253 75.6501 69.51 75.65C70.2817 75.639 71.0195 75.331 71.57 74.79C71.8412 74.5188 72.0564 74.1969 72.2032 73.8426C72.3499 73.4883 72.4255 73.1085 72.4255 72.725C72.4255 72.3415 72.3499 71.9617 72.2032 71.6074C72.0564 71.2531 71.8412 70.9312 71.57 70.66L47.67 46.75C67.27 33.95 81.34 46.66 81.34 46.66C81.34 46.66 118.88 88.19 0 128Z" fill="#191919"/>
  <path d="M85.71 42.29C99.09 2.35 113 15 113 15C113 15 125.65 28.91 85.71 42.29Z" fill="#191919"/>
  <path d="M89.35 45.93C127.05 27.14 128 45.93 128 45.93C128 45.93 127.05 64.71 89.35 45.93Z" fill="#191919"/>
  <path d="M82.07 38.65C100.86 1 82.07 0 82.07 0C82.07 0 63.29 1 82.07 38.65Z" fill="#191919"/>
  </svg>
  `;

  useEffect(() => {
    console.log(selectedDate);
    if (!selectedDate) {
      setSelectedDate(dayjs().format());
    }
    getCaloriesFromDate({ date: selectedDate }).then((data) => {
      setData(data);
      let params = [
        {
          name: `Жиры (${rounded(data?.defaultsDate?.fats)} г.)`,
          population: data?.defaultsDate?.fats,
          color: PURPLE_COLOR,
          legendFontColor: "#7F7F7F",
          legendFontSize: 10,
        },
        {
          name: `Углеводы (${rounded(data?.defaultsDate?.carbohydrates)} г.)`,
          population: data?.defaultsDate?.carbohydrates,
          color: ORANGE_COLOR,
          legendFontColor: "#7F7F7F",
          legendFontSize: 10,
        },
        {
          name: `Белки (${rounded(data?.defaultsDate?.proteins)} г.)`,
          population: data?.defaultsDate?.proteins,
          color: BLUE_COLOR,
          legendFontColor: "#7F7F7F",
          legendFontSize: 10,
        },
      ];
      setDiagram(params);
    });
  }, [selectedDate]);

  return (
    <ScrollView style={styles.main}>
      <View
        style={{
          width: "90%",
          // height: "80%",
          display: "flex",
          flexDirection: "column",
          marginTop: 0,
          marginBottom: 170,
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: BOLD_FONT }}>
          {dayjs(selectedDate).format("DD MMMM YYYY")}
        </Text>
      </View>

      {data?.defaultsDate?.kcal ? (
        <View
          style={{
            width: "100%",
            paddingLeft: 10,
            paddingRight: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text style={{ fontFamily: LIGTH_FONT, fontSize: 16, marginTop: 10 }}>
            Продукты: {data?.defaultsDate?.count}
          </Text>
          <Text style={{ fontFamily: LIGTH_FONT, fontSize: 16, marginTop: 10 }}>
            Общее количество калорий: {data?.defaultsDate?.kcal} ккал
          </Text>
          <View
            style={{
              marginLeft: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: width - 20,
              }}
            >
              <PieChart
                data={diagram}
                width={width - 60}
                height={200}
                chartConfig={{
                  backgroundGradientFrom: "#1E2923",
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientTo: "#08130D",
                  backgroundGradientToOpacity: 0.5,
                  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                  strokeWidth: 2, // optional, default 3
                  barPercentage: 0.5,
                  useShadowColorFromDataset: false, // optional
                }}
                accessor={"population"}
                backgroundColor={"transparent"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

            marginTop: 50,
          }}
        >
          <SvgXml width={150} xml={xmlIcon} />
          <Text style={{ marginTop: 30, fontFamily: BOLD_FONT }}>
            На текущую дату у Вас не расчитаны продукты
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("food")}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 21,
              backgroundColor: GREEN_COLOR,
              marginTop: 20,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                fontFamily: BOLD_FONT,
                fontSize: 18,
                color: LIGHT_COLOR,
              }}
            >
              Расчитать калории
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",

    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default Stats;
