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
const Home = observer(({ navigation }) => {
  return (
    <View style={styles.main}>
      <View style={styles.newsContainer}>
        {/* <ScrollView contentContainerStyle={styles.newsScroller}> */}
        <ScrollView style={styles.newsScroller}>
          <View style={styles.news}></View>
          <View style={styles.news}></View>
          <View style={styles.news}></View>
          <View style={styles.news}></View>
          <View style={styles.news}></View>
          <View style={styles.news}></View>
          <View style={styles.news}></View>
          <View style={styles.news}></View>
          <View style={styles.news}></View>
          <View style={styles.news}></View>
          <View style={styles.news}></View>
        </ScrollView>
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
  newsContainer: {
    width: "90%",
    height: "70%",

    backgroundColor: "red",
  },
  newsScroller: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-around",
  },
  news: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 165,
    height: 215,
    backgroundColor: LIGHT_GREEN_COLOR,
    borderRadius: 25,
    marginTop: 40,
    flexWrap: "wrap",
  },
});
export default Home;
