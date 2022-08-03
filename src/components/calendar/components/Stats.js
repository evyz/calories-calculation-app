import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BOLD_FONT, LIGTH_FONT } from "../../../styles/fonts";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { getCaloriesFromDate } from "../../../http/product";
import { PieChart } from "react-native-chart-kit";

const Stats = ({ selectedDate, setSelectedDate }) => {
  const [data, setData] = useState({});
  // const chartConfig = {
  //   backgroundGradientFrom: "#1E2923",
  //   backgroundGradientFromOpacity: 0,
  //   backgroundGradientTo: "#08130D",
  //   backgroundGradientToOpacity: 0.5,
  //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  //   strokeWidth: 2, // optional, default 3
  //   barPercentage: 0.5,
  //   useShadowColorFromDataset: false, // optional
  // };
  // const diagram = [
  //   {
  //     name: "Seoul",
  //     population: 21500000,
  //     color: "rgba(131, 167, 234, 1)",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: "Toronto",
  //     population: 2800000,
  //     color: "#F00",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: "Beijing",
  //     population: 527612,
  //     color: "red",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: "New York",
  //     population: 8538000,
  //     color: "#ffffff",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: "Moscow",
  //     population: 11920000,
  //     color: "rgb(0, 0, 255)",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  // ];

  useEffect(() => {
    getCaloriesFromDate({ selectedDate }).then((data) => {
      setData(data);
    });
  }, [selectedDate]);

  return (
    <View style={styles.main}>
      <Text style={{ fontFamily: BOLD_FONT }}>
        {dayjs(selectedDate).format("YYYY MMMM DD")}
      </Text>

      <View
        style={{
          width: "90%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          marginTop: 30,
        }}
      >
        <Text style={{ fontSize: 18, marginTop: 10 }}>
          Ваше потребление сегодня:
        </Text>
      </View>
      {/* <Text>Количество продуктов:{data?.defaultsDate?.count}</Text> */}

      <View
        style={{
          width: "80%",
          height: "70%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <Text style={{ fontFamily: BOLD_FONT }}>Общее количество:</Text> */}
        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontFamily: LIGTH_FONT, fontSize: 16, marginTop: 10 }}>
            Продукты:{data?.defaultsDate?.count}
          </Text>
          <Text style={{ fontFamily: LIGTH_FONT, fontSize: 16, marginTop: 10 }}>
            Калории:{data?.defaultsDate?.kcal}
          </Text>
          <View
            style={{ flexDirection: "row", display: "flex", marginTop: 60 }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 70,
                backgroundColor: "purple",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
            <Text
              style={{ fontFamily: LIGTH_FONT, fontSize: 16, marginLeft: 10 }}
            >
              Жиры:{data?.defaultsDate?.fats}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", display: "flex", marginTop: 20 }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 70,
                backgroundColor: "skyblue",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
            <Text
              style={{ fontFamily: LIGTH_FONT, fontSize: 16, marginLeft: 10 }}
            >
              Белки:{data?.defaultsDate?.proteins}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", display: "flex", marginTop: 20 }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 70,
                backgroundColor: "orange",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
            <Text
              style={{ fontFamily: LIGTH_FONT, fontSize: 16, marginLeft: 10 }}
            >
              Углеводы:{data?.defaultsDate?.carbohydrates}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              backgroundColor: "red",
            }}
          >
            {/* <PieChart
              diagram={diagram}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[10, 50]}
              absolute
            /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Stats;
