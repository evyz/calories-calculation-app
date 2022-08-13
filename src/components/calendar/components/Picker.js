import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Easing,
  Button,
  Dimensions,
  Animated,
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
import {
  BLACK_FONT,
  BOLD_FONT,
  LIGTH_FONT,
  MEDIUM_FONT,
} from "../../../styles/fonts";
import Stats from "./Stats";
import CalendarPicker from "react-native-calendar-picker";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import ActionSheet from "./ActionSheet";
import TestBall from "./TestBall";

dayjs.locale("ru");

const Picker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeDate, setActiveDate] = useState();

  const [isRange, setIsRange] = useState(false);

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

  const { height } = Dimensions.get("screen");
  return (
    <View style={styles.main}>
      <ActionSheet
        content={
          <>
            <View
              style={{
                backgroundColor: LIGHT_COLOR,
                borderRadius: 10,
                padding: 5,
              }}
            >
              <CalendarPicker
                headerWrapperStyle={{
                  width: "70%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
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
                  color: DARK_GREY_COLOR,
                }}
                todayBackgroundColor={LIGHT_COLOR}
                todayTextStyle={DARK_GREY_COLOR}
                months={[
                  "Январь",
                  "Февраль",
                  "Март",
                  "Апрель",
                  "Май",
                  "Июнь",
                  "Июль",
                  "Август",
                  "Сентябрь",
                  "Октябрь",
                  "Ноябрь",
                  "Декабрь",
                ]}
                weekdays={["ПН", "ВТ", "CР", "ЧТ", "ПТ", "СБ", "ВС"]}
                customDayHeaderStyles={() => {
                  return {
                    style: { justifyContent: "space-between" },
                    textStyle: { fontFamily: BLACK_FONT, fontSize: 12 },
                  };
                }}
                nextTitle={">"}
                previousTitle={"<"}
              />
            </View>
            <Text
              style={{
                fontFamily: MEDIUM_FONT,
                fontSize: 20,
                marginTop: 20,
                color: LIGHT_COLOR,
              }}
            >
              {dayjs(activeDate).format("DD MMMM")}
            </Text>
          </>
        }
      />

      <Stats selectedDate={activeDate} setSelectedDate={setActiveDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: "#F3F4F9",
  },
  header: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHandle: {
    width: 40,
    height: 2,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 4,
  },
  item: {
    padding: 20,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    marginVertical: 10,
  },
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
    flexDirection: "column",
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
