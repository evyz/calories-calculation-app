import { View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Picker from "./components/Picker";

const CalendarComponent = ({ navigation }) => {
  return (
    <GestureHandlerRootView>
      <View>
        <Picker navigation={navigation} />
      </View>
    </GestureHandlerRootView>
  );
};
export default CalendarComponent;
