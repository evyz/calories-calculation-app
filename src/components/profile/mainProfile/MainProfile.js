import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { containerStyles } from "../../../styles/default/container";

export default MainProfileComponent = ({ navigation }) => {

    // ЗАДАЧА: Сверстать по макету профиль здесь.
    //          Ссылка - https://www.figma.com/file/vdoWbzCxWCbAnRcUBaNmJS/LZ-calories-(MAIN)?node-id=0%3A1
    //          Стили разрабатывать ниже в styles

    return (
        <View style={{ ...containerStyles.container }}>
            <Text>MainProfileComponent</Text>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Text>Открыть</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        width: '100%',
        height: '100%'
    },
})