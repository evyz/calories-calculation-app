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
  AsyncStorage
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

let symbols = /[0-9a-zA-Z!@#$%^&*]{6,}/g;

export default LoginComponent = observer(({ navigation }) => {
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [security, setSecurity] = useState(true);
  const { user } = useContext(AppContext);
  const [password, setPassword] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
  const [isSecurity, setIsSecurity] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
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
    if (passwordDirty) {
      user.setIsAuth(false);
    } else {
      setIsLoading(true)
      login(value, value1).then(data => {
        if (data?.status === 404) {
          setIsLoading(false)
          Alert.alert("Ошибка авторизации", data?.message)
        }
        if (data?.token) {
          AsyncStorage.setItem('token', data?.token);
          me().then(data => {
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
                name: data?.name
              }
            }

            user.setProfile(obj)
            setTimeout(() => setIsLoading(false), 500);
            user.setIsAuth(true);
          })
        }
      }).finally(() => setTimeout(() => setIsLoading(false), 500))
    }
  };


  const blurHandler = (e) => {
    console.log(e.nativeEvent.text);
    setPassword(e.nativeEvent.text);
    if (e.nativeEvent?.text.length < 6) {
      setPasswordError("Неверный пароль");
      setPasswordDirty(true);
    } else {
      setPasswordError("");
      setPasswordDirty(false);
    }
  };

  return (
    <View style={styles.main}>
      {isLoading && <ApiLoader focused={isLoading} />}

      <TouchableOpacity
        style={{ padding: 30 }}
        onPress={() => navigation.navigate("title")}
      >
        <Text>Назад</Text>
      </TouchableOpacity>

      <View style={styles.text}>
        <Text style={{ fontSize: 24 }}>
          {/* fontFamily: "montserrat-bold" */}
          Войдите в аккаунт
        </Text>
        <Text style={{ fontSize: 16 }}>С возвращением!</Text>
        <Text style={{ fontSize: 16 }}>Войдите и пользуйтесь.</Text>
      </View>
      <View style={styles.input}>
        <TextInput
          onChangeText={setValue}
          value={value}
          placeholder="Почта"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="default"
        />
      </View>
      <View style={styles.input2}>
        <TextInput
          onEndEditing={(e) => blurHandler(e)}
          value={password}
          secureTextEntry={isSecurity}
          onChangeText={setValue1}
          value={value1}
          placeholder="Пароль"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="default"
        />
        <TouchableOpacity style={{ padding: 10, }} onPress={() => setIsSecurity(!isSecurity)}>
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
        <TouchableOpacity onPress={() => authChangeHandler()}>
          <Text style={{ fontSize: 18, color: LIGHT_COLOR }}>Войти</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.reg}>
        <Text>Нет аккаунта?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("register")}>
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
    justifyContent: 'space-between',
    marginTop: 30,
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
    marginTop: 80,
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
