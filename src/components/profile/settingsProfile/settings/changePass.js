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
import { AppContext } from "../../../../store";
import { useRoute } from "@react-navigation/native";
import language from "../../../../utils/language.json";
import {
  GREEN_COLOR,
  GREY_COLOR,
  LIGHT_COLOR,
  RED_COLOR,
} from "../../../../styles/colors";
import { login, me } from "../../../../http/user";
import VisibleIcon from "../../../../icons/visible/visibleIcon";
import ApiLoader from "../../../loader/ApiLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLastsAuth } from "../../../../storage/last.auth";
import { changePassword } from "../../../../http/user";

const ChangePass = observer(({ navigation }) => {
  return (
    <View>
      <View>
        <Text>Смена пароля</Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigation.navigate("settings")}>
          <Text>Назад</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default ChangePass;

const styles = StyleSheet.create({
  button: {
    width: "30%",
    height: "30%",
    backgroundColor: GREEN_COLOR,
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: LIGHT_COLOR,
  },
});
