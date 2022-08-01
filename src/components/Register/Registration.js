import React, { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import { AppContext } from "../../store";
import {
  LIGHT_COLOR,
  LIGHT_GREEN_COLOR,
  GREEN_COLOR,
  GREY_COLOR,
  RED_COLOR,
  DARK_GREY_COLOR,
} from "../../styles/colors";
import { observer } from "mobx-react-lite";
import { useRoute } from "@react-navigation/native";
import { register } from "../../http/user";
import {
  BLACK_FONT,
  BOLD_FONT,
  LIGTH_FONT,
  MEDIUM_FONT,
} from "../../styles/fonts";

export let symbols = /[0-9a-zA-Z!@#$%^&*]{8,}/g;

const Registration = observer(({ navigation }) => {
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [security, setSecurity] = useState(true);
  const [code, setCode] = useState("");
  const { user } = useContext(AppContext);
  const [password, setPassword] = useState("");
  const [dublpassword, setDublPassword] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [shortPasswordDirty, setShortPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [shortPasswordError, setShortPasswordError] = useState("");

  const height = Math.round(Dimensions.get("screen").height);
  useEffect(() => {
    console.log(height);
  }, [height]);

  const fadeAnim = useRef(new Animated.Value(height)).current;
  const activeText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isConfirmed) {
      setTimeout(() => {
        Animated.timing(activeText, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }).start();
      }, 3000);
    }
  }, [isConfirmed]);

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

  const comparePassword = () => {
    if (password === dublpassword) {
      setPasswordError("Пароли совпадают");
      setPasswordDirty(false);
    } else {
      setPasswordError("Пароли не совпадают");
      setPasswordDirty(true);
    }
  };
  const shortPassword = () => {
    let isConfirm = symbols.test(password);
    if (!isConfirm) {
      setShortPasswordError("Пароль ненадежный");
      setShortPasswordDirty(true);
    } else {
      setShortPasswordDirty(false);
    }
  };

  const registerEvent = () => {
    register(value, value1, dublpassword).then((data) => {
      if (data.status === 404) {
        return Alert.alert("Ошибка в регистрации", data.message);
      } else {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
        setIsConfirmed(true);
      }
    });
  };

  return (
    <View style={styles.main}>
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: GREEN_COLOR,
          position: "absolute",
          zIndex: 100,
          transform: [{ translateY: fadeAnim }],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: BLACK_FONT,
              color: LIGHT_COLOR,
            }}
          >
            Добро пожаловать, {value}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: MEDIUM_FONT,
              marginTop: 20,
              color: LIGHT_COLOR,
              width: 320,
            }}
          >
            На Вашу почту {value1} пришло письмо с ссылкой для подтвеждения
            аккаунта. Пожалуйста, подтвердите аккаунт, чтобы воспользоваться
            своим аккаунтом.
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: LIGTH_FONT,
              marginTop: 20,
              color: LIGHT_COLOR,
            }}
          >
            С уважением, команда LZSTUDIO
          </Text>
        </View>
        <Animated.View
          style={{
            position: "absolute",
            bottom: 180,
            paddingHorizontal: 17,
            paddingVertical: 10,
            backgroundColor: LIGHT_COLOR,
            borderRadius: 8,
            opacity: activeText,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text
              style={{
                color: DARK_GREY_COLOR,
                fontSize: 24,
                fontFamily: BOLD_FONT,
              }}
            >
              Авторизация
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <View style={styles.mainTopBlock}>
        <TouchableOpacity onPress={() => navigation.navigate("title")}>
          <Text>Назад</Text>
        </TouchableOpacity>
        {/* <View style={styles.allblocks}>
          <View style={[styles.basestatus, styles.activestatus]}></View>
          <View style={styles.basestatus}></View>
          <View style={styles.basestatus}></View>
        </View> */}
      </View>
      <View style={styles.topText}>
        <Text style={{ fontSize: 24, fontFamily: BLACK_FONT }}>
          Создайте свой аккаунт
        </Text>
        <Text style={{ fontSize: 16, width: 300 }}>
          Создайте аккаунт и получите доступ к приложению
        </Text>
      </View>

      <View style={styles.input}>
        <TextInput
          onChangeText={setValue}
          value={value}
          placeholder='Ваше имя'
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType='default'
          style={{ width: "100%" }}
        />
      </View>

      <View style={styles.input}>
        <TextInput
          onChangeText={setValue1}
          value={value1}
          placeholder='Почта'
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType='default'
          style={{ width: "100%" }}
        />
      </View>

      <View style={styles.input2}>
        <TextInput
          onEndEditing={(e) => shortPassword(e)}
          value={password}
          secureTextEntry={security}
          onChangeText={setPassword}
          placeholder='Пароль'
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType='default'
          style={{ width: "100%" }}
        />
      </View>
      <View style={{ width: "90%", height: !shortPasswordDirty ? 0 : 70 }}>
        {shortPasswordDirty ? (
          <>
            <Text style={{ color: RED_COLOR, fontSize: 14 }}>
              {shortPasswordError}
            </Text>
            <Text style={{ color: "black" }}>
              Пароль не соответсвует требованиям. Пароль должен включать в себя
              восемь или более символов латинского алфавита, а также содержать
              заглавные и строчные буквы, цифры.
            </Text>
          </>
        ) : (
          <Text style={{ padding: 0, margin: 0 }}></Text>
        )}
      </View>

      <View style={styles.input2}>
        <TextInput
          onEndEditing={(e) => comparePassword(e)}
          value={dublpassword}
          secureTextEntry={security}
          onChangeText={setDublPassword}
          placeholder='Подтвердите пароль'
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType='default'
        />
      </View>
      <View style={{ width: "90%" }}>
        {passwordDirty ? (
          <Text style={{ color: RED_COLOR, fontSize: 14 }}>
            {passwordError}
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>
      <View style={styles.next}>
        <TouchableOpacity
          style={{
            width: "100%",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => registerEvent()}
        >
          <Text style={{ fontSize: 18, color: LIGHT_COLOR }}>Далее</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.entr}>
        <Text>Уже есть аккаунт?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={{ color: GREEN_COLOR }}>Войти</Text>
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
  inputCode: {
    width: 285,
    height: 45,
    borderBottomWidth: 3,
    borderColor: GREY_COLOR,
    marginTop: 40,
  },
  basestatus: {
    width: 24,
    height: 4,
    backgroundColor: GREY_COLOR,
    borderRadius: 10,
  },
  mainAlert: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  confirm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    width: 200,
    height: 45,
    marginTop: 122,
    left: 0,
    borderWidth: 1,
    borderColor: GREEN_COLOR,
    backgroundColor: GREEN_COLOR,
    borderRadius: 24,
  },
  alert: {
    width: 300,
    height: 500,
    backgroundColor: LIGHT_COLOR,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  activestatus: {
    backgroundColor: GREEN_COLOR,
  },
  mainTopBlock: {
    width: "90%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  allblocks: {
    width: 82,
    height: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topText: {
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
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    marginTop: 30,
  },
  next: {
    display: "flex",
    flexDirection: "row",
    height: 50,
    width: "90%",

    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 24,
    marginTop: 20,
    // marginLeft: 28,
    backgroundColor: GREEN_COLOR,
    borderColor: GREEN_COLOR,
  },
  entr: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    width: "100%",
    left: 0,
  },
});
export default Registration;
