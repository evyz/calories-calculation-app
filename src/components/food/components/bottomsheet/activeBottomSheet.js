import React from "react";
import { Dimensions, View } from "react-native";
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { GREEN_COLOR, LIGHT_COLOR } from "../../../../styles/colors";

const ActiveBottomSheetProduct = ({ status, setStatus }) => {
  const { height } = Dimensions.get("screen");

  const isPressed = useSharedValue(false);
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const checkedOffset = useSharedValue(0);
  const offset = useSharedValue({ x: 0, y: 0 });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
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
        e.translationY + start.value.y > -height / 1.5 + 130 &&
        e.translationY + start.value.y < 0 &&
        e.translationY + start.value.y;

      console.log("aaa");
    })

    .onEnd(() => {
      console.log("aaa");
      if (translateY.value > -height / 5) {
        translateY.value = withSpring(-height / 1.5 + 170);
      } else {
        translateY.value = withSpring(0);
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
    <GestureHandlerRootView>
      <>
        <Animated.View
          style={{
            width: "100%",
            height: height / 2.5,
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 200,
            backgroundColor: GREEN_COLOR,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        ></Animated.View>
      </>
    </GestureHandlerRootView>
  );
};

export default ActiveBottomSheetProduct;
