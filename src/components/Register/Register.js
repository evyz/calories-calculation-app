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
  RED_COLOR,
} from "../../styles/colors";
import { observer } from "mobx-react-lite";
import { useRoute } from "@react-navigation/native";
import Registration from "./Registration";
import RegIcons from "./RegIcons";
import QA from "./QA.js";

const arr = [
  {
    page: 1,
    route: <Registration />,
  },
  {
    page: 2,
    route: <RegIcons />,
  },
  {
    page: 3,
    route: <QA />,
  },
];

export default RegisterComponent = observer(({ navigation }) => {
  const [page, setPage] = useState(2);
  return <View>{arr.map((y) => page === y.page && y.route)}</View>;
});
