import { observer } from "mobx-react-lite";
import { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Touchable,
  Image,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { AppContext } from "../../../store";
import { containerStyles } from "../../../styles/default/container";
import { shadowOpt } from "../../loader/Loader";
import Buttons from "./components/Buttons";
import {
  DARK_GREY_COLOR,
  GREEN_COLOR,
  RED_COLOR,
} from "../../../styles/colors";
import Avatar from "./components/Avatar";
import { SvgUri } from "react-native-svg";
import { url } from "../../../http";
import { TextComponent } from "../../Functional/Text/TextComponent";
import { BOLD_FONT, LIGTH_FONT } from "../../../styles/fonts";
import { getRole } from "../../../utils/roles";
import ActiveSheet from "./components/activeSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MainProfileComponent = observer(({ navigation }) => {
  const { user } = useContext(AppContext);

  const [email, setEmail] = useState("");
  // ЗАДАЧА: Сверстать по макету профиль здесь.
  //          Ссылка - https://www.figma.com/file/vdoWbzCxWCbAnRcUBaNmJS/LZ-calories-(MAIN)?node-id=0%3A1
  //          Стили разрабатывать ниже в styles

  const [isBanner, setIsBanner] = useState(true);
  const [isAvatar, setIsAvatar] = useState(false);

  useEffect(() => {
    setEmail(user.profile.profile.email);
  }, []);

  return (
    <GestureHandlerRootView>
      <View
        style={{
          ...containerStyles.container,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActiveSheet isActive={isAvatar} setIsActive={setIsAvatar} />

        {/* {isAvatar && (
          <Avatar
            isActive={isAvatar}
            setIsActive={setIsAvatar}
            user={user.profile}
            setUser={user.setProfile}
          />
        )} */}

        {isBanner && (
          <TouchableOpacity
            style={styles.notif}
            onPress={() => setIsBanner(false)}
          >
            <View style={styles.warn}>
              <Text style={styles.warnText}>!</Text>
            </View>
            <Text style={styles.notifText}>
              Оцените наш видеоролик о проекте
            </Text>
            <TouchableOpacity
              style={styles.ico}
              onPress={() => Alert.alert("Данная функция временно не робит(")}
            ></TouchableOpacity>
          </TouchableOpacity>
        )}

        <Shadow {...shadowOpt}>
          <View style={styles.block}>
            <TouchableOpacity
              onPress={() => navigation.navigate("settings")}
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                right: 10,
                top: 10,
              }}
            >
              <Image
                source={require("../../../assets/icos/settings.png")}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsAvatar(true)}
              style={styles.avatar}
            >
              <View
                style={[
                  styles.innerAvatar,
                  { backgroundColor: user.profile?.avatar?.color },
                ]}
              >
                <SvgUri
                  width={140}
                  height={140}
                  uri={url + user.profile?.avatar?.ico?.path}
                />
              </View>
            </TouchableOpacity>

            <TextComponent
              text={
                user.profile.profile.name
                  ? user.profile.profile.name
                  : "Никнейм"
              }
              bold={BOLD_FONT}
              size={18}
            />
            <Text>
              <TextComponent size={14} text={"Ваш статус:"} />
              <TextComponent
                size={14}
                bold={LIGTH_FONT}
                text={getRole(user.profile.role, "ru")}
              />
            </Text>

            <View style={styles.emailView}>
              <Shadow {...shadowOpt} startColor='#F3F3F3'>
                <TextInput
                  value={email}
                  style={styles.emailInput}
                  placeholder='Ваша почта'
                />
              </Shadow>
            </View>

            <View style={styles.options}>
              {/* <TouchableOpacity onPress={() => navigation.navigate('settings')}>
              <Text>Настройки</Text>
            </TouchableOpacity> */}
            </View>

            {user.profile.role === "admin" && (
              <View>
                <TouchableOpacity onPress={() => navigation.navigate("admin")}>
                  <Text>Admin man</Text>
                </TouchableOpacity>
              </View>
            )}

            <Buttons />
          </View>
        </Shadow>
      </View>
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  block: {
    width: 300,
    height: 600,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "white",
    borderRadius: 25,
  },
  nickname: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
  },

  emailView: {
    marginTop: 30,
    marginBottom: 100, // --- Убрать потом!
  },

  emailInput: {
    width: 250,
    height: 35,

    padding: 10,
    fontSize: 12,

    backgroundColor: "white",
    borderRadius: 15,
  },

  avatar: {
    width: 160,
    height: 160,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 160,

    borderWidth: 5,
    borderColor: GREEN_COLOR,

    marginBottom: 20,
  },

  options: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  innerAvatar: {
    width: "90%",
    height: "90%",

    borderRadius: 100,
    padding: 10,

    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  notif: {
    width: "90%",
    height: 45,

    position: "absolute",
    bottom: 15,

    zIndex: 10,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "white",

    overflow: "hidden",
    borderRadius: 10,
  },

  warn: {
    width: 30,
    height: 30,

    borderColor: DARK_GREY_COLOR,
    borderWidth: 1,
    borderRadius: 20,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    marginLeft: 20,
  },

  warnText: {
    fontFamily: "montserrat-black",
    fontSize: 12,
  },

  ico: {
    width: 45,
    height: 45,

    borderRadius: 10,

    backgroundColor: RED_COLOR,
  },

  notifText: {
    fontSize: 12,
  },
});

export default MainProfileComponent;
