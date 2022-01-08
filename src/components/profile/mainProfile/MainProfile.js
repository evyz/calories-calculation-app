import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { AppContext } from "../../../store";
import { DARK_GREY_COLOR, GREEN_COLOR, RED_COLOR } from "../../../styles/colors";
import { containerStyles } from "../../../styles/default/container";
import { shadowOpt } from "../../loader/Loader";
import Buttons from "./components/Buttons";

const MainProfileComponent = observer(({ navigation }) => {

    const { user } = useContext(AppContext)

    // ЗАДАЧА: Сверстать по макету профиль здесь.
    //          Ссылка - https://www.figma.com/file/vdoWbzCxWCbAnRcUBaNmJS/LZ-calories-(MAIN)?node-id=0%3A1
    //          Стили разрабатывать ниже в styles


    return (
        <View style={{ ...containerStyles.container, display: "flex", alignItems: 'center', justifyContent: 'center' }}>

            <Shadow {...shadowOpt}>
                <View style={styles.block}>
                    <Text>MainProfileComponent</Text>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Text>Открыть</Text>
                    </TouchableOpacity>

                    <Buttons />

                </View>

            </Shadow>

        </View>
    )
})

const styles = StyleSheet.create({
    block: {
        width: 300,
        height: 600,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'white',
        borderRadius: 25,
    },
})

export default MainProfileComponent