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
} from "../../styles/colors";
import { observer } from "mobx-react-lite";
import { useRoute } from "@react-navigation/native";

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
    <View style={styles.main}>
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
          onEndEditing={(e) => blurHandler(e)}
          value={password}
          secureTextEntry={security}
          onChangeText={setValue1}
          value={value1}
          placeholder="Пароль"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="default"
        />
      </View>

      <View style={styles.input2}>
        <TextInput
          onEndEditing={(e) => blurHandler(e)}
          value={password}
          secureTextEntry={security}
          onChangeText={setValue1}
          value={value1}
          placeholder="Подтвердите пароль"
          autoCorrect={false}
          autoCapitalize={"none"}
          keyboardType="default"
        />
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
