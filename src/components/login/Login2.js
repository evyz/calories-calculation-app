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
  Alert,
} from "react-native";
import { AppContext } from "../../store";
import { useRoute } from "@react-navigation/native";
import language from "../../utils/language.json";
import {
  GREEN_COLOR,
  GREY_COLOR,
  LIGHT_COLOR,
  RED_COLOR,
} from "../../styles/colors";
import { login, me } from "../../http/user";
import VisibleIcon from "../../icons/visible/visibleIcon";
import ApiLoader from "../loader/ApiLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLastsAuth } from "../../storage/last.auth";
import ArrowLeft from "../Arrows/ArrowLeft";

let symbols = /[0-9a-zA-Z!@#$%^&*]{6,}/g;

export default LoginComponent = observer(({ navigation }) => {
  const { user } = useContext(AppContext);

  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [security, setSecurity] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState("Почта не может быть пустой");
  const [isSecurity, setIsSecurity] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

  const [isTrusted, setIsTrusted] = useState(false);

  const authChangeHandler = () => {
    if (passwordDirty) {
      user.setIsAuth(false);
    } else {
      setIsLoading(true);
      login(value, value1)
        .then((data) => {
          if (data?.status === 404) {
            setIsLoading(false);
            if (data?.message === "Неверный пароль") {
              setPasswordDirty(true);
              setPasswordError(data?.message);
            }
            if (data?.message === "Неверная почта") {
              setEmailDirty(true);
              setEmailError(data?.message);
            }
            Alert.alert("Ошибка авторизации", data?.message);
          }
          if (data?.token) {
            AsyncStorage.setItem("token", data?.token);

            me().then(async (data) => {
              const obj = {
                avatar: {
                  color: data["Avatars_Back"]?.color,
                  ico: data["Avatars_Ico"],
                },
                role: data["Role"]?.name,
                profile: {
                  createdAt: data?.createdAt,
                  email: data?.email,
                  id: data?.id,
                  name: data?.name,
                },
              };

              Alert.alert(
                "Доверять этому устройству?",
                "Если Вы разрешите доверять этому устройству, то в случае выхода из аккаунта вы сможете быстро зайти заново на аккаунт",
                [
                  {
                    text: "Да",
                    onPress: async () => {
                      await AsyncStorage.setItem(
                        "calories@auth_users",
                        JSON.stringify({
                          name: obj?.profile?.name,
                          email: obj?.profile?.email,
                          avatar: obj?.avatar,
                          password: value1,
                        })
                      );
                    },
                  },
                  {
                    text: "Нет",
                    onPress: async () => {
                      user.setAuthPass(null);
                      await AsyncStorage.setItem(
                        "calories@auth_users",
                        JSON.stringify({
                          name: obj?.profile?.name,
                          email: obj?.profile?.email,
                          avatar: obj?.avatar,
                        })
                      );
                    },
                  },
                ]
              );

              user.setProfile(obj);
              setTimeout(() => setIsLoading(false), 500);
              user.setIsAuth(true);
              setLastsAuth(value);
            });
          }
        })
        .finally(() => setTimeout(() => setIsLoading(false), 500));
    }
  };

  const blurHandler = (e) => {
    setPassword(e.nativeEvent.text);
    if (e.nativeEvent?.text.length === 0) {
      setPasswordError("Укажите пароль");
      setPasswordDirty(true);
    } else {
      setPasswordError("");
      setPasswordDirty(false);
    }
  };

  const blurHandlerMail = (e) => {
    if (e.nativeEvent?.text.length === 0) {
      setEmailError("Укажите пароль");
      setEmailDirty(true);
    } else {
      setEmailError("");
      setEmailDirty(false);
    }
  };

  useEffect(() => {
    if (user.authInput) {
      setValue(user.authInput);
    }
    if (user.authPass) {
      setValue1(user.authPass);
    }
  }, [user.authInput]);

  return (
    <View style={styles.main}>
      {isLoading && <ApiLoader focused={isLoading} />}
      <TouchableOpacity onPress={() => navigation.navigate("title")}>
        <ArrowLeft />
      </TouchableOpacity>
      <View style={styles.text}>
        <Text style={{ fontSize: 24 }}>Войдите в аккаунт</Text>
        <Text style={{ fontSize: 16 }}>С возвращением!</Text>
        <Text style={{ fontSize: 16 }}>Войдите и пользуйтесь.</Text>
      </View>
      <View
        style={[
          styles.input,
          { borderBottomColor: emailDirty ? RED_COLOR : GREY_COLOR },
        ]}
      >
        <TextInput
          onEndEditing={(e) => blurHandlerMail(e)}
          onChangeText={setValue}
          value={value}
          placeholder='Почта'
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType='default'
          style={styles.innerInput}
        />
      </View>
      <View style={styles.question}>
        {emailDirty ? (
          <Text style={{ color: RED_COLOR, fontSize: 14 }}>{emailError}</Text>
        ) : (
          <Text></Text>
        )}
      </View>
      <View
        style={[
          styles.input2,
          { borderBottomColor: passwordDirty ? RED_COLOR : GREY_COLOR },
        ]}
      >
        <TextInput
          onEndEditing={(e) => blurHandler(e)}
          value={value1}
          onChangeText={setValue1}
          secureTextEntry={isSecurity}
          placeholder='Пароль'
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType='default'
          style={[styles.innerInput]}
        />
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => setIsSecurity(!isSecurity)}
        >
          <VisibleIcon focused={isSecurity} />
        </TouchableOpacity>
      </View>
      <View style={styles.question}>
        {passwordDirty ? (
          <Text style={{ color: RED_COLOR, fontSize: 14 }}>
            {passwordError}
          </Text>
        ) : (
          <Text></Text>
        )}
        <TouchableOpacity>
          <Text style={{ fontSize: 14, color: GREEN_COLOR }}>
            Забыли пароль?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.login}>
        <TouchableOpacity
          style={{
            width: "100%",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => authChangeHandler()}
        >
          <Text style={{ fontSize: 18, color: LIGHT_COLOR }}>Войти</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.reg}>
        <Text>Нет аккаунта?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("registerStep1")}>
          <Text style={{ color: GREEN_COLOR }}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: LIGHT_COLOR,
  },
  text: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 30,
    width: "90%",
  },

  input: {
    width: "90%",
    paddingLeft: 10,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: 0,
    borderBottomColor: GREY_COLOR,
    marginTop: 20,
    fontSize: 12,
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    marginTop: 60,
  },
  input2: {
    width: "90%",
    paddingLeft: 10,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: 0,
    borderBottomColor: GREY_COLOR,
    marginTop: 20,
    fontSize: 12,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  innerInput: {
    width: "80%",
  },
  login: {
    display: "flex",
    flexDirection: "row",
    height: 50,
    width: "90%",
    margin: 5,
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 24,
    marginTop: 50,
    // marginLeft: 28,
    backgroundColor: GREEN_COLOR,
    borderColor: GREEN_COLOR,
  },
  question: {
    display: "flex",
    flexDirection: "row",
    // alignItems: 'fle',
    justifyContent: "space-between",
    marginRight: 16,
    marginTop: 5,
    marginLeft: 18,
    width: "90%",
  },
  error: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginLeft: 18,
    marginTop: 5,
    //    backgroundColor: 'grey'
  },
  reg: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // marginTop: 260
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
});
