import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Button,
} from "react-native";
import {
  DARK_GREY_COLOR,
  GREEN_COLOR,
  GREY_COLOR,
  GREY_GREEN_COLOR,
  LIGHT_COLOR,
} from "../../../styles/colors";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { BLACK_FONT, BOLD_FONT, LIGTH_FONT, MEDIUM_FONT } from "../../../styles/fonts";
import Stats from "./Stats";
import CalendarPicker from "react-native-calendar-picker";

dayjs.locale('ru')

const Picker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null)
  const [activeDate, setActiveDate] = useState(null)

  const [isRange, setIsRange] = useState(false)

  const [isActive, setIsActive] = useState(false);

  const arrow = useRef(new Animated.Value(1)).current;
  const arrowSpin = arrow.interpolate({
    inputRange: [0, 1],
    outputRange: ["-270deg", "-90deg"],
  });
  const rotateArrow = () => {
    if (isActive) {
      setIsActive(false);
      Animated.timing(arrow, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      setIsActive(true);
      Animated.timing(arrow, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };
  const activeBlock = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (isActive) {
      Animated.timing(activeBlock, {
        toValue: -400,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(activeBlock, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isActive]);

  return (
    <View style={styles.main}>
      <Animated.View
        style={[
          styles.calendarBlock,
          { transform: [{ translateY: activeBlock }] },
        ]}
      >

        <View style={styles.content}>
          <View style={styles.calendar}>
            <CalendarPicker
              headerWrapperStyle={{ width: '70%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}
              startFromMonday={true}
              selectedDayColor={"#3D4DAD"}
              selectedDayTextColor={LIGHT_COLOR}
              onDateChange={(date) => setActiveDate(date)}
              allowRangeSelection={isRange}
              minDate={(date) => setStartDate(date)}
              maxDate={(date) => setEndDate(date)}
              textStyle={{
                fontFamily: LIGTH_FONT,
                fontSize: 14,
                color: DARK_GREY_COLOR
              }}
              todayBackgroundColor={LIGHT_COLOR}
              todayTextStyle={DARK_GREY_COLOR}
              months={['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']}
              weekdays={['ПН', 'ВТ', 'CР', 'ЧТ', 'ПТ', 'СБ', 'ВС']}
              customDayHeaderStyles={() => { return { style: { justifyContent: 'space-between' }, textStyle: { fontFamily: BLACK_FONT, fontSize: 12, } } }}
              nextTitle={'>'}
              previousTitle={'<'}
            />
          </View>

          <Text
            style={{ fontSize: 20, fontFamily: MEDIUM_FONT, marginTop: 20, marginBottom: 5, }}
          >
            Сегодня {dayjs(new Date).format('DD MMMM')}
          </Text>
        </View>

        <Animated.View
          style={{ marginTop: 20, transform: [{ rotate: arrowSpin }] }}
        >
          <TouchableOpacity
            style={styles.touchButton}
            onPress={() => rotateArrow()}
          >
            <Text style={styles.button}>></Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <Stats selectedDate={activeDate} setSelectedDate={setActiveDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  content: {
    width: "90%",
    height: 350,

    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "flex-start",

    backgroundColor: LIGHT_COLOR,
    borderRadius: 30,
    // padding: 10,
    zIndex: 1,
  },
  nav: {
    width: "100%",
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  calendarBlock: {
    width: "100%",
    height: 550,
    display: "flex",
    alignItems: "center",
    backgroundColor: GREEN_COLOR,
    justifyContent: "center",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    position: "absolute",
    zIndex: 5,
  },
  calendar: {
    width: "100%",
    borderRadius: 30,
    zIndex: 1,
    marginTop: 10,
    // backgroundColor: LIGHT_COLOR,
  },
  button: {
    fontSize: 42,
    fontFamily: BOLD_FONT,
    color: LIGHT_COLOR,
  },
  touchButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: LIGHT_COLOR,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Picker;
