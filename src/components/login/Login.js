import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native"
import { AppContext } from "../../store";

import { useRoute } from "@react-navigation/native";

import language from '../../utils/language.json'

export default LoginComponent = observer(({ navigation }) => {

    const { user } = useContext(AppContext)

    const authChangeHandler = () => {
        user.setIsAuth(true)
    }

    useEffect(() => {
        language.components.forEach(y => {
            if (y.name === useRoute().name) {
                console.log(y.ru)
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            {/* <Text>{info.title}</Text> */}
            <Button onPress={() => authChangeHandler()} title="Авторизоваться" />
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
