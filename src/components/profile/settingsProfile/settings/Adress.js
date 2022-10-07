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

const Adress = observer(({ navigation }) => {
  const [mail, setMail] = useState(false);
  const [currentMail, setCurrentMail] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [mailDirty, setMailDirty] = useState(false);

  const blurHandler = (e) => {
    setMail(e.nativeEvent.text);
    if (e.nativeEvent?.text.length === 0) {
      setMailError("Введите почту");
      setMailDirty(true);
    } else {
      setMailError("");
      setMailDirty(false);
    }
  };
  return (
    <View style={[styles.main, { paddingTop: StatusBar.currentHeight }]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("settings")}
        style={[styles.backButton, { marginTop: StatusBar.currentHeight }]}
      >
        <ArrowLeft />
      </TouchableOpacity>

      <Text
        style={{
          width: "70%",
          height: 30,
          fontSize: 24,
          color: "black",
          fontFamily: BOLD_FONT,
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        Смена эл. почты
      </Text>
      <Text
        style={{
          width: "70%",
          height: "20%",
          fontSize: 14,
          color: "black",
          fontFamily: MEDIUM_FONT,
          marginTop: 10,
          marginLeft: 20,
        }}
      >
        Вам необходимо ввести действительную эл. почту, куда Вам придёт ссылка
        для подтверждения смены адреса. Ссылка будет действительной в течении 24
        часов с момента отправки письма
      </Text>
      <TextInput
        onEndEditing={(e) => blurHandler(e)}
        onChangeText={setCurrentMail}
        value={mail}
        placeholder="Введите эл. почту"
        autoCorrect={false}
        autoCapitalize={"none"}
        keyboardType="default"
        style={styles.input}
      />
      {mailDirty ? (
        <>
          <Text
            style={{
              color: RED_COLOR,
              fontSize: 14,
              marginTop: 10,
              marginLeft: 20,
            }}
          >
            {mailError}
          </Text>
        </>
      ) : (
        <Text style={{ padding: 0, margin: 0 }}></Text>
      )}
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
          <Text
            style={{
              fontSize: 18,
              color: LIGHT_COLOR,
              fontFamily: MEDIUM_FONT,
            }}
          >
            Сменить почту
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    display: "flex",
    backgroundColor: LIGHT_COLOR,
  },
  backButton: {
    width: 100,
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
  },
  login: {
    display: "flex",
    flexDirection: "row",
    height: 50,
    width: "90%",
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
    marginTop: 10,
    marginLeft: 20,
    fontSize: 14,
    fontFamily: MEDIUM_FONT,
  },
});
export default Adress;
