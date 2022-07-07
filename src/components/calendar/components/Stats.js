import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BOLD_FONT, LIGTH_FONT } from "../../../styles/fonts";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { getCaloriesFromDate } from "../../../http/product";

const Stats = ({ selectedDate, setSelectedDate }) => {
  const [data, setData] = useState({});

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
      <Text>Ваше потребление сегодня:</Text>
      <Text>Количество продуктов:{data?.defaultsDate?.count}</Text>
      <View style={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
        <Text style={{ fontFamily: BOLD_FONT }}>Общее количество:</Text>
        <View style={{ marginLeft: 10, }}>
          <Text style={{ fontFamily: LIGTH_FONT }}>Продукты:{data?.defaultsDate?.count}</Text>
          <Text style={{ fontFamily: LIGTH_FONT }}>Калории:{data?.defaultsDate?.kcal}</Text>
          <Text style={{ fontFamily: LIGTH_FONT }}>Жиры:{data?.defaultsDate?.fats}</Text>
          <Text style={{ fontFamily: LIGTH_FONT }}>Белки:{data?.defaultsDate?.proteins}</Text>
          <Text style={{ fontFamily: LIGTH_FONT }}>Углеводы:{data?.defaultsDate?.carbohydrates}</Text>
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
