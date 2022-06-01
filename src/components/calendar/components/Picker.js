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
import CalendarPicker from "react-native-calendar-picker";
import {
  DARK_GREY_COLOR,
  GREEN_COLOR,
  GREY_GREEN_COLOR,
  LIGHT_COLOR,
} from "../../../styles/colors";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { BLACK_FONT, BOLD_FONT } from "../../../styles/fonts";
import Stats from "./Stats";

const Picker = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [isActive, setIsActive] = useState(false);

  const arrow = useRef(new Animated.Value(1)).current;
  const arrowSpin = arrow.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-180deg"],
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
              width={330}
              // height={500}
              previousTitle={"<"}
              nextTitle={">"}
              firstDay={0}
              startFromMonday={true}
              textStyle={{ fontFamily: BOLD_FONT }}
              onDateChange={(date) => setStartDate(date)}
            />
          </View>
        </View>

        <Animated.View
          style={{ marginTop: 20, transform: [{ rotate: arrowSpin }] }}
        >
          <TouchableOpacity
            style={styles.touchButton}
            onPress={() => rotateArrow()}
          >
            <Text style={styles.button}>↓</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <Stats selectedDate={startDate} />
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

    backgroundColor: LIGHT_COLOR,
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
    backgroundColor: GREEN_COLOR,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    position: "absolute",
    zIndex: 5,
  },
  calendar: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 30,
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
