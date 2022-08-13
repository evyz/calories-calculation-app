import { View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Picker from "./components/Picker";

const CalendarComponent = () => {
  return (
    <GestureHandlerRootView>
      <View>
        <Picker />
      </View>
    </GestureHandlerRootView>
  );
};
export default CalendarComponent;
