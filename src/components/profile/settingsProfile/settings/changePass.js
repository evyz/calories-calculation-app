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
  return (
    <View style={[styles.main, { paddingTop: StatusBar.currentHeight }]}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("settings")}
          style={styles.backButton}
        >
          <ArrowLeft />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            fontFamily: MEDIUM_FONT,
            fontSize: 20,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginLeft: 20,
            marginTop: 10,
          }}
        >
          Смена пароля
        </Text>
      </View>
      <View
        style={{
          fontFamily: MEDIUM_FONT,
          fontSize: 30,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: "70%",
          marginLeft: 20,
          marginTop: 10,
        }}
      >
        <Text>
          {" "}
          Пароль должен включать в себя восемь или более символов латинского
          алфавита, а также содержать заглавные и строчные буквы, цифры.
        </Text>
      </View>
      <TextInput
        onChangeText={setCurrentPassword}
        value={currentPassword}
        placeholder="Введите текущий пароль"
        autoCorrect={false}
        autoCapitalize={"none"}
        keyboardType="default"
        style={styles.input}
      />
      <TextInput
        onChangeText={setNewPassword}
        value={newPassword}
        placeholder="Введите новый пароль"
        autoCorrect={false}
        autoCapitalize={"none"}
        keyboardType="default"
        style={styles.input}
      />
      <TextInput
        onChangeText={setConfirmNewPassword}
        value={confirmNewPassword}
        placeholder="Подтвердите новый пароль"
        autoCorrect={false}
        autoCapitalize={"none"}
        keyboardType="default"
        style={styles.input}
      />
      <View style={styles.login}>
        <TouchableOpacity
          style={{
            width: "100%",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("main")}
        >
          <Text style={{ fontSize: 18, color: LIGHT_COLOR }}>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: LIGHT_COLOR,
  },
  backButton: {
    width: 100,
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
    position: "absolute",
    top: left,
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
    width: "80%",
    // margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 24,
    // marginTop: 50,
    // marginLeft: 40,
    backgroundColor: GREEN_COLOR,
    borderColor: GREEN_COLOR,
  },
  input: {
    width: "80%",
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
    marginLeft: 20,
  },
});
