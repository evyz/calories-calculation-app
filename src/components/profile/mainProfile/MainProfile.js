import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { AppContext } from "../../../store";
import { containerStyles } from "../../../styles/default/container";
import { shadowOpt } from "../../loader/Loader";
import Buttons from "./components/Buttons";

import { GREEN_COLOR } from '../../../styles/colors'

const MainProfileComponent = observer(({ navigation }) => {

    const { user } = useContext(AppContext)

    // ЗАДАЧА: Сверстать по макету профиль здесь.
    //          Ссылка - https://www.figma.com/file/vdoWbzCxWCbAnRcUBaNmJS/LZ-calories-(MAIN)?node-id=0%3A1
    //          Стили разрабатывать ниже в styles


    return (
        <View style={{ ...containerStyles.container, display: "flex", alignItems: 'center', justifyContent: 'center' }}>

            <Shadow {...shadowOpt}>
                <View style={styles.block}>

                    <View style={styles.avatar}>

                    </View>

                    <Text style={styles.nickname}>Никнейм</Text>

                    <View style={styles.emailView}>
                        <Shadow {...shadowOpt} startColor="#F3F3F3">
                            <TextInput style={styles.emailInput} placeholder="Ваша почта" />
                        </Shadow>
                    </View>

                    {/* <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Text>Открыть</Text>
                    </TouchableOpacity> */}

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

    nickname: {
        fontFamily: 'montserrat-bold',
        fontSize: 18,
    },

    emailView: {
        marginTop: 30,
        marginBottom: 200, // --- Убрать потом!
    },

    emailInput: {
        width: 250,
        height: 35,

        padding: 10,
        fontSize: 12,

        backgroundColor: "white",
        borderRadius: 15,
    },

    avatar: {
        width: 160,
        height: 160,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 160,

        borderWidth: 5,
        borderColor: GREEN_COLOR,

        marginBottom: 20,
    },
})

export default MainProfileComponent