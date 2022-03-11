import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { AppContext } from "../../store";
import { useRoute } from "@react-navigation/native";
import language from "../../utils/language.json";
import { GREEN_COLOR, LIGHT_COLOR, RED_COLOR } from "../../styles/colors";

let symbols = /[0-9a-zA-Z!@#$%^&*]{6,}/g;

export default LoginComponent = observer(({ navigation }) => {
    const [value, setValue] = useState("");
    const [value1, setValue1] = useState("");
    const [isRemember, setIsRemember] = useState(false);
    const [security, setSecurity] = useState(true);
    const { user } = useContext(AppContext);
    const [password, setPassword] = useState('')
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
    const shadowOpt = {
        width: 100,
        height: 100,
        color: "#000",
        border: 2,
        radius: 3,
        opacity: 0.2,
        x: 0,
        y: 3,
        style: { marginVertical: 5 },
    };
    const authChangeHandler = () => {
        user.setIsLoading(true)
        if (passwordDirty) {
            user.setIsAuth(false)
            user.setIsLoading(false)
        } else {
            user.setIsAuth(true)
            setTimeout(() => user.setIsLoading(false), 1000)
        }
    };

    const blurHandler = (e) => {
        console.log(e.nativeEvent.text)
        setPassword(e.nativeEvent.text)
        if (e.nativeEvent?.text.length < 6) {
            setPasswordError('Вы не ввели пароль')
            setPasswordDirty(true)
        } else {
            setPasswordError('')
            setPasswordDirty(false)
        }
    }


    return (
        <View style={styles.main}>
            <View style={styles.block}>
                <View style={styles.image} />
                <View style={styles.form}>
                    <Text style={{ fontSize: 24, fontFamily: "montserrat-bold" }}>
                        Авторизация
                    </Text>
                    {/* fontFamily: 'montserrat-black', */}
                    <View style={styles.input}>
                        <TextInput
                            onChangeText={setValue}
                            value={value}
                            placeholder="Введите почту"
                            autoCorrect={false}
                            autoCapitalize={"none"}
                            keyboardType="default"
                        />
                    </View >
                    <View style={styles.error}>
                        {passwordDirty && <Text style={{ color: RED_COLOR, fontSize: 9 }}>{passwordError}</Text>}
                    </View>
                    <View style={[styles.input2, { borderColor: passwordDirty ? RED_COLOR : GREEN_COLOR, }]}>

                        <TextInput
                            // onBlur={e => blurHandler(e)}
                            onEndEditing={(e) => blurHandler(e)}
                            value={password}
                            secureTextEntry={security}
                            onChangeText={setValue1}
                            value={value1}
                            placeholder="Введите пароль"
                            autoCorrect={false}
                            autoCapitalize={"none"}
                            keyboardType="default"
                        />
                    </View>
                    <View style={styles.questions}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 10 }}>Забыли пароль?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.question2} onPress={() => setIsRemember(!isRemember)}>
                            <View style={isRemember ? styles.activeMiniButton : styles.miniButton} />
                            <Text style={{ fontSize: 10 }}> Запомнить меня</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity></TouchableOpacity>
                    <TouchableOpacity>
                        {/* <Button color="#32CD32" onPress={() => authChangeHandler()} title="Авторизоваться" /> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => authChangeHandler()}
                    >
                        <Text style={{ color: LIGHT_COLOR }}>Войти</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 400,
    },
    error: {
        width: 250,
        height: 36,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'flex-end',
        // backgroundColor: 'grey'

    },
    block: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: 300,
        height: 500,
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        // borderColor: '#FFB6C1',
        // backgroundColor:'white'
    },
    miniButton: {
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 15,
        borderColor: GREEN_COLOR

    },
    activeMiniButton: {
        width: 10,
        height: 10,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: GREEN_COLOR,
        borderColor: GREEN_COLOR
    },
    image: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: GREEN_COLOR,
        width: 300,
        height: 100,
    },
    questions: {
        display: "flex",
        flexDirection: "row",
        height: 20,
        width: 250,
        margin: 5,
        justifyContent: 'space-between',
        alignItems: 'center'


    },
    question2: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center'
    },
    input: {
        width: 250,
        height: 36,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: GREEN_COLOR,
        borderRadius: 15,
        marginTop: 20,
        fontSize: 12,
    },
    input2: {
        width: 250,
        height: 36,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderStyle: "solid",
        borderWidth: 1,
        // borderColor: passwordDirty ? RED_COLOR : GREEN_COLOR,
        borderRadius: 15,
        marginTop: 7,
    },
    button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 142,
        height: 31,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: GREEN_COLOR,
        backgroundColor: GREEN_COLOR,
        margin: 20


    },
});
