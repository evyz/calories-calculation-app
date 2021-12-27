import { Text, TouchableOpacity } from "react-native";

export default DrawerButton = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Text>Открыть</Text>
        </TouchableOpacity>
    )
}