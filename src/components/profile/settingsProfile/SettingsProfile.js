import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowLeft from "../../Arrows/ArrowLeft";
import {
  DARK_GREY_COLOR,
  GREEN_COLOR,
  GREY_COLOR,
  LIGHT_COLOR,
} from "../../../styles/colors";
import { BOLD_FONT, MEDIUM_FONT } from "../../../styles/fonts";
import PasswordSetting from "./settings/password";
import { Shadow } from "react-native-shadow-2";
import { shadowOpt } from "../../loader/Loader";
// import {LIGHT_COLOR} from '../../'

const SettingsProfileComponent = ({ navigation }) => {
  // const settings = [{ id: "password", component: <PasswordSetting /> }];

  return (
    <View style={styles.main}>
      <View style={styles.innerMain}>
        <View style={styles.back}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("main")}
          >
            <ArrowLeft />
            <Text style={styles.backTitle}>Назад </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.settings}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Text style={styles.title}>Настройте свой аккаунт</Text>
          <View style={{ width: "60%" }}>
            <Text style={{ fontSize: 16 }}>
              Редактируйте своё имя, почту, пароль и аватар аккаунта{" "}
            </Text>
          </View>
          {/* <View style={styles.avatar}></View> */}
          <View style={{ width: "100%", height: 350 }}>
            <View style={styles.navToSet}>
              <TouchableOpacity
                onPress={() => navigation.navigate("changePassword")}
              >
                <Text>Сменить пароль</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.navToName}>
              <TouchableOpacity
                onPress={() => navigation.navigate("changeName")}
              >
                <Text>Имя пользователя</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.navToName}>
              <TouchableOpacity
              // onPress={() => navigation.navigate("changeName")}
              >
                <Text>Эл. адрес</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.navToName}>
              <TouchableOpacity
              // onPress={() => navigation.navigate("changeName")}
              >
                <Text>Система безопасности</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <Button
            title="Сбросить параметры"
            onPress={async () => {
              await AsyncStorage.setItem("isWellcome", "true");
            }}
          /> */}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: LIGHT_COLOR,
  },
  navToSet: {
    display: "flex",
    width: "40%",
    height: "10%",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: GREEN_COLOR,
    marginTop: 40,
    justifyContent: "center",
  },
  navToName: {
    display: "flex",
    width: "40%",
    height: "10%",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: GREEN_COLOR,
    marginTop: 40,
    justifyContent: "center",
  },
  avatar: {
    width: "60%",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "grey",
    height: "60%",
    borderRadius: 150,
  },
  innerMain: {
    width: "100%",
    height: "90%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  title: {
    fontFamily: BOLD_FONT,
    fontSize: 24,
    color: DARK_GREY_COLOR,
    marginVertical: 10,
    justifyContent: "flex-start",
  },
  back: {
    padding: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",

    borderBottomWidth: 1,
    borderBottomColor: GREY_COLOR,
  },
  backButton: {
    width: 100,
    display: "flex",
    flexDirection: "row",
  },
  backTitle: {
    paddingLeft: 10,
    fontFamily: MEDIUM_FONT,
    fontSize: 14,
    marginBottom: 20,
  },
  settings: {
    width: "90%",
    backgroundColor: "red",
    display: "flex",
  },
});

export default SettingsProfileComponent;
