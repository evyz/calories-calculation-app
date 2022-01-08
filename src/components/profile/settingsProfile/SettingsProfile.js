import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default SettingsProfileComponent = ({ navigation }) => {
    return (
        <View>
            <Text>SettingsProfileComponent</Text>
            <Button title="Сбросить параметры" onPress={async () => {
                await AsyncStorage.setItem('isWellcome', 'true')
            }} />
        </View>
    )
}