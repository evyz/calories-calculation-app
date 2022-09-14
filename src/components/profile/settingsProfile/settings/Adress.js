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
    </View>
  );
});
const styles = StyleSheet.create({
  main: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
  },
  backButton: {
    width: 100,
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
  },
});
export default Adress;
