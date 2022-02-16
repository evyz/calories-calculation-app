import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
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

const QA = observer(({ navigtation }) => {
  const [isChoice, setIsChoice] = useState(false);
  return (
    <View style={styles.mainBlock}>
      <View style={styles.mainTopBlock}>
        <TouchableOpacity onPress={() => navigation.navigate("title")}>
          <Text>Назад</Text>
        </TouchableOpacity>
        <View style={[styles.basestatus, styles.activestatus]} />
        <View style={[styles.basestatus, styles.activestatus]} />
        <View style={[styles.basestatus, styles.activestatus]} />
      </View>
      <View>
        <Text style={styles.text}>Откуда вы узнали о нашем</Text>
        <Text style={styles.text}>приложении</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  mainBlock: {
    display: "flex",
    backgroundColor: LIGHT_COLOR,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  button: {
    width: 280,
    height: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
    backgroundColor: "red",
  },
  activeMiniButton: {
    width: 30,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: GREEN_COLOR,
    borderColor: GREEN_COLOR,
  },
  miniButton: {
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: GREEN_COLOR,
  },
  questions: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 95,
  },
  mainTopBlock: {
    width: "90%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    marginTop: 23,
    fontSize: 24,
  },
  allblocks: {
    width: 62,
    height: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  basestatus: {
    width: 24,
    height: 4,
    backgroundColor: GREY_COLOR,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  activestatus: {
    backgroundColor: GREEN_COLOR,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default QA;
