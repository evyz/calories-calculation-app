
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
import {
  GREEN_COLOR,
  GREY_COLOR,
  LIGHT_COLOR,
  RED_COLOR,
} from "../../styles/colors";
import ArrowLeft from "../Arrows/ArrowLeft";

let symbols = /[0-9a-zA-Z!@#$%^&*]{6,}/g;
export default RegisterComponent = observer(({ navigation }) => {
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [security, setSecurity] = useState(true);
  const { user } = useContext(AppContext);
  const [password, setPassword] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );
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

  return (
    <View>
      <TouchableOpacity style={{ padding: 30 }} onPress={() => navigation.navigate('title')} >
        <ArrowLeft />
      </ TouchableOpacity>



      <Text style={{ fontSize: 24 }}>
        Создайте свой аккаунт
      </Text>
    </View>
  )
})