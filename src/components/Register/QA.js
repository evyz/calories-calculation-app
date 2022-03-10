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

const QA = observer(({ navigation }) => {
  const [isChoice, setIsChoice] = useState(false);
  const [isChoice2, setIsChoice2] = useState(false);
  const [isChoice3, setIsChoice3] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [value, setValue] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const { user } = useContext(AppContext);

  const Confirmed = () => {
    if (!isChoice) {
      user.setIsAuth(false);
    }
    if (!isChoice2) {
      user.setIsAuth(false);
    }
    if (!isChoice3) {
      user.setIsAuth(false);
    } else {
      user.setIsAuth(true);
    }
  };
  return (
    <View style={styles.mainBlock}>
      <View style={styles.mainTopBlock}>
        <TouchableOpacity onPress={() => navigation.navigate("title")}>
          <Text>Назад</Text>
        </TouchableOpacity>
        <View style={styles.mainIcons}>
          <View style={[styles.basestatus, styles.activestatus]} />
          <View style={[styles.basestatus, styles.activestatus]} />
          <View style={[styles.basestatus, styles.activestatus]} />
        </View>
      </View>
      <View style={styles.text}>
        <Text style={{ fontSize: 24 }}>Откуда вы узнали о нашем</Text>
        <Text style={{ fontSize: 24 }}>приложении?</Text>
      </View>
      <View style={styles.questions}>
        <View style={styles.q}>
          <TouchableOpacity
            style={isChoice ? styles.activeMiniButton : styles.miniButton}
            onPress={() => setIsChoice(!isChoice)}
          ></TouchableOpacity>
          <Text style={{ paddingLeft: 10, fontSize: 18 }}>
            Нашел сам в Play Market
          </Text>
        </View>
        <View style={styles.q}>
          <TouchableOpacity
            style={isChoice2 ? styles.activeMiniButton : styles.miniButton}
            onPress={() => setIsChoice2(!isChoice2)}
          ></TouchableOpacity>
          <Text style={{ paddingLeft: 10, fontSize: 18 }}>Пригласил друг</Text>
        </View>
        <View style={styles.q}>
          <TouchableOpacity
            style={isChoice3 ? styles.activeMiniButton : styles.miniButton}
            onPress={() => setIsChoice3(!isChoice3)}
          ></TouchableOpacity>
          <Text style={{ paddingLeft: 10, fontSize: 18 }}>Из соц. сетей</Text>
        </View>
        <View style={styles.input}>
          <TextInput
            style={{ fontSize: 12, color: "black" }}
            placeholder="Свой вариант"
            value={setValue}
          />
        </View>
        <View style={styles.next}>
          <TouchableOpacity onPress={() => Confirmed()}>
            <Text style={{ fontSize: 18, color: LIGHT_COLOR }}>
              Завершить регистрацию
            </Text>
          </TouchableOpacity>
        </View>
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
  next: {
    display: "flex",
    flexDirection: "row",
    height: 50,
    width: "120%",
    margin: 5,
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 24,
    marginTop: 240,
    // marginLeft: 28,
    backgroundColor: GREEN_COLOR,
    borderColor: GREEN_COLOR,
  },
  activestatus: {
    backgroundColor: GREEN_COLOR,
  },
  basestatus: {
    width: 24,
    height: 4,
    backgroundColor: GREY_COLOR,
    borderRadius: 10,
  },
  allblocks: {
    width: 82,
    height: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    borderBottomColor: GREEN_COLOR,
    borderBottomWidth: 1,
    width: "130%",
    marginTop: 45,
  },
  q: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 30,
    width: 350,
    height: 30,
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
    display: "flex",
    flexDirection: "row",
    height: 30,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: GREEN_COLOR,
    borderColor: GREEN_COLOR,
  },
  miniButton: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",

    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: GREEN_COLOR,
  },
  questions: {
    display: "flex",
    flexDirection: "column",
    // paddingTop: 95,
    height: 30,
    width: 280,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 95,
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
  mainIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "20%",
    marginTop: 10,
  },
});
export default QA;
