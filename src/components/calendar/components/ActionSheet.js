import React, { useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { GREEN_COLOR, LIGHT_COLOR } from "../../../styles/colors";
import {
  GestureDetector,
  PanGestureHandler,
  Gesture,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  cond,
  eq,
  timing,
  withSpring,
  interpolate,
  Extrapolate,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const ActionSheet = ({ content }) => {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const opacity = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const translateY = useSharedValue(0);
  const zIndexPos = useSharedValue(7);

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      isDragging.value = true;
    })
    .minDuration(250);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const opacityStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      zIndex: zIndexPos.value,
    };
  });

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
        e.translationY + start.value.y > -height / 1.5 + 130 &&
        e.translationY + start.value.y < 0 &&
        e.translationY + start.value.y;
      offset.value = {
        x:
          e.translationY + start.value.y > -height / 1.5 + 130 &&
          e.translationY + start.value.y < 0 &&
          e.translationX + start.value.x,
        y:
          e.translationY + start.value.y > -height / 1.5 + 130 &&
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
        translateY.value = withSpring(-height / 1.5 + 170);
        opacity.value = withSpring(0);
        zIndexPos.value = withTiming(-1);
      } else {
        translateY.value = withSpring(0 - 50);
        opacity.value = withSpring(1);
        zIndexPos.value = withTiming(7);
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
        <Animated.View style={[styles.container, animatedStyles]}>
          <View
            style={{
              width: "100%",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              zIndex: 3,
            }}
          >
            {content}
          </View>

          <View>
            <TouchableOpacity
              onPress={(e) => {
                if (translateY.value < -20) {
                  translateY.value = withSpring(0 - 50);
                  opacity.value = withSpring(1);
                } else {
                  translateY.value = withSpring(-height / 1.5 + 170);
                  opacity.value = withSpring(0);
                }
              }}
              style={styles.grabber}
            ></TouchableOpacity>
          </View>
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
          ]}
        />
      </>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,

    padding: 15,

    backgroundColor: GREEN_COLOR,

    width: width,
    height: height / 1.5,

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  grabber: {
    width: width / 1.5,
    height: 10,
    borderRadius: 20,
    backgroundColor: LIGHT_COLOR,
  },
});

export default ActionSheet;
