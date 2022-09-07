import AsyncStorage from "@react-native-async-storage/async-storage";

import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import { url } from "../../http";
import { AppContext } from "../../store";
import { DARK_GREY_COLOR, LIGHT_COLOR } from "../../styles/colors";
import { BOLD_FONT } from "../../styles/fonts";

const LastAuth = observer(({ navigation }) => {
  const { user } = useContext(AppContext);
  const [auth, setAuth] = useState(null);

  const getArr = async () => {
    return JSON.parse(await AsyncStorage.getItem("calories@auth_users"));
  };

  useEffect(() => {
    getArr().then((data) => {
      setAuth(data);
    });
  }, []);

  if (auth) {
    return (
      <View
        style={{
          width: "90%",
          height: "30%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: auth?.avatar?.color,
            overflow: "hidden",
          }}
        >
          <SvgUri
            width={100}
            height={100}
            uri={url + auth?.avatar?.ico?.path}
          />
        </View>
        <TouchableOpacity
          style={{
            width: "70%",
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: DARK_GREY_COLOR,
            marginTop: 10,
            borderRadius: 8,
          }}
          onPress={() => {
            user.setAuthInput(auth?.email);
            navigation.navigate("login");
          }}
        >
          <Text style={{ fontFamily: BOLD_FONT, color: LIGHT_COLOR }}>
            Продолжить как {auth?.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <></>;
});

export default LastAuth;
