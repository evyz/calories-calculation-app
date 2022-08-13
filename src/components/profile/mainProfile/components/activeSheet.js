import { he } from "date-fns/locale";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  DARK_GREY_COLOR,
  GREEN_COLOR,
  GREY_COLOR,
  LIGHT_COLOR,
} from "../../../../styles/colors";
import Avatar from "./Avatar";

const ActiveSheet = ({ isActive, setIsActive }) => {
  const { height } = Dimensions.get("screen");

  useEffect(() => {
    if (isActive) {
      translateY.value = withSpring(0 - 50);
      opacity.value = withSpring(1);
      index.value = withSpring(7);
    } else {
      translateY.value = withSpring(-height / 1.25);
      opacity.value = withSpring(0);
      index.value = withSpring(-1);
    }
  }, [isActive]);

  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const opacity = useSharedValue(0);
  const index = useSharedValue(-1);
  const isDragging = useSharedValue(false);
  const translateY = useSharedValue(-height / 1.25);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const opacityStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const indexStyles = useAnimatedStyle(() => {
    return {
      zIndex: index.value,
    };
  });

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      isDragging.value = true;
    })
    .minDuration(250);

  const start = useSharedValue({ x: 0, y: 0 });
  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onStart(() => {
      start.value = { y: translateY.value };
    })
    .onTouchesMove((_e, state) => {
      if (isDragging.value) {
        state.activate();
      } else {
        state.fail();
      }
    })
    .onUpdate((e) => {
      translateY.value =
        e.translationY + start.value.y > -height / 1.5 &&
        e.translationY + start.value.y < 0 &&
        e.translationY + start.value.y;
      offset.value = {
        x:
          e.translationY + start.value.y > -height / 1.5 &&
          e.translationY + start.value.y < 0 &&
          e.translationX + start.value.x,
        y:
          e.translationY + start.value.y > -height / 1.5 &&
          e.translationY + start.value.y < 0 &&
          e.translationY + start.value.y,
      };
      if (translateY.value < -height / 2.5) {
        opacity.value = withTiming(0.25);
      } else if (
        translateY.value > -height / 2.5 &&
        translateY.value < -height / 3.5
      ) {
        opacity.value = withTiming(0.5);
      } else if (
        translateY.value > -height / 3.5 &&
        translateY.value < -height / 4.0
      ) {
        opacity.value = withTiming(0.75);
      } else {
        opacity.value = withTiming(1);
      }
    })
    .onEnd(() => {
      if (translateY.value < start.value.y) {
        if (translateY.value < start.value.y - 50) {
          runOnJS(setIsActive)(false);
          opacity.value = withSpring(0);
        } else {
          runOnJS(setIsActive)(true);
          translateY.value = withSpring(0 - 50);
          opacity.value = withSpring(1);
          index.value = withSpring(7);
          opacity.value = withSpring(1);
        }
      } else {
        runOnJS(setIsActive)(true);

        opacity.value = withSpring(1);
      }
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
    })
    .simultaneousWithExternalGesture(longPressGesture);

  const composedGesture = Gesture.Race(gesture, longPressGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      <>
        <Animated.View
          style={[
            styles.container,
            { height: height / 1.25, overflow: "hidden" },
            animatedStyles,
          ]}
        >
          <View style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <Avatar isActive={isActive} setIsActive={setIsActive} />
          </View>
          <TouchableOpacity
            style={{
              width: "80%",
              height: 5,
              borderRadius: 10,
              backgroundColor: DARK_GREY_COLOR,
              position: "absolute",
              bottom: 20,
            }}
            onPress={() => setIsActive(!isActive)}
          ></TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            {
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
              position: "absolute",
            },
            opacityStyles,
            indexStyles,
          ]}
        />
      </>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: LIGHT_COLOR,
    position: "absolute",
    top: 0,
    left: 0,

    zIndex: 10,

    display: "flex",
    alignItems: "center",

    borderBottomEndRadius: 25,
    borderBottomLeftRadius: 25,
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 7,
  },
});

export default ActiveSheet;
