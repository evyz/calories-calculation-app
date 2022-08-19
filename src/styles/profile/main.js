import { StyleSheet } from "react-native";

export const MainProfileStyles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  alignCenter: {
    alignItems: "center",
  },
  between: {
    justifyContent: "space-between",
  },
  center: {
    justifyContent: "center",
  },
  mt20: {
    marginTop: 20,
  },
  br20: {
    borderRadius: 20,
  },
  mb20: {
    marginBottom: 20,
  },
  icon: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
