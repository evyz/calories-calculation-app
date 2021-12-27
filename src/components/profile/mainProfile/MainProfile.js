import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { containerStyles } from "../../../styles/default/container";
import { useDrawerStatus } from '@react-navigation/drawer';


export default MainProfileComponent = ({ navigation }) => {

    // useEffect(() => {
    //     const isDrawerOpen = useDrawerStatus() === 'open';
    //     console.log(isDrawerOpen)

    // }, [navigation])

    return (
        <View style={{ ...containerStyles.container }}>
            <Text>MainProfileComponent</Text>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Text>Открыть</Text>
            </TouchableOpacity>
        </View>
    )
}