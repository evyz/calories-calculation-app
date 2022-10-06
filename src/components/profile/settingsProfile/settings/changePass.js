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
  StatusBar,
  Dimensions,
} from "react-native";
import { AppContext } from "../../../../store";
import { useRoute } from "@react-navigation/native";
import language from "../../../../utils/language.json";
import {
  GREEN_COLOR,
  GREY_COLOR,
  LIGHT_COLOR,
  RED_COLOR,
} from "../../../../styles/colors";
import { BOLD_FONT, MEDIUM_FONT } from "../../../../styles/fonts";
import { login, me } from "../../../../http/user";
import VisibleIcon from "../../../../icons/visible/visibleIcon";
import ApiLoader from "../../../loader/ApiLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLastsAuth } from "../../../../storage/last.auth";
import { changePassword } from "../../../../http/user";
import ArrowLeft from "../../../Arrows/ArrowLeft";

let symbols = /[0-9a-zA-Z!@#$%^&*]{6,}/g;

const ChangePass = observer(({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { width } = Dimensions.get("screen");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [password, setPassword] = useState("");
  const [dublpassword, setDublPassword] = useState("");
  const [shortPasswordError, setShortPasswordError] = useState("");
  const [shortPasswordDirty, setShortPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );
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
  // const blurHandlerNew = (e) => {
  //   setPassword(e.nativeEvent.text);
  //   if (e.nativeEvent?.text.length === 0) {
  //     setPasswordError("Укажите пароль");
  //     setPasswordDirty(true);
  //   } else {
  //     setPasswordError("");
  //     setPasswordDirty(false);
  //   }
  // };
  // const blurHandlerNewConfirm = (e) => {
  //   setPassword(e.nativeEvent.text);
  //   if (e.nativeEvent?.text.length === 0) {
  //     setPasswordError("Укажите пароль");
  //     setPasswordDirty(true);
  //   } else {
  //     setPasswordError("");
  //     setPasswordDirty(false);
  //   }
  // };
  const comparePassword = () => {
    console.log(1);
    if (newPassword === confirmNewPassword) {
      setPasswordError("Пароли совпадают");
      setPasswordDirty(false);
    } else {
      setPasswordError("Пароли не совпадают");
      setPasswordDirty(true);
    }
  };
  const shortPassword = () => {
    console.log(2);
    let isConfirm = symbols.test(newPassword);
    if (!isConfirm) {
      setShortPasswordError("Пароль ненадежный");
      setShortPasswordDirty(true);
    } else {
      setShortPasswordDirty(false);
    }
  };
  // const blurHandlerMail = (e) => {
  //   if (e.nativeEvent?.text.length === 0) {
  //     setEmailError("Укажите пароль");
  //     setEmailDirty(true);
  //   } else {
  //     setEmailError("");
  //     setEmailDirty(false);
  //   }
  // };

  return (
    <View style={[styles.main, { paddingTop: StatusBar.currentHeight }]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("settings")}
        style={[styles.backButton, { marginTop: StatusBar.currentHeight }]}
      >
        <ArrowLeft />
      </TouchableOpacity>

      <View>
        <Text
          style={{
            fontFamily: BOLD_FONT,
            fontSize: 24,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          Смена пароля
        </Text>
      </View>
      <View
        style={{
          fontFamily: MEDIUM_FONT,
          fontSize: 12,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: "70%",
          marginLeft: 20,
          marginTop: 10,
        }}
      >
        <Text>
          Пароль должен включать в себя восемь или более символов латинского
          алфавита, а также содержать заглавные и строчные буквы, цифры.
        </Text>
      </View>
      <TextInput
        onEndEditing={(e) => blurHandler(e)}
        onChangeText={setCurrentPassword}
        value={currentPassword}
        placeholder="Введите текущий пароль"
        autoCorrect={false}
        autoCapitalize={"none"}
        keyboardType="default"
        style={[styles.input, { marginTop: 60 }]}
      />
      <TextInput
        onEndEditing={(e) => shortPassword(e)}
        onChangeText={setNewPassword}
        value={newPassword}
        placeholder="Введите новый пароль"
        autoCorrect={false}
        autoCapitalize={"none"}
        keyboardType="default"
        style={styles.input}
      />
      {shortPasswordDirty ? (
        <>
          <Text
            style={{
              color: RED_COLOR,
              fontSize: 14,
              marginTop: 10,
              marginLeft: 20,
            }}
          >
            {shortPasswordError}
          </Text>
        </>
      ) : (
        <Text style={{ padding: 0, margin: 0 }}></Text>
      )}
      <TextInput
        onEndEditing={(e) => comparePassword(e)}
        onChangeText={setConfirmNewPassword}
        value={confirmNewPassword}
        placeholder="Подтвердите новый пароль"
        autoCorrect={false}
        autoCapitalize={"none"}
        keyboardType="default"
        style={styles.input}
      />
      {passwordDirty ? (
        <>
          <Text
            style={{
              color: RED_COLOR,
              fontSize: 14,
              marginTop: 10,
              marginLeft: 20,
            }}
          >
            {passwordError}
          </Text>
        </>
      ) : (
        <Text style={{ padding: 0, margin: 0 }}></Text>
      )}
      <View style={[styles.login, { width: width - 40 }]}>
        <TouchableOpacity
          style={{
            width: "100%",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("main")}
        >
          <Text
            style={{
              fontSize: 18,
              color: LIGHT_COLOR,
              fontFamily: MEDIUM_FONT,
            }}
          >
            Сменить пароль
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default ChangePass;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: LIGHT_COLOR,
  },
  backButton: {
    width: 100,
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    // position: "absolute",
    // top: 60,
  },
  backTitle: {
    paddingLeft: 10,
    fontFamily: MEDIUM_FONT,
    fontSize: 14,
    marginBottom: 20,
  },
  login: {
    display: "flex",
    flexDirection: "row",
    height: 50,
    width: "100%",
    marginTop: 45,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 24,
    backgroundColor: GREEN_COLOR,
    borderColor: GREEN_COLOR,
  },
  input: {
    width: "85%",
    paddingLeft: 10,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: 0,
    borderBottomColor: GREY_COLOR,
    fontSize: 12,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    marginLeft: 20,
    fontSize: 14,
    fontFamily: MEDIUM_FONT,
  },
});
