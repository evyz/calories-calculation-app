import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";
import { AppContext } from "../../store";
import {
  LIGHT_COLOR,
  LIGHT_GREEN_COLOR,
  GREEN_COLOR,
  GREY_COLOR,
  RED_COLOR,
} from "../../styles/colors";
import { observer } from "mobx-react-lite";
import { useRoute } from "@react-navigation/native";

let symbols = /[0-9a-zA-Z!@#$%^&*]{6,}/g;

export default RegisterComponent = observer(({ navigation }) => {
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [security, setSecurity] = useState(true);
  const { user } = useContext(AppContext);
  const [password, setPassword] = useState("");
  const [dublpassword, setDublPassword] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [shortPasswordDirty, setShortPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [shortPasswordError, setShortPasswordError] = useState("");
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
    if (password.length < 6) {
      setShortPasswordError("Пароль ненадежный");
      setShortPasswordDirty(true);
    } else {
      setShortPasswordDirty(false);
    }
  };
  return (
    <View style={styles.main}>
      <View style={styles.mainTopBlock}>
        <TouchableOpacity onPress={() => navigation.navigate("title")}>
          <Text>Назад</Text>
        </TouchableOpacity>
        <View style={styles.allblocks}>
          <View style={[styles.basestatus, styles.activestatus]}></View>
          <View style={styles.basestatus}></View>
          <View style={styles.basestatus}></View>
        </View>
      </View>
      <View style={styles.topText}>
        <Text style={{ fontSize: 24 }}>Создайте свой аккаунт</Text>
        <Text style={{ fontSize: 16 }}>Создайте аккаунт и получите</Text>
        <Text style={{ fontSize: 16 }}>доступ к приложению</Text>
      </View>

      <View style={styles.input}>
        <TextInput
          onChangeText={setValue}
          value={value}
          placeholder="Ваше имя"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="default"
        />
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
          onEndEditing={(e) => shortPassword(e)}
          value={password}
          secureTextEntry={security}
          onChangeText={setPassword}
          placeholder="Пароль"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="default"
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
          placeholder="Подтвердите пароль"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="default"
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
        <TouchableOpacity>
          <Text style={{ fontSize: 18, color: LIGHT_COLOR }}>Далее</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.entr}>
        <Text>Уже есть аккаунт?</Text>
        <TouchableOpacity>
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
  basestatus: {
    width: 24,
    height: 4,
    backgroundColor: GREY_COLOR,
    borderRadius: 10,
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
